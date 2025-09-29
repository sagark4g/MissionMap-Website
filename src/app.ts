import "./styles/globals.css";
import { useState, useEffect } from 'react';
import { HomePage } from './components/pages/HomePage';
import { PacksPage } from './components/pages/PacksPage';
import { SubpacksPage } from './components/pages/SubpacksPage';
import { QuizPage } from './components/pages/QuizPage';
import { PreviewPage } from './components/pages/PreviewPage';
import { TrackerUnifiedPage } from './components/pages/TrackerUnifiedPage';
import { WeeklyReviewUnifiedPage } from './components/pages/WeeklyReviewUnifiedPage';
import { HowItWorksPage } from './components/pages/HowItWorksPage';
import { PricingPage } from './components/pages/PricingPage';
import { SignInPage } from './components/pages/SignInPage';
import { AboutPage } from './components/pages/AboutPage';
import { BlogPage } from './components/pages/BlogPage';
import { CareersPage } from './components/pages/CareersPage';
import { HelpPage } from './components/pages/HelpPage';
import { ContactPage } from './components/pages/ContactPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

import type { Page, AppState } from './src/types';

function App() {
  // Application state with proper initialization
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isInitialized, setIsInitialized] = useState(false);
  const [appState, setAppState] = useState<AppState>(() => ({
    page: 'home',
    // Required variables
    packId: '',
    subpackId: '',
    answers: {},
    previewJSON: null,
    weekJSON: null,
    errorText: '',
    loading: false,
    // Legacy compatibility
    selectedPackId: '',
    selectedSubpackId: '',
    currentQuestionIndex: 0,
    // Optional fields
    planData: null,
    error: null,
    previewData: null,
    weeklyProgress: {},
    currentWeek: 1
  }));
  
  // Initialize app after mounting
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);
    
    // Load preview enhancement script
    const script = document.createElement('script');
    script.src = '/preview-enhancement.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      clearTimeout(timer);
      // Cleanup script if component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const updateAppState = (updates: Partial<AppState>) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  const navigateToPage = (page: Page, updates?: Partial<AppState>) => {
    setCurrentPage(page);
    updateAppState({ 
      page: page,
      ...updates 
    });
  };

  // Remove mock preview generation - QuizPage now handles API calls directly

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onNavigate={navigateToPage}
            appState={appState}
            updateAppState={updateAppState}
          />
        );
      case 'packs':
        return (
          <PacksPage 
            onNavigate={navigateToPage}
            appState={appState}
            updateAppState={updateAppState}
          />
        );
      case 'subpacks':
        return (
          <SubpacksPage 
            onNavigate={navigateToPage}
            appState={appState}
            updateAppState={updateAppState}
          />
        );
      case 'quiz':
        return (
          <QuizPage 
            onNavigate={navigateToPage}
            appState={appState}
            updateAppState={updateAppState}
          />
        );
      case 'preview':
        return (
          <PreviewPage 
            onNavigate={navigateToPage}
            appState={appState}
            updateAppState={updateAppState}
          />
        );
      case 'tracker':
        return (
          <TrackerUnifiedPage 
            onNavigate={navigateToPage}
            appState={appState}
            updateAppState={updateAppState}
          />
        );
      case 'review':
        return (
          <WeeklyReviewUnifiedPage 
            onNavigate={navigateToPage}
            appState={appState}
            updateAppState={updateAppState}
          />
        );
      case 'how-it-works':
        return (
          <HowItWorksPage 
            onNavigate={navigateToPage}
            appState={appState}
            updateAppState={updateAppState}
          />
        );
      case 'pricing':
        return (
          <PricingPage 
            onNavigate={navigateToPage}
            appState={appState}
            updateAppState={updateAppState}
          />
        );
      case 'signin':
        return (
          <SignInPage 
            onNavigate={navigateToPage}
            appState={appState}
            updateAppState={updateAppState}
          />
        );
      case 'about':
        return (
          <AboutPage 
            onNavigate={navigateToPage}
            appState={appState}
            updateAppState={updateAppState}
          />
        );
      case 'blog':
        return (
          <BlogPage 
            onNavigate={navigateToPage}
            appState={appState}
            updateAppState={updateAppState}
          />
        );
      case 'careers':
        return (
          <CareersPage 
            onNavigate={navigateToPage}
            appState={appState}
            updateAppState={updateAppState}
          />
        );
      case 'help':
        return (
          <HelpPage 
            onNavigate={navigateToPage}
            appState={appState}
            updateAppState={updateAppState}
          />
        );
      case 'contact':
        return (
          <ContactPage 
            onNavigate={navigateToPage}
            appState={appState}
            updateAppState={updateAppState}
          />
        );
      case 'privacy':
        return (
          <PrivacyPage 
            onNavigate={navigateToPage}
            appState={appState}
            updateAppState={updateAppState}
          />
        );
      default:
        return (
          <HomePage 
            onNavigate={navigateToPage}
            appState={appState}
            updateAppState={updateAppState}
          />
        );
    }
  };

  // Show loading state during initialization
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading MissionMap...</p>
        </div>
      </div>
    );
  }

  // Add basic error boundary
  try {
    return (
      <div className="min-h-screen bg-white">
        <Navbar 
          currentPage={currentPage}
          onNavigate={navigateToPage}
          appState={appState}
        />
        
        <main>
          {renderCurrentPage()}
        </main>
        
        <Footer onNavigate={navigateToPage} />
        <Toaster />
      </div>
    );
  } catch (error) {
    console.error('[App] Render error:', error);
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-4">Please refresh the page to try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
}

export default App;
