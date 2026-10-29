import { useEffect } from 'react';
import Ticker from './Ticker';
import Header from './Header';
import SoutienBand from './SoutienBand';
import Footer from './Footer';
import s from './Layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.style.background = '#FFFFFF';
    document.body.style.color = '#0E0D14';
    return () => {
      document.body.style.background = '';
      document.body.style.color = '';
    };
  }, []);

  return (
    <div className={s.page}>
      <Ticker />
      <Header />
      <SoutienBand />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
