import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import s from './PitchPage.module.css';

export default function PitchPage() {
  return (
    <div className={s.page}>
      <div className={s.noise} aria-hidden="true" />
      <div className={s.inner}>

        <header className={s.header}>
          <img src="/thinkerview-logo.png" alt="Thinkerview" className={s.logo} />
          <span className={s.badge}>Confidentiel · Mai 2026</span>
        </header>

        <div className={s.hero}>
          <span className={s.kicker}>Note stratégique pour Sky</span>
          <h1 className={s.title}>
            Thinkerview,<br />
            <span className={s.titleEm}>le média citoyen 2.0.</span>
          </h1>
        </div>

        <div className={s.letter}>
          <p className={s.letterSalut}>Sky,</p>
          <p>
            Merci infiniment pour le temps que tu m'as accordé. C'était un vrai honneur,
            et je suis très reconnaissant de ta confiance.
          </p>
          <p>
            Ce qui suit est ma vision de ce que Thinkerview pourrait devenir.
            Ça n'engage à rien — tu sais pourquoi je fais ça. C'est une note de travail,
            une base pour brainstormer ensemble.
          </p>
        </div>

        <hr className={s.rule} />

        {/* ── 1. Architecture éditoriale ── */}
        <div className={s.section}>
          <span className={s.sectionNum}>01</span>
          <h2 className={s.sectionTitle}>Architecture éditoriale : Galaxies & Univers</h2>
          <p className={s.sectionText}>
            Le site s'organise autour de <strong>6 Galaxies</strong> — les grands piliers
            thématiques de Thinkerview : Géopolitique, Énergie, Politique, Économie,
            Technologie, Souveraineté.
          </p>
          <p className={s.sectionText}>
            Chaque Galaxie se décline en <strong>Univers</strong> — des sous-thématiques
            précises qui permettent un maillage fin du contenu. Par exemple, la Galaxie
            Géopolitique contient les Univers "Conflits & Diplomatie", "Afrique",
            "Moyen-Orient", "Chine-USA". La Galaxie Souveraineté : "Médias & Censure",
            "Lanceurs d'alerte", "Libertés numériques".
          </p>
          <p className={s.sectionText}>
            Chaque interview, chaque article, chaque dossier est rattaché à une Galaxie
            et à un ou plusieurs Univers. Le lecteur peut naviguer par thème, par format,
            ou par invité — et retrouver tout le contenu lié.
          </p>
        </div>

        <hr className={s.rule} />

        {/* ── 2. L'IA dans le process ── */}
        <div className={s.section}>
          <span className={s.sectionNum}>02</span>
          <h2 className={s.sectionTitle}>L'IA au service du contenu</h2>
          <p className={s.sectionText}>
            L'IA n'est pas un gadget ici — elle est dans les process.
            Chaque interview est <strong>transcrite fidèlement</strong> et automatiquement.
            À partir de cette transcription, l'IA découpe, structure et génère des articles
            liés. Un entretien d'1h30 produit 3 à 5 articles de fond, chacun sourcé et
            contextualisé.
          </p>
          <p className={s.sectionText}>
            Surtout : chaque contenu publié est adossé à du <strong>fact-checking IA</strong>.
            Sources croisées, données vérifiées, alertes sur les affirmations non sourcées.
            L'objectif : que chaque contenu qui sort soit hyper fiable.
          </p>
          <p className={s.sectionText}>
            Et la logique d'<strong>internationalisation</strong> : chaque contenu sera
            traduit et adapté dans toutes les langues. Thinkerview a vocation à devenir
            un portail international — la parole libre, sans frontières.
          </p>
        </div>

        <hr className={s.rule} />

        {/* ── 3. Stratégie média ── */}
        <div className={s.section}>
          <span className={s.sectionNum}>03</span>
          <h2 className={s.sectionTitle}>Stratégie du média</h2>
          <p className={s.sectionText}>
            Thinkerview aujourd'hui, c'est YouTube + Tipeee. C'est puissant, mais c'est
            une dépendance. Le site devient le <strong>hub central</strong> — le lieu où
            tout converge et où la communauté existe en dehors des plateformes.
          </p>

          <div className={s.subSection}>
            <h3 className={s.subTitle}>Off Investigation & intégrations</h3>
            <p className={s.sectionText}>
              L'interview de Jean-Baptiste Rivoir pose la question frontalement : comment
              intégrer des médias comme Off Investigation dans l'écosystème ? Le site peut
              devenir une plateforme d'accueil pour des contenus partenaires — avec un
              système de <strong>paywall intelligent</strong> : certains contenus gratuits
              pour l'audience large, d'autres réservés aux membres qui financent.
            </p>
          </div>

          <div className={s.subSection}>
            <h3 className={s.subTitle}>Au-delà de Tipeee</h3>
            <p className={s.sectionText}>
              La communauté qui finance sur Tipeee, c'est très bien — mais elle peut être
              encore plus impliquée. Un vrai <strong>espace membre</strong> avec profil,
              contributions, accès exclusifs, participation aux dossiers d'investigation.
              Le membre n'est plus un donateur passif — il devient acteur du média.
            </p>
          </div>

          <div className={s.subSection}>
            <h3 className={s.subTitle}>Distribution multi-plateforme</h3>
            <p className={s.sectionText}>
              Chaque contenu décliné et distribué : YouTube, X, Instagram, TikTok, podcasts.
              Le site est la source, les réseaux sont les canaux. Stratégie social-média
              intégrée, pas bricolée.
            </p>
          </div>
        </div>

        <hr className={s.rule} />

        {/* ── 4. Engagement citoyen ── */}
        <div className={s.section}>
          <span className={s.sectionNum}>04</span>
          <h2 className={s.sectionTitle}>Engagement citoyen</h2>

          <div className={s.subSection}>
            <h3 className={s.subTitle}>Le Baromètre</h3>
            <p className={s.sectionText}>
              Un outil de vote et de sondage sécurisé pour que les Français expriment
              leurs vraies préoccupations. Pensé pour être <strong>massivement utilisé
              avant les présidentielles</strong>. Système de login vérifié, anti-bot,
              résultats transparents.
            </p>
          </div>

          <div className={s.subSection}>
            <h3 className={s.subTitle}>Zéro bot — la promesse tenue</h3>
            <p className={s.sectionText}>
              Système d'authentification ultra-sécurisé. Aucun bot, aucune manipulation.
              Un environnement safe pour aider aussi les <strong>lanceurs d'alerte</strong> —
              contributeurs triés sur le volet, protection des sources garantie.
            </p>
          </div>

          <div className={s.subSection}>
            <h3 className={s.subTitle}>Forum citoyen</h3>
            <p className={s.sectionText}>
              Un espace de discussion et de débat modéré, avec sondages et calendrier
              d'événements. La communauté Thinkerview a un lieu pour penser ensemble.
            </p>
          </div>
        </div>

        <hr className={s.rule} />

        {/* ── 5. Le site page par page ── */}
        <div className={s.section}>
          <span className={s.sectionNum}>05</span>
          <h2 className={s.sectionTitle}>Le site, page par page</h2>
          <ul className={s.featuresList}>
            <li className={s.feature}>
              <span className={s.featureName}>Accueil</span>
              <span className={s.featureDesc}>Vitrine éditoriale — dernière interview, articles à la une, signal d'actualité, 6 Galaxies.</span>
            </li>
            <li className={s.feature}>
              <span className={s.featureName}>Interviews</span>
              <span className={s.featureDesc}>Player vidéo intégré, fiches invités, transcriptions IA, articles générés automatiquement.</span>
            </li>
            <li className={s.feature}>
              <span className={s.featureName}>Articles</span>
              <span className={s.featureDesc}>Décryptages fact-checkés, classés par Galaxie et Univers.</span>
            </li>
            <li className={s.feature}>
              <span className={s.featureName}>Dossiers</span>
              <span className={s.featureDesc}>Investigations au long cours — articles, interviews et données regroupés.</span>
            </li>
            <li className={s.feature}>
              <span className={s.featureName}>Forum</span>
              <span className={s.featureDesc}>Débat citoyen, Baromètre, calendrier d'événements.</span>
            </li>
            <li className={s.feature}>
              <span className={s.featureName}>Newsletter</span>
              <span className={s.featureDesc}>L'essentiel hebdo, sans bruit.</span>
            </li>
            <li className={s.feature}>
              <span className={s.featureName}>Espace membre</span>
              <span className={s.featureDesc}>Inscription sécurisée, profils vérifiés, accès exclusifs, contributions.</span>
            </li>
          </ul>
        </div>

        <hr className={s.rule} />

        {/* ── Closing ── */}
        <div className={s.closing}>
          <p>
            Tout est évolutif. C'est une maquette, une base de discussion.
            Si tu valides la direction, je fonce.
          </p>
          <p>
            J'ai 20 ans de création de médias digitaux derrière moi.
            Je suis trop chaud pour brainstormer avec toi quand tu veux —
            n'hésite pas à me mettre en relation avec qui tu veux.
            Je peux m'occuper de tout.
          </p>
          <p className={s.closingSign}>Alex</p>
        </div>

        <hr className={s.rule} />

        <footer className={s.footer}>
          <p className={s.footerText}>Alex Quilghini · alex@origines.media</p>
        </footer>

      </div>

      <div className={s.stickyBar}>
        <Link to="/home" className={s.ctaBtn}>
          Découvrir la maquette <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
