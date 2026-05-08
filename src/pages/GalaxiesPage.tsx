import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PlaceholderSection from '../components/ui/PlaceholderSection';
import s from './GalaxiesPage.module.css';

export default function GalaxiesPage() {
  return (
    <Layout>
      <section className={s.hero} aria-label="Les 6 galaxies">
        <motion.p className={s.kicker} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
          LES 6 GALAXIES
        </motion.p>
        <motion.h1 className={s.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
          Cartographie du savoir
        </motion.h1>
        <motion.div className={s.heroRule} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} />
        <motion.p className={s.heroDeck} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
          Six axes de lecture pour comprendre le monde. Chaque galaxie contient ses univers — explorez selon vos int&eacute;r&ecirc;ts.
        </motion.p>
      </section>

      <PlaceholderSection id="bento-grid" title="Vue d'ensemble" chapterNum="02" chapterLabel="Vue d'ensemble" />
      <PlaceholderSection id="themes-explorer" title="Explorer par th&egrave;me" chapterNum="03" chapterLabel="Explorer par th&egrave;me" />
      <PlaceholderSection id="latest-articles" title="Derniers contenus" chapterNum="04" chapterLabel="Derniers contenus" />
    </Layout>
  );
}
