import { LIBRARY } from "../../data/library";
import { SubpackCard } from "../SubpackCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { getPackIcon } from "../icons/PackIcons";
import type { Page, AppState } from "../../src/types";

interface SubpacksPageProps {
  onNavigate: (page: Page, updates?: Partial<AppState>) => void;
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

// Pack color mapping
const packColors: Record<string, string> = {
  fitness: '#10B981',
  work: '#6366F1', 
  money: '#F59E0B',
  relationships: '#F43F5E',
  purpose: '#8B5CF6',
  learning: '#3B82F6'
};

export function SubpacksPage({ onNavigate, appState }: SubpacksPageProps) {
  const { selectedPackId, packId, selectedSubpackId, subpackId } = appState;
  
  // Use packId as primary, fall back to selectedPackId for compatibility
  const currentPackId = packId || selectedPackId;
  const currentSubpackId = subpackId || selectedSubpackId;
  
  // Find the current pack
  const pack = LIBRARY.packs.find(p => p.id === currentPackId);

  // Guard: If no currentPackId, show redirect message and redirect
  if (!currentPackId || currentPackId === '') {
    return (
      <div className="min-h-screen bg-[var(--surface-soft)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[var(--text-h3)] font-semibold text-[var(--text-default)] mb-4">
            No pack selected
          </h2>
          <p className="text-[var(--text-body)] text-[var(--text-muted)] mb-6">
            Please select a pack to continue.
          </p>
          <Button onClick={() => onNavigate('packs')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go to Packs
          </Button>
        </div>
      </div>
    );
  }

  const handleSelectSubpack = (subpackId: string) => {
    // Action 1: Set variable subpackId
    // Action 2: Navigate to the page named "Quiz"
    onNavigate('quiz', { 
      subpackId: subpackId,
      selectedSubpackId: subpackId,
      answers: {},
      currentQuestionIndex: 0
    });
  };

  const handleBack = () => {
    onNavigate('packs', {
      packId: "",
      selectedPackId: "",
      subpackId: "",
      selectedSubpackId: "",
      answers: {},
      currentQuestionIndex: 0
    });
  };

  // Show a loading state if pack is not yet available
  if (!pack) {
    return (
      <div className="min-h-screen bg-[var(--surface-soft)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Loading pack...</p>
        </div>
      </div>
    );
  }

  const color = packColors[pack.id] || '#6E59F0';

  return (
    <div className="min-h-screen bg-[var(--surface-soft)]" data-page="subpacks">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Button 
          onClick={handleBack}
          data-action="goto-packs"
          variant="ghost" 
          className="mb-6 text-[var(--text-muted)] hover:text-[var(--text-default)]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Packs
        </Button>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-1 bg-[var(--stroke-subtle)] rounded-full"></div>
          <div 
            className="w-8 h-1 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
          <div className="w-8 h-1 bg-[var(--stroke-subtle)] rounded-full"></div>
          <div className="w-8 h-1 bg-[var(--stroke-subtle)] rounded-full"></div>
        </div>

        {/* Enhanced Pack Header */}
        <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.08)] p-8 mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: `${color}15` }}
              >
                {getPackIcon(pack.id, { 
                  size: 32, 
                  color: color,
                  className: "flex-shrink-0"
                })}
              </div>
              <h1 className="text-[40px] leading-[48px] font-bold text-[var(--text-default)]">
                <span id="subpacks-pack-label">{pack.label}</span>
              </h1>
            </div>
            <p className="text-[20px] leading-[32px] text-[var(--text-muted)] max-w-3xl mx-auto mb-6">
              Choose your specific focus area to get a personalized 30-day plan that fits your goals and lifestyle.
            </p>
            
            {/* Quick benefits */}
            <div className="flex items-center justify-center gap-8 text-[14px] text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                <span>{pack.subpacks.length} focus areas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                <span>10 questions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                <span>30-day plan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subpacks Grid - Main Focus */}
        <div>
          <h2 className="text-[24px] leading-[32px] font-semibold text-[var(--text-default)] text-center mb-8">
            Pick what matters most to you right now
          </h2>
          <div id="subpacks-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pack.subpacks.map((subpack) => (
              <SubpackCard
                key={subpack.id}
                subpack={subpack}
                packId={pack.id}
                isSelected={subpack.id === currentSubpackId}
                onClick={() => handleSelectSubpack(subpack.id)}
              />
            ))}
          </div>
        </div>

        {/* Bottom encouragement */}
        <div className="text-center mt-12 pt-8 border-t border-[var(--stroke-subtle)]">
          <p className="text-[14px] text-[var(--text-muted)]">
            Each area is designed to help you make progress you can actually feel
          </p>
        </div>
      </div>
    </div>
  );
}