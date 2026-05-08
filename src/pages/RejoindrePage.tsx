import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PlaceholderSection from '../components/ui/PlaceholderSection';
import s from './RejoindrePage.module.css';

export default function RejoindrePage() {
  return (
    <Layout>
      <section className={s.hero} aria-label="En-tête rejoindre">
        <motion.p className={s.kicker} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
          REJOINDRE
        </motion.p>
        <motion.h1 className={s.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
          Devenez acteur de l'information
        </motion.h1>
        <motion.div className={s.heroRule} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} />
        <motion.p className={s.heroDeck} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
          Thinkerview repose sur une communauté de citoyens bénévoles. Voici comment contribuer.
        </motion.p>
      </section>

      <PlaceholderSection id="intro" title="Pourquoi rejoindre" chapterNum="02" chapterLabel="Intro" />
      <PlaceholderSection id="missions" title="Les missions" chapterNum="03" chapterLabel="Missions" />
      <PlaceholderSection id="application-form" title="Candidature" chapterNum="04" chapterLabel="ApplicationForm" />
      <PlaceholderSection id="cta" title="Appel à action" chapterNum="05" chapterLabel="CTA" />
    </Layout>
  );
}
