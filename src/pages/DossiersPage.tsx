import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PlaceholderSection from '../components/ui/PlaceholderSection';
import s from './DossiersPage.module.css';

export default function DossiersPage() {
  return (
    <Layout>
      <section className={s.hero} aria-label="En-tête dossiers">
        <motion.p className={s.kicker} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
          DOSSIERS
        </motion.p>
        <motion.h1 className={s.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
          Investigations au long cours
        </motion.h1>
        <motion.div className={s.heroRule} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} />
        <motion.p className={s.heroDeck} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
          Des enquêtes croisant plusieurs sources et angles, publiées sur plusieurs semaines.
        </motion.p>
      </section>

      <PlaceholderSection id="toolbar" title="Filtres & recherche" chapterNum="02" chapterLabel="Toolbar" />
      <PlaceholderSection id="dossiers-grid" title="Tous les dossiers" chapterNum="03" chapterLabel="DossiersGrid" />
    </Layout>
  );
}
