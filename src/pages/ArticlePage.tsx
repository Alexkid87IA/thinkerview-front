import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Link2, Clock, User, Calendar } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { artCover } from '../lib/artCover';
import { PILLAR_COLORS } from '../data/galaxies';
import s from './ArticlePage.module.css';

/* ── Accent color — Souveraineté ── */
const ACCENT = '#006F87';

/* ── Couleur de rubrique des articles liés ── */
const CATEGORY_ACCENT: Record<string, string> = {
  Technologie: PILLAR_COLORS.technologie.accent,
  'Souveraineté': PILLAR_COLORS.souverainete.accent,
  'Économie': PILLAR_COLORS.economie.accent,
};

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
    title: 'OSINT : comment le renseignement open source bouleverse les enquêtes',
    excerpt: 'Les techniques d\'investigation numérique accessibles aux citoyens transforment le journalisme.',
    category: 'Technologie',
    date: '3 mai 2026',
    readTime: '18 min',
  },
  {
    id: 2,
    slug: 'concentration-medias-france',
    title: 'Concentration des médias : qui possède l\'information en France ?',
    excerpt: 'Cartographie des propriétaires, des lignes éditoriales et des conflits d\'intérêts.',
    category: 'Souveraineté',
    date: '28 avr. 2026',
    readTime: '25 min',
  },
  {
    id: 3,
    slug: 'financement-presse-independante',
    title: 'Presse indépendante : les modèles économiques qui fonctionnent',
    excerpt: 'De Mediapart à Off Investigation, comment survivre sans milliardaires ni subventions.',
    category: 'Économie',
    date: '21 avr. 2026',
    readTime: '15 min',
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
          <li><Link to="/galaxie/souverainete">Souveraineté</Link></li>
          <li className={s.breadcrumbSep}>/</li>
          <li className={s.breadcrumbCurrent}>Off Investigation</li>
        </ol>
      </nav>

      {/* ── Hero ── */}
      <header className={s.hero} style={{ '--accent': ACCENT } as React.CSSProperties}>
        <motion.div {...fade(0.1)}>
          <span className={s.categoryBadge}>Politique / Médias</span>
        </motion.div>

        <motion.h1 className={s.heroTitle} {...fadeUp(0.2)}>
          Off Investigation : 30 ans de journalisme, censure à Canal+ et la refondation des médias
        </motion.h1>

        <motion.p className={s.heroDeck} {...fade(0.4)}>
          Jean-Baptiste Rivoir, 58 ans, 30 ans de journalisme d'investigation, fondateur d'Off Investigation.
          Ancien rédacteur en chef adjoint de Spécial Investigation sur Canal+. Dans cet entretien sans filtre,
          il décrypte la prise de contrôle de Canal+ par Bolloré, les clauses de silence imposées à 800 journalistes,
          et la refondation nécessaire du système informationnel français.
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
          <span className={s.metaItem}>Galaxie <span className={s.metaAccent}>Souveraineté</span></span>
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
          Interview intégrale
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
              <span className={s.chapterMark}>01 — Genèse</span>
              L'arrivée de Bolloré à Canal+
            </h2>

            <p className={s.dropCap}>
              L'histoire commence en 2011. Vincent Bolloré entre au capital de Vivendi en
              concertation avec Nicolas Sarkozy, via Jean-René Fourtou, alors président du
              conseil de surveillance. À l'époque, Rivoir est rédacteur en chef adjoint de
              Spécial Investigation, l'émission phare d'investigation de Canal+. Personne
              ne mesure encore l'ampleur de ce qui se prépare.
            </p>

            <p>
              Bolloré met quatre ans à monter patiemment au capital. La méthode est celle d'un
              prédateur industriel : discret, méthodique, implacable. En mai 2015, la première
              bombe éclate. Un documentaire sur le Crédit Mutuel — qui finance Bolloré en
              Afrique — est censuré. C'est la première censure flagrante, la première
              démonstration de force.
            </p>

            <p>
              Puis viennent les Guignols de l'info, supprimés après trente ans d'antenne. Un
              symbole de la liberté d'expression télévisuelle française, balayé d'un revers de
              main. Pour Rivoir, c'est le signal : « Quand on supprime les Guignols, on envoie
              un message à l'ensemble de la rédaction : plus rien n'est intouchable. »
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
              Durée de la montée au capital de Vivendi par Bolloré, de 2011 à 2015 — une stratégie
              de prise de contrôle en silence.
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
              <span className={s.chapterMark}>02 — Résistance</span>
              Le placard et les clauses de silence
            </h2>

            <p>
              Jean-Baptiste Rivoir passe cinq ans au placard. Cinq années où il continue de
              toucher son salaire mais où il ne tourne plus rien, ne produit plus rien, n'existe
              plus dans l'organigramme. Une mort professionnelle lente, organisée, méthodique.
            </p>

            <p>
              Mais le plus révélateur, ce sont les clauses de silence. Quand les journalistes
              sont licenciés ou partent de Canal+, ils signent des accords de confidentialité.
              Rivoir estime à 800 le nombre de journalistes ainsi bâillonnés en France — des
              professionnels qui ne peuvent pas raconter ce qu'ils ont vu, ce qu'ils savent,
              comment l'information a été manipulée de l'intérieur.
            </p>

            <p>
              Il raconte une anecdote éclairante : pendant son service militaire, il avait fait
              une grève de la faim pour protester contre les conditions. Cette capacité à
              résister physiquement, à endurer, il la retrouve face à Bolloré. « La mise au
              placard, c'est une forme de torture psychologique. On vous dit : vous existez
              encore, mais vous ne servez plus à rien. »
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
              Journalistes estimés bâillonnés par des clauses de silence en France,
              selon le décompte de Jean-Baptiste Rivoir.
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
              Off Investigation : refonder le système
            </h2>

            <p>
              Après son départ de Canal+, Rivoir fonde Off Investigation, un média
              d'investigation indépendant financé exclusivement par les dons des citoyens.
              Pas de publicité. Pas de subventions publiques — car il considère que ces
              subventions financent à 80-90 % les médias détenus par des milliardaires.
            </p>

            <p>
              Le résultat est spectaculaire : l'enquête sur le patrimoine d'Emmanuel Macron
              cumule 3,2 millions de vues. D'autres investigations sur le lobbying
              pharmaceutique, les paradis fiscaux et la corruption institutionnelle
              rencontrent un public affamé d'information véritable.
            </p>

            <p>
              Rivoir pointe du doigt un chiffre vertigineux : 70 % des Français ne font plus
              confiance aux journalistes. « C'est lunaire, explique-t-il. On fait un métier
              public, on a une responsabilité démocratique. Et les trois quarts du pays ne
              nous croient plus. Ça devrait être un séisme dans la profession. »
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
              fait un métier public, on a une responsabilité. »
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
              Vues sur l'enquête d'Off Investigation consacrée au patrimoine d'Emmanuel Macron —
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
              Le modèle économique d'Off Investigation est radical : zéro publicité, zéro
              subvention, 100 % dons citoyens. Rivoir est payé 1 500 euros par mois. Pour
              joindre les deux bouts, il loue des voitures en autopartage. C'est le prix de
              l'indépendance absolue.
            </p>

            <p>
              Son appel est direct et sans détour : si les citoyens veulent une information
              libre, ils doivent la financer eux-mêmes. Les subventions publiques sont captées
              par les grands groupes. La publicité asservit les rédactions. Il ne reste que le
              lien direct entre le journaliste et son public.
            </p>

            <p>
              « On est dans une situation où le système médiatique français est verrouillé par
              une dizaine de milliardaires, résume Rivoir. La seule porte de sortie, c'est le
              citoyen. S'il ne se mobilise pas, personne ne le fera à sa place. L'information
              libre n'est pas un luxe, c'est une condition de la démocratie. »
            </p>

            <p>
              L'entretien se conclut sur une note d'espérance mesurée. Malgré les obstacles,
              malgré la précarité, malgré les pressions juridiques et les tentatives
              d'intimidation, Off Investigation continue de produire des enquêtes qui comptent.
              La preuve qu'un autre journalisme est possible — à condition que les citoyens
              acceptent d'en être les garants.
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
          href={`https://x.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent('Off Investigation : 30 ans de journalisme — PHASE III')}`}
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
          title={copied ? 'Lien copié !' : 'Copier le lien'}
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
        {['Médias', 'Investigation', 'Canal+', 'Bolloré', 'Presse indépendante', 'Souveraineté', 'Off Investigation', 'Censure'].map((tag) => (
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
              Journaliste d'investigation depuis 30 ans. Ancien rédacteur en chef adjoint
              de Spécial Investigation (Canal+). Fondateur d'Off Investigation, média
              d'enquête financé par les citoyens. Auteur de nombreuses investigations sur
              la corruption, les conflits d'intérêts et les dérives du pouvoir médiatique.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── À lire aussi ── */}
      <section className={s.relatedSection} style={{ '--accent': ACCENT } as React.CSSProperties}>
        <motion.div
          className={s.relatedHeader}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={s.relatedChapter}>05</span>
          <h2 className={s.relatedTitle}>À lire aussi</h2>
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
                  src={artCover(item.slug, CATEGORY_ACCENT[item.category] ?? ACCENT)}
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
