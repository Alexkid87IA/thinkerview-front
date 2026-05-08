import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ArcanesPage = lazy(() => import('./pages/ArcanesPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const Loading = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-gray-400 text-lg">Chargement...</div>
  </div>
);

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ArcanesPage />} />
          <Route path="/arcanes" element={<ArcanesPage />} />
          <Route path="*" element={<ArcanesPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
