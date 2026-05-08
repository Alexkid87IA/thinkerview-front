import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PlaceholderSection from '../components/ui/PlaceholderSection';
import s from './ContactPage.module.css';

export default function ContactPage() {
  return (
    <Layout>
      <section className={s.hero} aria-label="Contactez ThinkerView">
        <motion.p className={s.kicker} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>CONTACT</motion.p>
        <motion.h1 className={s.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>Écrivez-nous</motion.h1>
        <motion.div className={s.heroRule} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} />
        <motion.p className={s.heroDeck} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>Une question, un sujet à proposer, un partenariat — réponse sous 48h.</motion.p>
      </section>
      <PlaceholderSection id="formulaire" title="Formulaire" chapterNum="02" chapterLabel="Formulaire" />
      <PlaceholderSection id="informations" title="Informations" chapterNum="03" chapterLabel="Informations" />
    </Layout>
  );
}
