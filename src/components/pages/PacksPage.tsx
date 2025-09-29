import { LIBRARY } from "../../data/library";
import { PackCard } from "../PackCard";
import type { Page, AppState } from "../../src/types";

interface PacksPageProps {
  onNavigate: (page: Page, updates?: Partial<AppState>) => void;
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

export function PacksPage({ onNavigate, appState }: PacksPageProps) {
  const { selectedPackId, packId } = appState;
  const currentPackId = packId || selectedPackId;
  
  const handleSelectPack = (packId: string) => {
    // Action 1: Set variable packId
    // Action 2: Navigate to the page named "Subpacks"
    onNavigate('subpacks', { 
      packId: packId,
      selectedPackId: packId,
      selectedSubpackId: "",
      subpackId: "",
      answers: {},
      currentQuestionIndex: 0
    });
  };

  return (
    <div className="min-h-screen bg-[var(--surface-soft)]" data-page="packs">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-[var(--text-h2)] font-bold text-[var(--text-default)] mb-4">
            Pick a Pack
          </h1>
          <p className="text-[var(--text-body)] text-[var(--text-muted)] max-w-2xl mx-auto">
            Choose the area where you want to make progress you can actually feel.
          </p>
        </div>

        {/* Packs Grid */}
        <div id="packs-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {LIBRARY.packs.map((pack) => (
            <PackCard
              key={pack.id}
              pack={pack}
              isSelected={pack.id === currentPackId}
              onClick={() => handleSelectPack(pack.id)}
            />
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <button 
            data-action="goto-home"
            onClick={() => onNavigate('home')}
            className="text-[var(--text-muted)] hover:text-[var(--text-default)] transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}