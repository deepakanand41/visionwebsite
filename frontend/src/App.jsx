import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import DestinationDetail from './pages/DestinationDetail';

const ReferAndEarn = lazy(() => import('./pages/ReferAndEarn'));
const IELTSPTETraining = lazy(() => import('./pages/IELTSPTETraining'));
const EducationLoans = lazy(() => import('./pages/EducationLoans'));
const SuccessStories = lazy(() => import('./pages/SuccessStories'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const SignIn = lazy(() => import('./pages/SignIn'));
const NewsListPage = lazy(() => import('./pages/ContentHub').then((m) => ({ default: m.NewsListPage })));
const NewsDetailPage = lazy(() => import('./pages/ContentHub').then((m) => ({ default: m.NewsDetailPage })));
const BlogListPage = lazy(() => import('./pages/ContentHub').then((m) => ({ default: m.BlogListPage })));
const BlogDetailPage = lazy(() => import('./pages/ContentHub').then((m) => ({ default: m.BlogDetailPage })));
const Offers = lazy(() => import('./pages/Offers'));
const Careers = lazy(() => import('./pages/Careers'));
const BookExam = lazy(() => import('./pages/BookExam'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="w-10 h-10 rounded-full border-4 animate-spin"
        style={{ borderColor: '#A50000', borderTopColor: 'transparent' }}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/study-abroad/:slug" element={<DestinationDetail />} />
            <Route path="/ielts-training" element={<IELTSPTETraining exam="ielts" />} />
            <Route path="/pte-training" element={<IELTSPTETraining exam="pte" />} />
            <Route path="/book-ielts-exam" element={<BookExam exam="ielts" />} />
            <Route path="/book-pte-exam" element={<BookExam exam="pte" />} />
            <Route path="/ielts-pte-training" element={<Navigate to="/ielts-training" replace />} />
            <Route path="/education-loans" element={<EducationLoans />} />
            <Route path="/refer-and-earn" element={<ReferAndEarn />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/news" element={<NewsListPage />} />
            <Route path="/news/:slug" element={<NewsDetailPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}
