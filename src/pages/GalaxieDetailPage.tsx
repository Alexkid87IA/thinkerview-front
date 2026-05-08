import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PlaceholderSection from '../components/ui/PlaceholderSection';
import { GALAXIES, PILLAR_COLORS } from '../data/galaxies';
import s from './GalaxieDetailPage.module.css';

export default function GalaxieDetailPage() {
  const { galaxieId } = useParams<{ galaxieId: string }>();
  const galaxy = GALAXIES.find(g => g.key === galaxieId) || GALAXIES[0];
  const idx = GALAXIES.findIndex(g => g.key === galaxy.key);

  return (
    <Layout>
      <section
        className={s.hero}
        aria-label={galaxy.label}
        style={{ '--accent': PILLAR_COLORS[galaxy.key].accent } as React.CSSProperties}
      >
        <motion.p className={s.kicker} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
          GALAXIE {String(idx + 1).padStart(2, '0')}/06
        </motion.p>
        <motion.h1 className={s.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
          {galaxy.label}
        </motion.h1>
        <motion.div className={s.heroRule} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} />
        <motion.p className={s.heroDeck} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
          {galaxy.text}
        </motion.p>
      </section>

      <PlaceholderSection id="featured-article" title="À la une" chapterNum="02" chapterLabel="À la une" />
      <PlaceholderSection id="univers-nav" title="Univers" chapterNum="03" chapterLabel="Univers" />
      <PlaceholderSection id="articles-grid" title="Articles" chapterNum="04" chapterLabel="Articles" />
      <PlaceholderSection id="newsletter" title="Newsletter" chapterNum="05" chapterLabel="Newsletter" />
      <PlaceholderSection id="faq" title="Questions fréquentes" chapterNum="06" chapterLabel="Questions fréquentes" />
      <PlaceholderSection id="related-galaxies" title="Autres galaxies" chapterNum="07" chapterLabel="Autres galaxies" />
    </Layout>
  );
}
