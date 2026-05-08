import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PlaceholderSection from '../components/ui/PlaceholderSection';
import s from './ArticlePage.module.css';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <Layout>
      <section className={s.hero} aria-label="Article">
        <motion.p className={s.kicker} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
          ARTICLE
        </motion.p>
        <motion.h1 className={s.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
          Article : {slug}
        </motion.h1>
        <motion.div className={s.heroRule} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} />
        <motion.p className={s.heroDeck} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
          Contenu de l'article &agrave; charger dynamiquement.
        </motion.p>
      </section>

      <PlaceholderSection id="content" title="Corps de l'article" chapterNum="02" chapterLabel="Corps de l'article" />
      <PlaceholderSection id="sidebar" title="Articles liés" chapterNum="03" chapterLabel="Articles liés" />
      <PlaceholderSection id="related-articles" title="À lire aussi" chapterNum="04" chapterLabel="À lire aussi" />
    </Layout>
  );
}
