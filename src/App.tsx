import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InteractiveMap } from './components/InteractiveMap';
import { ArtCarousel } from './components/ArtCarousel';
import { CulturalStories } from './components/CulturalStories';
import { Footer } from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { SignInPage } from './pages/SignInPage';
import { AuthCallback } from './pages/AuthCallback';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/artwork/GalleryPage';
import { ArtworkDetailPage } from './pages/artwork/ArtworkDetailPage';
import { ArtworkUpload } from './components/artwork/ArtworkUpload';
import { ProfilePage } from './pages/profile/ProfilePage';
import { ArtEducationPage } from './pages/ArtEducationPage';
import { CollectionsPage } from './pages/CollectionsPage';

function MainContent() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        ) : (
          <div key="main">
            <Header />
            <main>
              <section id="home">
                <HeroSection />
              </section>
              <section id="map">
                <InteractiveMap />
              </section>              
              <section id="gallery">
                <ArtCarousel />
              </section>
              <section id="stories">
                <CulturalStories />
              </section>
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
      {/* Auth modal is now handled by route */}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/artwork/new" element={<ArtworkUpload />} />
          <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/art-education" element={<ArtEducationPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;