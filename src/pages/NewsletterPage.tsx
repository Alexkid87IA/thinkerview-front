import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PlaceholderSection from '../components/ui/PlaceholderSection';
import s from './NewsletterPage.module.css';

export default function NewsletterPage() {
  return (
    <Layout>
      <section className={s.hero} aria-label="En-tête newsletter">
        <motion.p className={s.kicker} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
          ALERTES SIGNAL
        </motion.p>
        <motion.h1 className={s.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
          L'essentiel, chaque semaine
        </motion.h1>
        <motion.div className={s.heroRule} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} />
        <motion.p className={s.heroDeck} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
          Analyses géopolitiques, documents déclassifiés, signaux faibles — directement dans votre boîte.
        </motion.p>
      </section>

      <PlaceholderSection id="signup-form" title="S'inscrire" chapterNum="02" chapterLabel="SignupForm" />
      <PlaceholderSection id="benefits" title="Ce que vous recevez" chapterNum="03" chapterLabel="Benefits" />
      <PlaceholderSection id="testimonials" title="Témoignages" chapterNum="04" chapterLabel="Testimonials" />
      <PlaceholderSection id="cta-bottom" title="Dernière chance" chapterNum="05" chapterLabel="CTABottom" />
    </Layout>
  );
}
