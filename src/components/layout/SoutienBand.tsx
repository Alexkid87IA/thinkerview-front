import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import s from './SoutienBand.module.css';

const TIPEEE_URL = 'https://fr.tipeee.com/thinkerview';

// Valeurs de repli si l'API Tipeee est injoignable — relevées le 6 août 2026.
const REPLI = { tipeurs: 2031, montantMensuel: 16367 };

interface Soutien {
  tipeurs: number;
  montantMensuel: number;
}

export default function SoutienBand() {
  const [data, setData] = useState<Soutien>(REPLI);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let annule = false;

    fetch('/api/tipeee')
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: Soutien) => {
        if (annule) return;
        setData({ tipeurs: d.tipeurs, montantMensuel: d.montantMensuel });
        setLive(true);
      })
      .catch(() => {
        /* on garde les valeurs de repli */
      });

    return () => { annule = true; };
  }, []);

  const nb = (n: number) => n.toLocaleString('fr-FR');

  return (
    <aside className={s.band} aria-label="Soutenir Thinkerview">
      <div className={s.inner}>
        <div className={s.pitch}>
          <span className={s.eyebrow}>Financement citoyen · Thinkerview</span>
          <p className={s.title}>Sans vous, rien ne sort.</p>
          <p className={s.text}>
            Ni publicité, ni actionnaire, ni subvention — chaque interview existe parce que
            des citoyens la financent.
          </p>
        </div>

        <dl className={s.stats}>
          <div className={s.stat}>
            <dt className={s.statLabel}>
              Tipeurs
              {live && <span className={s.liveDot} title="Chiffres Tipeee à jour" />}
            </dt>
            <dd className={s.statValue}>{nb(data.tipeurs)}</dd>
          </div>
          <div className={s.stat}>
            <dt className={s.statLabel}>Collecté</dt>
            <dd className={s.statValue}>
              {nb(data.montantMensuel)} €<small> / mois</small>
            </dd>
          </div>
        </dl>

        <a href={TIPEEE_URL} target="_blank" rel="noopener" className={s.cta}>
          Je contribue
          <ArrowRight className={s.ctaIcon} />
        </a>
      </div>
    </aside>
  );
}
