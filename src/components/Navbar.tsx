import { Button } from "./ui/button";
import type { Page, AppState } from "../src/types";

interface NavbarProps {
  currentPage?: Page;
  onNavigate?: (page: Page, updates?: Partial<AppState>) => void;
  appState?: AppState;
}

export function Navbar({ currentPage, onNavigate, appState }: NavbarProps) {
  const handleNavigation = (page: Page, updates?: Partial<AppState>) => {
    console.log('🧭 Navbar: Navigation requested:', { page, updates }); // Debug log
    if (onNavigate) {
      onNavigate(page, updates);
    }
  };

  // Handle home navigation - reset state when going home
  const handleHomeNavigation = () => {
    console.log('🏠 Navbar: Home navigation triggered'); // Debug log
    handleNavigation('home', {
      selectedPackId: "",
      selectedSubpackId: "",
      answers: {},
      currentQuestionIndex: 0,
      planData: undefined
    });
  };

  // Smart navigation for Packs button
  const handlePacksNavigation = () => {
    console.log('📦 Navbar: Packs navigation triggered, selectedPackId:', appState?.selectedPackId); // Debug log
    if (appState?.selectedPackId && appState.selectedPackId !== '') {
      // User has selected a pack, go to subpacks for that pack
      console.log('📦 Navbar: Pack selected, navigating to subpacks'); // Debug log
      handleNavigation('subpacks');
    } else {
      // No pack selected, go to packs page
      console.log('📦 Navbar: No pack selected, navigating to packs'); // Debug log
      handleNavigation('packs');
    }
  };

  // Smart navigation for Get Started button
  const handleGetStarted = () => {
    console.log('🚀 Navbar: Get Started triggered'); // Debug log
    if (appState?.selectedPackId && appState.selectedPackId !== '' && appState?.selectedSubpackId && appState.selectedSubpackId !== '') {
      // User has selected both, go to quiz
      handleNavigation('quiz');
    } else {
      // Start from the beginning
      handleNavigation('packs');
    }
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={handleHomeNavigation}
              className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              MissionMap
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('tracker')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'tracker'
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Tracker
            </button>
            <button 
              onClick={handlePacksNavigation}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'packs' || currentPage === 'subpacks'
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Packs
            </button>
            <div id="mm-review-nav" className="relative">
              <button 
                onClick={() => handleNavigation('review')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'review'
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Review
              </button>
              <div className="mm-review-dot absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" style={{ visibility: 'hidden' }}></div>
            </div>
            <a 
              href="/#how"
              className={`text-sm font-medium transition-colors ${
                currentPage === 'how-it-works'
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              How It Works
            </a>
            <a 
              href="/#pricing"
              className={`text-sm font-medium transition-colors ${
                currentPage === 'pricing'
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Pricing
            </a>
            <a 
              href="/signin"
              className={`text-sm font-medium transition-colors ${
                currentPage === 'signin'
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign in
            </a>
          </div>

          <Button 
            onClick={handleGetStarted}
            size="sm"
          >
            Get started
          </Button>
        </div>
      </div>
    </nav>
  );
}