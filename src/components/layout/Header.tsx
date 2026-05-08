import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Menu, X, ChevronDown } from 'lucide-react';
import { GALAXIES, PILLAR_COLORS } from '../../data/galaxies';
import s from './Header.module.css';

export default function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <Link to="/" className={s.logo}>
          <img src="/thinkerview-logo.png" alt="Thinkerview" className={s.logoImg} />
        </Link>

        <nav className={s.nav}>
          <div
            className={s.megaTrigger}
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button
              type="button"
              className={`${s.navLink} ${megaOpen ? s.navLinkActive : ''}`}
              onClick={() => setMegaOpen(o => !o)}
            >
              <svg className={s.navIconSvg} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                <circle cx="8" cy="8" r="6" />
                <ellipse cx="8" cy="8" rx="6" ry="2.5" />
                <ellipse cx="8" cy="8" rx="6" ry="2.5" transform="rotate(60 8 8)" />
                <ellipse cx="8" cy="8" rx="6" ry="2.5" transform="rotate(120 8 8)" />
              </svg>
              Galaxies
              <ChevronDown className={`${s.navChevron} ${megaOpen ? s.navChevronOpen : ''}`} />
            </button>
          </div>
          {[
            { label: 'Comprendre', to: '/articles' },
            { label: 'Interviews', to: '/interviews' },
            { label: 'Dossiers', to: '/dossiers' },
            { label: 'Forum', to: '/forum' },
            { label: 'Newsletter', to: '/newsletter' },
          ].map(item => (
            <Link key={item.label} to={item.to} className={s.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="/rejoindre" className={s.joinBtn}>
          <ShieldCheck className={s.joinIcon} />
          Rejoindre
        </Link>

        <button
          className={s.menuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Fermer' : 'Menu'}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mega dropdown */}
      <div
        className={`${s.mega} ${megaOpen ? s.megaOpen : ''}`}
        onMouseEnter={() => setMegaOpen(true)}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className={s.inner}>
          <div className={s.megaHeader}>
            <span className={s.megaHeaderLabel}>Les 6 Galaxies</span>
            <span className={s.megaHeaderHint}>Explorer par thème</span>
          </div>
          <div className={s.megaGrid}>
            {GALAXIES.map((g, i) => {
              const colors = PILLAR_COLORS[g.key];
              return (
                <div key={g.key} className={s.megaCol} style={{ '--col-color': colors.accent } as React.CSSProperties}>
                  <div className={s.megaColAccent} />
                  <span className={s.megaNum}>{String(i + 1).padStart(2, '0')}</span>
                  <Link to={`/galaxie/${g.key}`} className={s.megaTitle}>
                    <span className={s.megaDot} style={{ background: colors.accent }} />
                    {g.label}
                  </Link>
                  <p className={s.megaTagline}>{g.text}</p>
                  <div className={s.megaLinks}>
                    {g.univers.map(u => (
                      <Link key={u.slug} to={`/galaxie/${g.key}/${u.slug}`} className={s.megaLink}>
                        {u.label}
                      </Link>
                    ))}
                  </div>
                  <Link to={`/galaxie/${g.key}`} className={s.megaAll}>
                    Explorer {g.label.toLowerCase()} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Univers bar */}
      <div className={s.universBar}>
        <div className={s.inner}>
          <div className={`${s.universBarTrack} ${tagsOpen ? s.universBarTrackOpen : ''}`}>
            {GALAXIES.flatMap(g =>
              g.univers.map(u => (
                <Link
                  key={`${g.key}-${u.slug}`}
                  to={`/galaxie/${g.key}/${u.slug}`}
                  className={s.universBarItem}
                >
                  {u.label}
                </Link>
              ))
            )}
          </div>
          <div className={s.universBarActions}>
            <button
              type="button"
              className={s.universBarToggle}
              onClick={() => setTagsOpen(o => !o)}
            >
              {tagsOpen ? 'Voir moins' : 'Voir plus'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
