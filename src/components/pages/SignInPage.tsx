import { Button } from "../ui/button";
import type { Page, AppState } from "../../src/types";

interface SignInPageProps {
  onNavigate: (page: Page, updates?: Partial<AppState>) => void;
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

export function SignInPage({ onNavigate }: SignInPageProps) {
  return (
    <div className="min-h-screen bg-white" data-page="signin">
      <main className="max-w-md mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="mb-6">Sign In</h1>
          <p className="text-xl text-[var(--text-muted)] leading-relaxed">
            Welcome back to MissionMap
          </p>
        </div>

        {/* Content will be provided later */}
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-[var(--text-muted)]">Sign-in form will be added here...</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            onClick={() => onNavigate('packs')}
            className="btn-primary w-full"
          >
            Continue
          </Button>
        </div>
      </main>
    </div>
  );
}