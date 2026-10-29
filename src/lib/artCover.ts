/*
 * Couverture abstraite PHASE III, dessinée en SVG à partir d'un mot (le slug).
 * Même motif que la bannière et le logo : une rangée de fils de lumière,
 * un seul sort du rang, penché, dans la couleur de la rubrique.
 * Même slug = même image. Aucune photo, aucune scène générée.
 */

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Petit générateur pseudo-aléatoire (mulberry32), pour un tirage stable
function random(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function artCover(seed: string, accent: string): string {
  const rnd = random(hash(seed));
  const W = 400;
  const H = 260;
  const horizon = 150 + Math.round(rnd() * 30);
  const count = 34;
  const step = W / count;
  const out = 18 + Math.floor(rnd() * (count - 22));

  let lines = '';
  for (let i = 0; i < count; i++) {
    if (i === out) continue;
    const x = (i + 0.5) * step;
    const up = 28 + rnd() * (horizon - 40);
    const alpha = (0.18 + rnd() * 0.45).toFixed(2);
    lines += `<line x1="${x.toFixed(1)}" y1="${horizon}" x2="${x.toFixed(1)}" y2="${(horizon - up).toFixed(1)}" stroke="#DDE6F0" stroke-opacity="${alpha}"/>`;
    lines += `<line x1="${x.toFixed(1)}" y1="${horizon + 4}" x2="${x.toFixed(1)}" y2="${(horizon + 4 + up * 0.45).toFixed(1)}" stroke="#19C6D9" stroke-opacity="${(Number(alpha) * 0.35).toFixed(2)}"/>`;
  }

  const ox = (out + 0.5) * step;
  const top = 22 + rnd() * 30;
  const lean = 10 + rnd() * 8;
  const fil = `<line x1="${ox.toFixed(1)}" y1="${horizon}" x2="${(ox + lean).toFixed(1)}" y2="${top.toFixed(1)}" stroke="url(#f)" stroke-width="2.6" stroke-linecap="round"/>`;

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">` +
    `<defs><linearGradient id="f" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#19C6D9"/><stop offset="1" stop-color="${accent}"/></linearGradient>` +
    `<filter id="g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter></defs>` +
    `<rect width="${W}" height="${H}" fill="#0E0D14"/>` +
    `<g stroke-width="1">${lines}</g>` +
    `<g filter="url(#g)" opacity="0.8">${fil}</g>${fil}` +
    `<line x1="${ox.toFixed(1)}" y1="${horizon + 4}" x2="${(ox - lean * 0.4).toFixed(1)}" y2="${(H - 8).toFixed(1)}" stroke="${accent}" stroke-opacity="0.45" stroke-width="2"/>` +
    `</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
