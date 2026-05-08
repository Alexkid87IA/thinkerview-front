import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PlaceholderSection from '../components/ui/PlaceholderSection';
import s from './InterviewsPage.module.css';

export default function InterviewsPage() {
  return (
    <Layout>
      <section className={s.hero} aria-label="Interviews longues">
        <motion.p className={s.kicker} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
          INTERVIEWS LONGUES
        </motion.p>
        <motion.h1 className={s.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
          Face &agrave; face sans filtre
        </motion.h1>
        <motion.div className={s.heroRule} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} />
        <motion.p className={s.heroDeck} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
          Des entretiens de 1 &agrave; 3 heures, sans coupure, face &agrave; des experts et lanceurs d'alerte.
        </motion.p>
      </section>

      <PlaceholderSection id="toolbar" title="Filtres & tri" chapterNum="02" chapterLabel="Filtres & tri" />
      <PlaceholderSection id="interviews-grid" title="Grille d'interviews" chapterNum="03" chapterLabel="Grille d'interviews" />
      <PlaceholderSection id="pagination" title="Navigation" chapterNum="04" chapterLabel="Navigation" />
    </Layout>
  );
}
