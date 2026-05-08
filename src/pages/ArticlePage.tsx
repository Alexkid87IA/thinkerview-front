import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Link2, Clock, User, Calendar } from 'lucide-react';
import Layout from '../components/layout/Layout';
import s from './ArticlePage.module.css';

/* ── Accent color — Souverainete ── */
const ACCENT = '#8B5A5A';

/* ── Animation helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const fade = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay },
});

/* ── Social share icons (inline SVGs) ── */
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
);

/* ── Related articles data (mock) ── */
const RELATED = [
  {
    id: 1,
    slug: 'osint-renseignement-open-source',
    title: 'OSINT : comment le renseignement open source bouleverse les enquetes',
    excerpt: 'Les techniques d\'investigation numerique accessibles aux citoyens transforment le journalisme.',
    category: 'Technologie',
    date: '3 mai 2026',
    readTime: '18 min',
    image: 'https://picsum.photos/seed/osint/600/400',
  },
  {
    id: 2,
    slug: 'concentration-medias-france',
    title: 'Concentration des medias : qui possede l\'information en France ?',
    excerpt: 'Cartographie des proprietaires, des lignes editoriales et des conflits d\'interets.',
    category: 'Souverainete',
    date: '28 avr. 2026',
    readTime: '25 min',
    image: 'https://picsum.photos/seed/medias/600/400',
  },
  {
    id: 3,
    slug: 'financement-presse-independante',
    title: 'Presse independante : les modeles economiques qui fonctionnent',
    excerpt: 'De Mediapart a Off Investigation, comment survivre sans milliardaires ni subventions.',
    category: 'Economie',
    date: '21 avr. 2026',
    readTime: '15 min',
    image: 'https://picsum.photos/seed/presse/600/400',
  },
];

