import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import s from './ConnexionPage.module.css';

export default function ConnexionPage() {
  return (
    <Layout>
      <div className={s.wrap}>
        <motion.div className={s.card} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className={s.kicker}>CONNEXION</span>
          <h1 className={s.title}>Accédez à votre espace</h1>
          <p className={s.subtitle}>Connectez-vous pour voter, débattre et accéder aux contenus exclusifs.</p>
          <div className={s.form}>
            <div>
              <label className={s.label} htmlFor="email">Adresse e-mail</label>
              <input className={s.input} id="email" type="email" placeholder="vous@exemple.com" />
            </div>
            <div>
              <label className={s.label} htmlFor="password">Mot de passe</label>
              <input className={s.input} id="password" type="password" placeholder="••••••••" />
            </div>
            <button className={s.submitBtn} type="submit">Se connecter</button>
          </div>
          <div className={s.footer}>
            <Link className={s.footerLink} to="/inscription">Pas encore de compte ? S'inscrire</Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
