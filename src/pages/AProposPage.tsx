import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PlaceholderSection from '../components/ui/PlaceholderSection';
import s from './AProposPage.module.css';

export default function AProposPage() {
  return (
    <Layout>
      <section className={s.hero} aria-label="À propos de ThinkerView">
        <motion.p className={s.kicker} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>À PROPOS</motion.p>
        <motion.h1 className={s.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>Qui sommes-nous ?</motion.h1>
        <motion.div className={s.heroRule} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} />
        <motion.p className={s.heroDeck} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>ThinkerView est un groupe indépendant issu d'internet, très différent de la plupart des think-tanks qui sont inféodés à des partis politiques ou des intérêts privés.</motion.p>
      </section>
      <PlaceholderSection id="histoire" title="Notre histoire" chapterNum="02" chapterLabel="Notre histoire" />
      <PlaceholderSection id="fondateurs" title="Fondateurs" chapterNum="03" chapterLabel="Fondateurs" />
      <PlaceholderSection id="valeurs" title="Nos valeurs" chapterNum="04" chapterLabel="Nos valeurs" />
      <PlaceholderSection id="chiffres" title="Chiffres clés" chapterNum="05" chapterLabel="Chiffres clés" />
      <PlaceholderSection id="equipe" title="L'équipe" chapterNum="06" chapterLabel="L'équipe" />
    </Layout>
  );
}