export default function ArticlePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const articleUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Layout>
      {/* Scroll progress */}
      <div className={s.progressBar} style={{ width: `${scrollProgress}%`, '--accent': ACCENT } as React.CSSProperties} />

      {/* Accent bar */}
      <div className={s.accentBar} style={{ '--accent': ACCENT } as React.CSSProperties} />

      {/* Breadcrumb */}
      <nav className={s.breadcrumb} aria-label="Fil d'Ariane">
        <ol className={s.breadcrumbList}>
          <li><Link to="/">Accueil</Link></li>
          <li className={s.breadcrumbSep}>/</li>
          <li><Link to="/articles">Articles</Link></li>
          <li className={s.breadcrumbSep}>/</li>
          <li><Link to="/galaxie/souverainete">Souverainete</Link></li>
          <li className={s.breadcrumbSep}>/</li>
          <li className={s.breadcrumbCurrent}>Off Investigation</li>
        </ol>
      </nav>

      {/* ── Hero ── */}
      <header className={s.hero} style={{ '--accent': ACCENT } as React.CSSProperties}>
        <motion.div {...fade(0.1)}>
          <span className={s.categoryBadge}>Politique / Medias</span>
        </motion.div>

        <motion.h1 className={s.heroTitle} {...fadeUp(0.2)}>
          Off Investigation : 30 ans de journalisme, censure a Canal+ et la refondation des medias
        </motion.h1>

        <motion.p className={s.heroDeck} {...fade(0.4)}>
          Jean-Baptiste Rivoir, 58 ans, 30 ans de journalisme d'investigation, fondateur d'Off Investigation.
          Ancien redacteur en chef adjoint de Speciale Investigation sur Canal+. Dans cet entretien sans filtre,
          il decrypte la prise de controle de Canal+ par Bollore, les clauses de silence imposees a 800 journalistes,
          et la refondation necessaire du systeme informationnel francais.
        </motion.p>

        <motion.div className={s.heroMeta} {...fade(0.55)}>
          <span className={s.metaItem}>
            <User size={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />
            <span className={s.metaAccent}>Jean-Baptiste Rivoir</span>
          </span>
          <span className={s.metaSep} />
          <span className={s.metaItem}>
            <Calendar size={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />
            7 mai 2026
          </span>
          <span className={s.metaSep} />
          <span className={s.metaItem}>
            <Clock size={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />
            22 min de lecture
          </span>
          <span className={s.metaSep} />
          <span className={s.metaItem}>Galaxie <span className={s.metaAccent}>Souverainete</span></span>
        </motion.div>
      </header>

      {/* ── Cover image ── */}
      <motion.div
        className={s.coverWrap}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={s.cover}>
          <picture>
            <source media="(max-width: 640px)" srcSet="/rivoir-mobile.png" />
            <img
              src="/rivoir-cover.png"
              alt="Jean-Baptiste Rivoir, fondateur d'Off Investigation, en entretien avec Thinkerview"
              loading="eager"
            />
          </picture>
        </div>
        <p className={s.coverCaption}>Jean-Baptiste Rivoir / Off Investigation — Thinkerview, mai 2026</p>
      </motion.div>

      {/* ── Video embed ── */}
      <motion.section
        className={s.videoSection}
        style={{ '--accent': ACCENT } as React.CSSProperties}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <div className={s.videoLabel}>
          <span className={s.videoLabelIcon}><Play size={10} /></span>
          Interview integrale
        </div>
        <div className={s.videoEmbed}>
          <iframe
            src="https://www.youtube.com/embed/dN6omRcGQP4"
            title="Off Investigation : Jean-Baptiste Rivoir — Thinkerview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </motion.section>

      {/* ── Divider ── */}
      <div className={s.videoDivider}>
        <div className={s.dividerLine}>
          <span className={s.dividerDot} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          ARTICLE BODY
         ══════════════════════════════════════════════ */}
      <article className={s.articleBody} style={{ '--accent': ACCENT } as React.CSSProperties}>
        <div className={s.prose}>

          {/* ── Section 1 ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={s.sectionHeading}>
              <span className={s.chapterMark}>01 — Genese</span>
              L'arrivee de Bollore a Canal+
            </h2>

            <p className={s.dropCap}>
              L'histoire commence en 2011. Vincent Bollore entre au capital de Vivendi en
              concertation avec Nicolas Sarkozy, via Jean-Rene Fourtou, alors president du
              conseil de surveillance. A l'epoque, Rivoir est redacteur en chef adjoint de
              Speciale Investigation, l'emission phare d'investigation de Canal+. Personne
              ne mesure encore l'ampleur de ce qui se prepare.
            </p>

            <p>
              Bollore met quatre ans a monter patiemment au capital. La methode est celle d'un
              predateur industriel : discret, methodique, implacable. En mai 2015, la premiere
              bombe eclate. Un documentaire sur le Credit Mutuel — qui finance Bollore en
              Afrique — est censure. C'est la premiere censure flagrante, la premiere
              demonstration de force.
            </p>

            <p>
              Puis viennent les Guignols de l'info, supprimes apres trente ans d'antenne. Un
              symbole de la liberte d'expression televisuelle francaise, balaye d'un revers de
              main. Pour Rivoir, c'est le signal : « Quand on supprime les Guignols, on envoie
              un message a l'ensemble de la redaction : plus rien n'est intouchable. »
            </p>
          </motion.div>

          {/* ── Key figure ── */}
          <motion.div
            className={s.keyFigure}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <div className={s.keyFigureNumber}>4 ans</div>
            <div className={s.keyFigureLabel}>
              Duree de la montee au capital de Vivendi par Bollore, de 2011 a 2015 — une strategie
              de prise de controle en silence.
            </div>
          </motion.div>

          {/* ── Section 2 ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={s.sectionHeading}>
              <span className={s.chapterMark}>02 — Resistance</span>
              Le placard et les clauses de silence
            </h2>

            <p>
              Jean-Baptiste Rivoir passe cinq ans au placard. Cinq annees ou il continue de
              toucher son salaire mais ou il ne tourne plus rien, ne produit plus rien, n'existe
              plus dans l'organigramme. Une mort professionnelle lente, organisee, methodique.
            </p>

            <p>
              Mais le plus revelateur, ce sont les clauses de silence. Quand les journalistes
              sont licencies ou partent de Canal+, ils signent des accords de confidentialite.
              Rivoir estime a 800 le nombre de journalistes ainsi baillonnes en France — des
              professionnels qui ne peuvent pas raconter ce qu'ils ont vu, ce qu'ils savent,
              comment l'information a ete manipulee de l'interieur.
            </p>

            <p>
              Il raconte une anecdote eclairante : pendant son service militaire, il avait fait
              une greve de la faim pour protester contre les conditions. Cette capacite a
              resister physiquement, a endurer, il la retrouve face a Bollore. « La mise au
              placard, c'est une forme de torture psychologique. On vous dit : vous existez
              encore, mais vous ne servez plus a rien. »
            </p>
          </motion.div>

          {/* ── Key figure ── */}
          <motion.div
            className={s.keyFigure}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <div className={s.keyFigureNumber}>800</div>
            <div className={s.keyFigureLabel}>
              Journalistes estimes baillonnes par des clauses de silence en France,
              selon le decompte de Jean-Baptiste Rivoir.
            </div>
          </motion.div>

          {/* ── Section 3 ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={s.sectionHeading}>
              <span className={s.chapterMark}>03 — Refondation</span>
              Off Investigation : refonder le systeme
            </h2>

            <p>
              Apres son depart de Canal+, Rivoir fonde Off Investigation, un media
              d'investigation independant finance exclusivement par les dons des citoyens.
              Pas de publicite. Pas de subventions publiques — car il considere que ces
              subventions financent a 80-90% les medias detenus par des milliardaires.
            </p>

            <p>
              Le resultat est spectaculaire : l'enquete sur le patrimoine d'Emmanuel Macron
              cumule 3,2 millions de vues. D'autres investigations sur le lobbying
              pharmaceutique, les paradis fiscaux et la corruption institutionnelle
              rencontrent un public affame d'information veritable.
            </p>

            <p>
              Rivoir pointe du doigt un chiffre vertigineux : 70% des Francais ne font plus
              confiance aux journalistes. « C'est lunaire, explique-t-il. On fait un metier
              public, on a une responsabilite democratique. Et les trois quarts du pays ne
              nous croient plus. Ca devrait etre un seisme dans la profession. »
            </p>
          </motion.div>

          {/* ── Pull quote ── */}
          <motion.blockquote
            className={s.pullQuote}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className={s.pullQuoteText}>
              « 70 % des gens de ce pays ne croient plus les journalistes. C'est lunaire. On
              fait un metier public, on a une responsabilite. »
            </p>
            <cite className={s.pullQuoteAttr}>— Jean-Baptiste Rivoir, Off Investigation</cite>
          </motion.blockquote>

          {/* ── Key figure ── */}
          <motion.div
            className={s.keyFigure}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <div className={s.keyFigureNumber}>3,2M</div>
            <div className={s.keyFigureLabel}>
              Vues sur l'enquete d'Off Investigation consacree au patrimoine d'Emmanuel Macron —
              sans aucun budget publicitaire ni soutien institutionnel.
            </div>
          </motion.div>

          {/* ── Section 4 ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={s.sectionHeading}>
              <span className={s.chapterMark}>04 — Appel</span>
              Les citoyens comme seul recours
            </h2>

            <p>
              Le modele economique d'Off Investigation est radical : zero publicite, zero
              subvention, 100% dons citoyens. Rivoir est paye 1 500 euros par mois. Pour
              joindre les deux bouts, il loue des voitures en autopartage. C'est le prix de
              l'independance absolue.
            </p>

            <p>
              Son appel est direct et sans detour : si les citoyens veulent une information
              libre, ils doivent la financer eux-memes. Les subventions publiques sont captees
              par les grands groupes. La publicite asservit les redactions. Il ne reste que le
              lien direct entre le journaliste et son public.
            </p>

            <p>
              « On est dans une situation ou le systeme mediatique francais est verrouille par
              une dizaine de milliardaires, resume Rivoir. La seule porte de sortie, c'est le
              citoyen. S'il ne se mobilise pas, personne ne le fera a sa place. L'information
              libre n'est pas un luxe, c'est une condition de la democratie. »
            </p>

            <p>
              L'entretien se conclut sur une note d'esperance mesuree. Malgre les obstacles,
              malgre la precarite, malgre les pressions juridiques et les tentatives
              d'intimidation, Off Investigation continue de produire des enquetes qui comptent.
              La preuve qu'un autre journalisme est possible — a condition que les citoyens
              acceptent d'en etre les garants.
            </p>
          </motion.div>

        </div>
      </article>

      {/* ── Share bar ── */}
      <motion.div
        className={s.shareBar}
        style={{ '--accent': ACCENT } as React.CSSProperties}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <span className={s.shareLabel}>Partager</span>
        <a
          href={`https://x.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent('Off Investigation : 30 ans de journalisme — Thinkerview')}`}
          target="_blank"
          rel="noopener noreferrer"
          className={s.shareBtn}
          aria-label="Partager sur X"
        >
          <XIcon />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={s.shareBtn}
          aria-label="Partager sur LinkedIn"
        >
          <LinkedInIcon />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={s.shareBtn}
          aria-label="Partager sur Facebook"
        >
          <FacebookIcon />
        </a>
        <button
          className={s.shareBtn}
          onClick={handleCopyLink}
          aria-label="Copier le lien"
          title={copied ? 'Lien copie !' : 'Copier le lien'}
        >
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 6L9 17l-5-5" /></svg>
          ) : (
            <Link2 size={16} />
          )}
        </button>
      </motion.div>

      {/* ── Tags ── */}
      <div className={s.tags} style={{ '--accent': ACCENT } as React.CSSProperties}>
        {['Medias', 'Investigation', 'Canal+', 'Bollore', 'Presse independante', 'Souverainete', 'Off Investigation', 'Censure'].map((tag) => (
          <Link key={tag} to={`/articles?tag=${tag.toLowerCase()}`} className={s.tag}>
            {tag}
          </Link>
        ))}
      </div>

      {/* ── Author box ── */}
      <motion.div
        className={s.authorBox}
        style={{ '--accent': ACCENT } as React.CSSProperties}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
      >
        <div className={s.authorCard}>
          <div className={s.authorAvatar}>JR</div>
          <div className={s.authorInfo}>
            <h3 className={s.authorName}>Jean-Baptiste Rivoir</h3>
            <p className={s.authorRole}>Fondateur, Off Investigation</p>
            <p className={s.authorBio}>
              Journaliste d'investigation depuis 30 ans. Ancien redacteur en chef adjoint
              de Speciale Investigation (Canal+). Fondateur d'Off Investigation, media
              d'enquete finance par les citoyens. Auteur de nombreuses investigations sur
              la corruption, les conflits d'interets et les derives du pouvoir mediatique.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── A lire aussi ── */}
      <section className={s.relatedSection} style={{ '--accent': ACCENT } as React.CSSProperties}>
        <motion.div
          className={s.relatedHeader}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={s.relatedChapter}>05</span>
          <h2 className={s.relatedTitle}>A lire aussi</h2>
        </motion.div>

        <div className={s.relatedGrid}>
          {RELATED.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={`/article/${item.slug}`} className={s.relatedCard}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={s.relatedCardImage}
                  loading="lazy"
                />
                <div className={s.relatedCardBody}>
                  <span className={s.relatedCardCategory}>{item.category}</span>
                  <h3 className={s.relatedCardTitle}>{item.title}</h3>
                  <p className={s.relatedCardExcerpt}>{item.excerpt}</p>
                  <span className={s.relatedCardMeta}>{item.date} — {item.readTime}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
