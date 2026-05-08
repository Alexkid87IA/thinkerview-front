import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

const ArcanesPage = lazy(() => import('./pages/ArcanesPage'));
const GalaxiesPage = lazy(() => import('./pages/GalaxiesPage'));
const GalaxieDetailPage = lazy(() => import('./pages/GalaxieDetailPage'));
const UniversDetailPage = lazy(() => import('./pages/UniversDetailPage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const InterviewsPage = lazy(() => import('./pages/InterviewsPage'));
const InterviewPage = lazy(() => import('./pages/InterviewPage'));
const DossiersPage = lazy(() => import('./pages/DossiersPage'));
const DossierDetailPage = lazy(() => import('./pages/DossierDetailPage'));
const ForumPage = lazy(() => import('./pages/ForumPage'));
const RejoindrePage = lazy(() => import('./pages/RejoindrePage'));
const NewsletterPage = lazy(() => import('./pages/NewsletterPage'));
const ConnexionPage = lazy(() => import('./pages/ConnexionPage'));
const InscriptionPage = lazy(() => import('./pages/InscriptionPage'));
const AProposPage = lazy(() => import('./pages/AProposPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const MentionsLegalesPage = lazy(() => import('./pages/MentionsLegalesPage'));

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
          <Route path="/galaxies" element={<GalaxiesPage />} />
          <Route path="/galaxie/:galaxieId" element={<GalaxieDetailPage />} />
          <Route path="/galaxie/:galaxieId/:univers" element={<UniversDetailPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="/interviews" element={<InterviewsPage />} />
          <Route path="/interview/:slug" element={<InterviewPage />} />
          <Route path="/dossiers" element={<DossiersPage />} />
          <Route path="/dossier/:slug" element={<DossierDetailPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/rejoindre" element={<RejoindrePage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/connexion" element={<ConnexionPage />} />
          <Route path="/inscription" element={<InscriptionPage />} />
          <Route path="/a-propos" element={<AProposPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
          <Route path="*" element={<ArcanesPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
