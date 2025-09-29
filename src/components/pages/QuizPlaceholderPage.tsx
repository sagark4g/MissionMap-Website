import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { packsData, PackId } from '../../data/packsData';

interface QuizPlaceholderPageProps {
  onNavigate: (page: string, pack?: string, subpack?: string) => void;
  selectedPack: string;
  selectedSubpack: string;
}

export function QuizPlaceholderPage({ onNavigate, selectedPack, selectedSubpack }: QuizPlaceholderPageProps) {
  const pack = packsData[selectedPack as PackId];
  const subpack = pack?.subpacks.find(s => s.id === selectedSubpack);
  
  if (!pack || !subpack) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[32px] leading-[40px] font-semibold text-[#0F172A] mb-4">
            Subpack not found
          </h2>
          <button 
            onClick={() => onNavigate('packs')}
            className="text-[16px] leading-[24px] text-[#6366F1] hover:underline"
          >
            Go back to packs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="max-w-[600px] mx-auto px-8">
        {/* Back navigation */}
        <button 
          onClick={() => onNavigate('subpacks', selectedPack)}
          className="flex items-center gap-2 text-[16px] leading-[24px] text-[#475569] hover:text-[#0F172A] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to {pack.title}
        </button>

        {/* Quiz placeholder card */}
        <div className="bg-white rounded-xl shadow-[0_8px_24px_rgba(15,23,42,0.08)] p-12 text-center">
          {/* Top accent bar */}
          <div 
            className="w-24 h-1 rounded-full mx-auto mb-8"
            style={{ backgroundColor: pack.color }}
          />
          
          <h1 className="text-[32px] leading-[40px] font-semibold text-[#0F172A] mb-4">
            Quiz starts here for {subpack.title}
          </h1>
          
          <p className="text-[16px] leading-[24px] text-[#475569] mb-8 max-w-md mx-auto">
            {subpack.description}
          </p>
          
          <p className="text-[16px] leading-[24px] text-[#475569] mb-8">
            Answer 10 quick questions to get your personalized 30-day plan.
          </p>
          
          <Button
            onClick={() => onNavigate('quiz', selectedPack, selectedSubpack)}
            className="text-white font-medium px-8 py-3 text-[16px] leading-[24px]"
            style={{ backgroundColor: pack.color }}
            size="lg"
          >
            Start Quiz
          </Button>
          
          <p className="text-[13px] leading-[18px] text-[#475569] mt-4">
            Takes about 3 minutes
          </p>
        </div>
      </div>
    </div>
  );
}