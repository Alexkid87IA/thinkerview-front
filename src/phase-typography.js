/* French typography for the dossier, the prototype and their open shadow roots. */
const NARROW = '\u202f';
const NBSP = '\u00a0';
const JOINER = '\u2060';
const excluded = 'script,style,noscript,pre,code,kbd,samp,textarea,input,select,option,svg,math,[contenteditable],[data-typography="off"]';
const blockSelector = 'h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption';
const originals = new WeakMap();
const fittedSizes = new WeakMap();
const roots = new Map();
const queue = new Set();
const sheet = 'data:text/css;charset=utf-8,' + encodeURIComponent("/* Adjust line breaks only. Existing fonts, colours and fixed art direction stay in place. */\n:where(h1,h2,h3,h4,h5,h6):not([data-typography=\"off\"]){text-wrap:balance;word-break:normal;overflow-wrap:normal;hyphens:manual}\n:where(p,li,blockquote,figcaption):not([data-typography=\"off\"]){text-wrap:pretty}\n[data-typography=\"off\"] :is(h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption){text-wrap:initial}\n/* Chapter numbers must not create an unshrinkable anonymous flex item. */\n.ti h2{display:block}\n.ti h2>span{display:inline-block;margin-inline-end:14px}\n@media print{:where(p,li,blockquote){orphans:3;widows:3}}\n/* The long-form reading page needs room for French words on narrow phones. */\n@media(max-width:360px){.ti h1{font-size:32px}.ti h2{font-size:19px}}\n");
let timer;

export function frenchSpacing(text) {
  return text
    .replace(/[ \t\u00a0\u202f]+([:;!?»])/g, NARROW + '$1')
    .replace(/([\p{L}\d\)\]])([:;!?])(?=\s|$)/gu, '$1' + NARROW + '$2')
    .replace(/«[ \t\u00a0\u202f]+/g, '«' + NARROW)
    .replace(/(\d)[ \t\u00a0\u202f]+(?=(?:[%€£$]|°[CF]|(?:km|cm|mm|kg|mg|kWh|MWh|GWh|MW|GW|Go|To|Mo|min|h)\b))/gu, '$1' + NARROW)
    .replace(/(\d)[ \t]+(?=\d{3}(?:\D|$))/g, '$1' + NARROW)
    .replace(/\bPHASE[ \t]+III\b/g, 'PHASE' + NBSP + 'III');
}

function eligible(node) {
  return node.nodeType === Node.TEXT_NODE && node.parentElement &&
    !node.parentElement.closest(excluded) && node.data.length > 0;
}

function hasInlinePredecessor(node) {
  let previous = node.previousSibling;
  while (previous && previous.nodeType === Node.TEXT_NODE && !previous.textContent.trim()) previous = previous.previousSibling;
  if (!previous) return false;
  if (previous.nodeType === Node.TEXT_NODE) return /\S$/.test(previous.textContent);
  if (previous.nodeType !== Node.ELEMENT_NODE || previous.tagName === 'BR') return false;
  return getComputedStyle(previous).display.startsWith('inline') && /\S$/.test(previous.textContent);
}

function normalize(node) {
  let record = originals.get(node);
  if (!record || node.data !== record.output) {
    let base = frenchSpacing(node.data);
    if (hasInlinePredecessor(node)) {
      base = base.replace(/^([:;!?»])/, NARROW + '$1')
        .replace(/^([.,…\)\]])/, JOINER + '$1');
    }
    record = {base, output: base};
    originals.set(node, record);
  }
  if (node.data !== record.base) node.data = record.base;
  record.output = record.base;
}

