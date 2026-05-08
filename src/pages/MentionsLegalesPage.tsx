import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import s from './MentionsLegalesPage.module.css';

export default function MentionsLegalesPage() {
  return (
    <Layout>
      <section className={s.hero} aria-label="Mentions légales">
        <motion.p className={s.kicker} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>LÉGAL</motion.p>
        <motion.h1 className={s.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>Mentions légales</motion.h1>
        <motion.div className={s.heroRule} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} />
        <motion.p className={s.heroDeck} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>Informations légales relatives au site thinkerview.com</motion.p>
      </section>
      <div className={s.content}>
        <p>Contenu juridique à intégrer.</p>
      </div>
    </Layout>
  );
}
