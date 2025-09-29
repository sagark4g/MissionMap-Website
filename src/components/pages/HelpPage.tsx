import { Button } from "../ui/button";
import type { Page, AppState } from "../../src/types";

interface HelpPageProps {
  onNavigate: (page: Page, updates?: Partial<AppState>) => void;
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

export function HelpPage({ onNavigate }: HelpPageProps) {
  return (
    <div className="min-h-screen bg-white" data-page="help">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="mb-6">Help Center</h1>
          <p className="text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto">
            Get answers to your questions
          </p>
        </div>

        {/* Content will be provided later */}
        <div className="space-y-12">
          <div className="text-center">
            <p className="text-[var(--text-muted)]">Content will be added here...</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            onClick={() => onNavigate('contact')}
            className="btn-primary"
          >
            Contact support
          </Button>
        </div>
      </main>
    </div>
  );
}