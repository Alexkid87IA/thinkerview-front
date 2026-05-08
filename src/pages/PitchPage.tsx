import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import s from './PitchPage.module.css';

const PILLARS = [
  {
    title: 'IA & Transcription',
    color: '#4A7A8B',
    desc: 'Transcription fidèle et automatique de chaque interview. L\'IA découpe, structure et génère des articles liés — chaque contenu naît de la parole brute.',
  },
  {
    title: 'Fact-checking natif',
    color: '#C45A3C',
    desc: 'Chaque article est adossé à un système de vérification IA. Sources croisées, données sourcées, fiabilité maximale sur chaque contenu publié.',
  },
  {
    title: 'Internationalisation',
    color: '#3D7A6B',
    desc: 'Chaque contenu sera traduit et adapté dans toutes les langues. Thinkerview devient un portail international — la parole libre sans frontières.',
  },
  {
    title: 'Baromètre citoyen',
    color: '#6B5B8A',
    desc: 'Un outil de vote et de sondage sécurisé pour que les Français expriment leurs vraies préoccupations. Pensé pour être massivement utilisé avant les présidentielles.',
  },
  {
    title: 'Zéro bot, zéro fake',
    color: '#8B7A3D',
    desc: 'Système de login et de vérification membre ultra-sécurisé. La promesse : aucun bot, aucune manipulation. Un environnement safe pour des échanges authentiques.',
  },
  {
    title: 'Lanceurs d\'alerte',
    color: '#8B5A5A',
    desc: 'Un espace protégé pour les contributeurs et lanceurs d\'alerte. Contenus vérifiés, contributeurs triés sur le volet, protection des sources garantie.',
  },
];

const FEATURES = [
  { name: 'Interviews', desc: 'Entretiens longs avec player vidéo intégré, fiches invités, transcriptions IA et articles générés automatiquement.' },
  { name: 'Articles', desc: 'Décryptages écrits fact-checkés par IA, classés dans 6 galaxies thématiques : Géopolitique, Énergie, Politique, Économie, Tech, Souveraineté.' },
  { name: 'Dossiers', desc: 'Investigations au long cours qui regroupent articles, interviews et données autour d\'un même sujet.' },
  { name: 'Forum citoyen', desc: 'Espace de discussion et de débat pour la communauté, avec le Baromètre intégré et un calendrier d\'événements.' },
  { name: 'Newsletter', desc: 'Alertes hebdomadaires — l\'essentiel de l\'actualité décryptée, sans bruit.' },
  { name: 'Espace membre', desc: 'Inscription sécurisée, profils vérifiés, contributions modérées — la base d\'une communauté de confiance.' },
  { name: 'Social-média', desc: 'Stratégie multi-plateforme intégrée : YouTube, X, Instagram, TikTok, podcasts — chaque contenu décliné et distribué.' },
];

export default function PitchPage() {
  return (
    <div className={s.page}>
      <div className={s.noise} aria-hidden="true" />
      <div className={s.inner}>

        <header className={s.header}>
          <img src="/thinkerview-logo.png" alt="Thinkerview" className={s.logo} />
          <span className={s.badge}>Maquette · Mai 2026</span>
        </header>

        <div className={s.hero}>
          <span className={s.kicker}>Vision & stratégie</span>
          <h1 className={s.title}>
            Refonder l'information<br />
            <span className={s.titleEm}>par la technologie.</span>
          </h1>
          <p className={s.deck}>
            Un portail citoyen international, propulsé par l'IA, conçu pour transformer
            chaque interview en écosystème de contenus vérifiés — articles, traductions,
            fact-checking, débat citoyen. Zéro bot, zéro manipulation, zéro censure.
          </p>
        </div>

        <hr className={s.rule} />

        <div className={s.pillarsGrid}>
          {PILLARS.map((p, i) => (
            <div key={i} className={s.pillar}>
              <span className={s.pillarNum}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={s.pillarTitle}>
                <span className={s.pillarIcon} style={{ background: p.color }} />
                {p.title}
              </h3>
              <p className={s.pillarDesc}>{p.desc}</p>
            </div>
          ))}
        </div>

        <hr className={s.rule} />

        <h4 className={s.featuresTitle}>Le site, page par page</h4>
        <ul className={s.featuresList}>
          {FEATURES.map(f => (
            <li key={f.name} className={s.feature}>
              <span className={s.featureName}>{f.name}</span>
              <span className={s.featureDesc}>{f.desc}</span>
            </li>
          ))}
        </ul>

        <div className={s.ctaSection}>
          <span className={s.ctaLabel}>La maquette est prête — cliquez pour la découvrir.</span>
          <Link to="/home" className={s.ctaBtn}>
            Voir la maquette <ArrowRight />
          </Link>
        </div>

        <footer className={s.footer}>
          <p className={s.footerText}>Conçu par Alex Quilghini · 20 ans de création de médias digitaux</p>
        </footer>

      </div>
    </div>
  );
}
