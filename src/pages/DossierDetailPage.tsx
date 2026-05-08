import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PlaceholderSection from '../components/ui/PlaceholderSection';
import s from './DossierDetailPage.module.css';

export default function DossierDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <Layout>
      <section className={s.hero} aria-label="En-tête dossier">
        <motion.p className={s.kicker} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
          DOSSIER
        </motion.p>
        <motion.h1 className={s.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
          Dossier : {slug}
        </motion.h1>
        <motion.div className={s.heroRule} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} />
        <motion.p className={s.heroDeck} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
          Contenu du dossier à charger dynamiquement.
        </motion.p>
      </section>

      <PlaceholderSection id="articles-list" title="Articles du dossier" chapterNum="02" chapterLabel="ArticlesList" />
      <PlaceholderSection id="related-dossiers" title="Dossiers liés" chapterNum="03" chapterLabel="RelatedDossiers" />
    </Layout>
  );
}
