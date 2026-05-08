import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import s from './InscriptionPage.module.css';

export default function InscriptionPage() {
  return (
    <Layout>
      <div className={s.wrap}>
        <motion.div className={s.card} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className={s.kicker}>INSCRIPTION</span>
          <h1 className={s.title}>Rejoignez la communauté</h1>
          <p className={s.subtitle}>Créez votre compte pour devenir un citoyen vérifié.</p>
          <div className={s.form}>
            <div>
              <label className={s.label} htmlFor="name">Nom complet</label>
              <input className={s.input} id="name" type="text" placeholder="Jean Dupont" />
            </div>
            <div>
              <label className={s.label} htmlFor="email">Adresse e-mail</label>
              <input className={s.input} id="email" type="email" placeholder="vous@exemple.com" />
            </div>
            <div>
              <label className={s.label} htmlFor="password">Mot de passe</label>
              <input className={s.input} id="password" type="password" placeholder="••••••••" />
            </div>
            <button className={s.submitBtn} type="submit">Créer mon compte</button>
          </div>
          <div className={s.footer}>
            <Link className={s.footerLink} to="/connexion">Déjà un compte ? Se connecter</Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