function previousInlineText(node) {
  let cursor = node;
  const gaps = [];
  while (cursor) {
    let previous = cursor.previousSibling;
    while (previous) {
      if (previous.nodeType === Node.TEXT_NODE) {
        if (previous.data.trim()) return {node: previous, gaps};
        gaps.push(previous);
      }
      if (previous.nodeType === Node.ELEMENT_NODE) {
        if (previous.tagName === 'BR' || !getComputedStyle(previous).display.startsWith('inline')) return null;
        const texts = textNodes(previous);
        const last = texts.findLastIndex(text => text.data.trim());
        if (last >= 0) { gaps.push(...texts.slice(last + 1)); return {node: texts[last], gaps}; }
      }
      previous = previous.previousSibling;
    }
    cursor = cursor.parentElement;
    if (!cursor || !getComputedStyle(cursor).display.startsWith('inline')) return null;
  }
  return null;
}

function bindPunctuationBoundary(node) {
  const match = node.data.match(/^[\s\u2060]*([:;!?».,…\)\]])/u);
  if (!match) return;
  const result = previousInlineText(node);
  if (!result || !eligible(result.node)) return;
  const previous = result.node;
  const lead = /[:;!?»]/.test(match[1]) ? NARROW : JOINER;
  previous.data = previous.data.replace(/\s+$/u, '');
  node.data = lead + node.data.slice(match[0].length - 1);
  result.gaps.forEach(text => { text.data = ''; });
  for (const text of [previous, node, ...result.gaps]) {
    const record = originals.get(text);
    if (record) record.output = text.data;
  }
}

function textNodes(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) if (eligible(node)) nodes.push(node);
  return nodes;
}

function position(nodes, offset) {
  for (const node of nodes) {
    if (offset <= node.data.length) return [node, offset];
    offset -= node.data.length;
  }
  const node = nodes.at(-1);
  return [node, node?.data.length || 0];
}

function rectangle(nodes, start, end) {
  const [a, x] = position(nodes, start), [b, y] = position(nodes, end);
  const range = document.createRange();
  range.setStart(a, x); range.setEnd(b, y);
  return [...range.getClientRects()].filter(rect => rect.width > .1).at(-1);
}

function bindGap(nodes, start, end) {
  let offset = 0;
  for (const node of nodes) {
    const left = Math.max(start - offset, 0), right = Math.min(end - offset, node.data.length);
    if (right > left) {
      const gap = node.data.slice(left, right);
      node.data = node.data.slice(0, left) + gap.replace(/[ \t\n\r]/g, NBSP) + node.data.slice(right);
      const record = originals.get(node);
      if (record) record.output = node.data;
    }
    offset += node.data.length;
  }
}

function balanceTail(element) {
  const fit = fittedSizes.get(element);
  if (fit) {
    if (element.style.fontSize === fit.applied) element.style.fontSize = fit.original;
    else fittedSizes.delete(element);
  }
  if (element.closest(excluded) || element.querySelector('br') || !element.getClientRects().length) return;
  const style = getComputedStyle(element);
  if (style.whiteSpace.includes('nowrap') || style.display === 'contents') return;
  // Explicit block lines are art direction, not accidental orphans.
  if ([...element.children].filter(child => !getComputedStyle(child).display.startsWith('inline')).length > 1) return;
  const nodes = textNodes(element);
  const text = nodes.map(node => node.data).join('');
  const words = [...text.matchAll(/\S+/gu)];
  const heading = /^H[1-6]$/.test(element.tagName);
  if (words.length < 3) return;
  const last = words.at(-1), prior = words.at(-2);
  const lastRect = rectangle(nodes, last.index, last.index + last[0].length);
  const priorRect = rectangle(nodes, prior.index, prior.index + prior[0].length);
  if (!lastRect || !priorRect) return;
  let first = prior;
  const newLine = lastRect.top - priorRect.top > Math.min(lastRect.height, priorRect.height) * .5;
  if (!newLine) {
    if (!heading || (prior[0] + last[0]).length > 8 || words.length < 4) return;
    const earlier = words.at(-3);
    const earlierRect = rectangle(nodes, earlier.index, earlier.index + earlier[0].length);
    if (!earlierRect || lastRect.top - earlierRect.top < Math.min(lastRect.height, earlierRect.height) * .5) return;
    first = earlier;
  }
  const tail = words.filter(word => word.index >= first.index);
  const width = tail.reduce((sum, word) => sum + (rectangle(nodes, word.index, word.index + word[0].length)?.width || 0), 0);
  const available = element.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
  const gapWidth = parseFloat(style.fontSize) * .34 * (tail.length - 1);
  if (available <= 0) return;
  if (width + gapWidth > available * .985) {
    const scale = available * .985 / (width + gapWidth);
    // Headings get a small adjustment; miniature carousel captions can fit more tightly.
    const minimumScale = element.matches('.slide h5') ? .78 : .95;
    if (!heading || scale < minimumScale) return;
    const original = element.style.fontSize;
    element.style.fontSize = (parseFloat(style.fontSize) * scale).toFixed(3) + 'px';
    fittedSizes.set(element, {original, applied: element.style.fontSize});
  }
  for (let i = 1; i < tail.length; i++) bindGap(nodes, tail[i - 1].index + tail[i - 1][0].length, tail[i].index);
}

