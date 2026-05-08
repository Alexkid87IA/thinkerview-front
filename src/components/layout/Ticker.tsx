import { TICKER_ITEMS } from '../../data/galaxies';
import s from './Ticker.module.css';

export default function Ticker() {
  return (
    <div className={s.tickerBar}>
      <div className={s.inner}>
        <span className={s.tickerLive}>
          <span className={s.tickerDot} />
          En direct — {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} Paris
        </span>
        <div className={s.tickerCenter}>
          <div className={s.tickerScroll}>
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((msg, i) => (
              <span key={i}>{msg}</span>
            ))}
          </div>
        </div>
        <span className={s.tickerEdition}>
          Édition du <time>{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
        </span>
      </div>
    </div>
  );
}
