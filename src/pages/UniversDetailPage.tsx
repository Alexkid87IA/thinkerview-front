import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PlaceholderSection from '../components/ui/PlaceholderSection';
import { GALAXIES, PILLAR_COLORS } from '../data/galaxies';
import s from './UniversDetailPage.module.css';

export default function UniversDetailPage() {
  const { galaxieId, univers } = useParams<{ galaxieId: string; univers: string }>();
  const galaxy = GALAXIES.find(g => g.key === galaxieId) || GALAXIES[0];
  const universObj = galaxy.univers.find(u => u.slug === univers) || galaxy.univers[0];

  return (
    <Layout>
      <section
        className={s.hero}
        aria-label={universObj.label}
        style={{ '--accent': PILLAR_COLORS[galaxy.key].accent } as React.CSSProperties}
      >
        <motion.p className={s.kicker} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
          {galaxy.label} / {universObj.label}
        </motion.p>
        <motion.h1 className={s.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
          {universObj.label}
        </motion.h1>
        <motion.div className={s.heroRule} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} />
        <motion.p className={s.heroDeck} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
          Tous les contenus li&eacute;s &agrave; &laquo;&nbsp;{universObj.label}&nbsp;&raquo; dans la galaxie {galaxy.label}.
        </motion.p>
      </section>

      <PlaceholderSection id="featured-content" title="À la une" chapterNum="02" chapterLabel="À la une" />
      <PlaceholderSection id="articles-grid" title="Tous les articles" chapterNum="03" chapterLabel="Tous les articles" />
      <PlaceholderSection id="related-univers" title="Univers liés" chapterNum="04" chapterLabel="Univers liés" />
    </Layout>
  );
}
