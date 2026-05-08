import { useEffect } from 'react';
import Ticker from './Ticker';
import Header from './Header';
import Footer from './Footer';
import s from './Layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.style.background = '#F0EDE6';
    document.body.style.color = '#0A0A0A';
    return () => {
      document.body.style.background = '';
      document.body.style.color = '';
    };
  }, []);

  return (
    <div className={s.page}>
      <Ticker />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
