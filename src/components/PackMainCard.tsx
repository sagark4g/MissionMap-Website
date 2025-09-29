import { ChevronRight, Dumbbell, Target, Wallet, Heart, Compass, BookOpen } from "lucide-react";

type PackType = 'fitness' | 'work' | 'money' | 'relationships' | 'purpose' | 'learning';

interface PackMainCardProps {
  type: PackType;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

const packStyles = {
  fitness: { color: '#10B981', bgColor: 'bg-[#10B981]' },
  work: { color: '#6366F1', bgColor: 'bg-[#6366F1]' },
  money: { color: '#F59E0B', bgColor: 'bg-[#F59E0B]' },
  relationships: { color: '#F43F5E', bgColor: 'bg-[#F43F5E]' },
  purpose: { color: '#8B5CF6', bgColor: 'bg-[#8B5CF6]' },
  learning: { color: '#3B82F6', bgColor: 'bg-[#3B82F6]' }
};

const packIcons = {
  fitness: Dumbbell,
  work: Target,
  money: Wallet,
  relationships: Heart,
  purpose: Compass,
  learning: BookOpen
};

export function PackMainCard({ type, title, description, onClick, className = "" }: PackMainCardProps) {
  const IconComponent = packIcons[type];
  const style = packStyles[type];
  
  return (
    <div 
      className={`w-80 h-50 bg-white rounded-xl shadow-[0_8px_24px_rgba(15,23,42,0.08)] cursor-pointer transition-all duration-200 hover:shadow-[0_12px_32px_rgba(15,23,42,0.12)] hover:border hover:-translate-y-0.5 group ${className}`}
      style={{ borderColor: `${style.color}20` }}
      onClick={onClick}
    >
      {/* Top accent bar */}
      <div className={`h-1 ${style.bgColor} rounded-t-xl`}></div>
      
      <div className="p-4 space-y-3">
        {/* Header row: icon + title */}
        <div className="flex items-center gap-3">
          <IconComponent 
            size={24} 
            style={{ color: style.color }}
            className="flex-shrink-0"
          />
          <h3 className="text-[22px] leading-[28px] font-semibold text-[#0F172A]">
            {title}
          </h3>
        </div>
        
        {/* Description */}
        <p className="text-[16px] leading-[24px] text-[#475569]">
          {description}
        </p>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[13px] leading-[18px] text-[#475569]">Explore</span>
          <ChevronRight 
            size={16} 
            className="text-[#475569] transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </div>
  );
}