import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PlaceholderSection from '../components/ui/PlaceholderSection';
import s from './AProposPage.module.css';

const RAISONS = [
  { titre: `Des milliers d'heures qui dorment`, texte: `Des milliers d'heures d'entretiens en archives. Chacun peut encore servir, à condition de le retrouver, de le vérifier et de le relier à l'actualité.` },
  { titre: `L'actu n'attend pas`, texte: `Thinkerview prend le temps. L'actualité, elle, bouge tous les jours. Il faut une équipe pour la suivre, sans baisser l'exigence.` },
  { titre: `La confiance se prouve`, texte: `Montrer ses sources, dire ce qu'on ne sait pas, corriger ses erreurs partout. C'est ce qui fait la différence.` },
  { titre: `Des idées sans frontières`, texte: `Publier aussi en anglais, puis dans d'autres langues, pour toucher bien plus de monde.` },
];

export default function AProposPage() {
  return (
    <Layout>
      <section className={s.hero} aria-label="À propos de PHASE III">
        <motion.p className={s.kicker} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>À PROPOS</motion.p>
        <motion.h1 className={s.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>Qui sommes-nous ?</motion.h1>
        <motion.div className={s.heroRule} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} />
        <motion.p className={s.heroDeck} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>Un média d'info qui prolonge Thinkerview. Thinkerview fait les grands entretiens. PHASE III vérifie, enquête, suit l'actualité et publie partout : site, vidéos, réseaux, en plusieurs langues.</motion.p>
      </section>

      {/* ── L'esprit PHASE III et les raisons du projet, repris du dossier pour Sky ── */}
      <section className={s.esprit} aria-label="L'esprit PHASE III">
        <div className={s.espritInner}>
          <span className={s.espritLabel}>L'esprit</span>
          <p className={s.espritTitre}>La revanche de ceux <em>qui pensent autrement.</em></p>
          <p className={s.espritTexte}>
            Ceux qu'on trouvait trop curieux, trop têtus, trop « à côté » voient souvent ce que les autres ratent.
            PHASE III fait de cette façon de penser une méthode : creuser, vérifier, ne rien prendre pour acquis.
          </p>

          <h2 className={s.raisonsTitre}>Pourquoi ce projet</h2>
          <ol className={s.raisons}>
            {RAISONS.map((r, i) => (
              <li key={r.titre} className={s.raison}>
                <span className={s.raisonNum}>{String(i + 1).padStart(2, '0')}</span>
                <b className={s.raisonTitre}>{r.titre}</b>
                <p className={s.raisonTexte}>{r.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PlaceholderSection id="histoire" title="Notre histoire" chapterNum="02" chapterLabel="Notre histoire" />
      <PlaceholderSection id="fondateurs" title="Fondateurs" chapterNum="03" chapterLabel="Fondateurs" />
      <PlaceholderSection id="valeurs" title="Nos valeurs" chapterNum="04" chapterLabel="Nos valeurs" />
      <PlaceholderSection id="chiffres" title="Chiffres clés" chapterNum="05" chapterLabel="Chiffres clés" />
      <PlaceholderSection id="equipe" title="L'équipe" chapterNum="06" chapterLabel="L'équipe" />
    </Layout>
  );
}
