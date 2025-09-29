import { Button } from "../ui/button";
import type { Page, AppState } from "../../src/types";

interface PricingPageProps {
  onNavigate: (page: Page, updates?: Partial<AppState>) => void;
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  return (
    <div className="min-h-screen bg-white" data-page="pricing">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="mb-6">Pricing</h1>
          <p className="text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto">
            Simple, transparent pricing that grows with you
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
            onClick={() => onNavigate('packs')}
            className="btn-primary"
          >
            Start free preview
          </Button>
        </div>
      </main>
    </div>
  );
}