function enqueue(container) {
  if (!container?.isConnected && container !== document) return;
  queue.add(container);
  clearTimeout(timer);
  timer = setTimeout(flush, 90);
}

function discover(container) {
  container.querySelectorAll?.('*').forEach(element => {
    if (element.shadowRoot && !roots.has(element.shadowRoot)) attach(element.shadowRoot);
  });
}

function flush() {
  roots.forEach((observer, root) => {
    if (root !== document && !root.host.isConnected) { observer.disconnect(); roots.delete(root); queue.delete(root); }
  });
  roots.forEach(observer => observer.disconnect());
  const jobs = [...queue]; queue.clear();
  jobs.forEach(container => {
    if (!container.isConnected && container !== document) return;
    discover(container);
    const nodes = container.nodeType === Node.TEXT_NODE ? [container] : textNodes(container);
    nodes.filter(eligible).forEach(normalize);
    nodes.filter(eligible).forEach(bindPunctuationBoundary);
    const blocks = new Set(container.querySelectorAll?.(blockSelector) || []);
    if (container.matches?.(blockSelector)) blocks.add(container);
    blocks.forEach(balanceTail);
  });
  roots.forEach((observer, root) => observe(observer, root));
  document.documentElement.dataset.typographyReady = 'true';
  if (queue.size) enqueue(document);
}

function attach(root) {
  if (roots.has(root)) return;
  let link = root.querySelector('link[data-phase-typography-style],link[data-typography-styles]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'stylesheet'; link.href = sheet; link.dataset.typographyStyles = '';
    (root === document ? document.head : root).append(link);
  }
  link.addEventListener('load', () => enqueue(root));
  const observer = new MutationObserver(records => {
    records.forEach(record => {
      const parent = record.target.nodeType === Node.TEXT_NODE ? record.target.parentElement : record.target;
      if (parent?.closest?.(excluded)) return;
      enqueue(parent?.closest?.(blockSelector) || parent);
      record.addedNodes.forEach(node => { if (node.nodeType === Node.ELEMENT_NODE) { discover(node); if (node.shadowRoot) attach(node.shadowRoot); } });
    });
  });
  roots.set(root, observer);
  observe(observer, root);
  enqueue(root);
}

function observe(observer, root) {
  observer.observe(root, {subtree: true, childList: true, characterData: true,
    attributes: true, attributeFilter: ['class', 'hidden', 'open', 'aria-expanded']});
}

if (typeof document !== 'undefined' && !globalThis[Symbol.for('phase-iii.typography')]) {
  globalThis[Symbol.for('phase-iii.typography')] = true;
  attach(document);
  document.fonts?.ready.then(() => enqueue(document));
  document.fonts?.addEventListener('loadingdone', () => roots.forEach((_, root) => enqueue(root)));
  let resize;
  addEventListener('resize', () => { clearTimeout(resize); resize = setTimeout(() => roots.forEach((_, root) => enqueue(root)), 150); });
  addEventListener('pageshow', () => roots.forEach((_, root) => enqueue(root)));
}
