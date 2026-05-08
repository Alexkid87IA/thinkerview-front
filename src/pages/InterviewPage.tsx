import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PlaceholderSection from '../components/ui/PlaceholderSection';
import s from './InterviewPage.module.css';

export default function InterviewPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <Layout>
      <section className={s.hero} aria-label="En-tête interview">
        <motion.p className={s.kicker} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
          INTERVIEW
        </motion.p>
        <motion.h1 className={s.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
          Interview : {slug}
        </motion.h1>
        <motion.div className={s.heroRule} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} />
        <motion.p className={s.heroDeck} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
          Contenu de l'interview à charger dynamiquement.
        </motion.p>
      </section>

      <PlaceholderSection id="video-player" title="Lecteur vidéo" chapterNum="02" chapterLabel="VideoPlayer" />
      <PlaceholderSection id="details" title="Transcription & notes" chapterNum="03" chapterLabel="Details" />
      <PlaceholderSection id="related-interviews" title="Interviews liées" chapterNum="04" chapterLabel="RelatedInterviews" />
    </Layout>
  );
}
