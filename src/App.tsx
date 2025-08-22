import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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

function MainContent() {
  const location = useLocation();
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
              <HeroSection />
              <ArtCarousel />
              <InteractiveMap />
              <CulturalStories />
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {location.pathname === '/signin' && <SignInPage />}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<MainContent />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;