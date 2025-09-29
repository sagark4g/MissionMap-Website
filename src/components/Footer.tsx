import type { Page, AppState } from "../src/types";

interface FooterProps {
  onNavigate?: (page: Page, updates?: Partial<AppState>) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavigation = (page: Page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('packs')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Packs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('quiz')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Quiz
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('tracker')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tracker
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('about')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('blog')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('careers')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('help')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('contact')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('privacy')}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <div className="text-xl font-semibold text-primary mb-4">MissionMap</div>
            <p className="text-sm text-muted-foreground">Make progress you can actually feel.</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8">
          <p className="text-sm text-muted-foreground">
            © 2024 MissionMap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}