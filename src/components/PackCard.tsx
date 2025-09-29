import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { getPackIcon } from './icons/PackIcons';
import { Pack } from '../data/library';

interface PackCardProps {
  pack: Pack;
  onClick?: () => void;
  className?: string;
  isSelected?: boolean;
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

export function PackCard({ pack, onClick, className = '', isSelected = false }: PackCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const color = packColors[pack.id] || '#6E59F0';

  const handleClick = () => {
    onClick?.();
  };
  
  return (
    <div
      className={`
        bg-white rounded-xl shadow-[0_8px_24px_rgba(15,23,42,0.08)] 
        cursor-pointer transition-all duration-200 transform
        ${isHovered ? 'shadow-[0_12px_32px_rgba(15,23,42,0.12)] -translate-y-1' : ''}
        ${isPressed ? 'scale-98' : ''}
        ${className}
      `}
      style={{
        outline: isHovered ? `1px solid ${color}` : 'none',
        outlineOffset: isHovered ? '4px' : '0',
        minHeight: '200px'
      }}
      data-pack-id={pack.id}
      data-selected={isSelected ? "true" : "false"}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Select ${pack.label} pack`}
    >
      {/* Top accent bar */}
      <div 
        className="w-full h-1 rounded-t-xl"
        style={{ backgroundColor: color }}
      />
      
      {/* Card content */}
      <div className="p-4 flex flex-col h-full min-h-[199px]">
        {/* Header row with icon and title */}
        <div className="flex items-center gap-3 mb-3">
          {getPackIcon(pack.id, { 
            size: 24, 
            color: color,
            className: "flex-shrink-0"
          })}
          <h3 className="text-[22px] leading-[28px] font-semibold text-[#0F172A] flex-1">
            {pack.label}
          </h3>
        </div>
        
        {/* Subpacks count */}
        <p className="text-[16px] leading-[24px] text-[#475569] mb-4 flex-1">
          {pack.subpacks.length} focus areas to choose from
        </p>
        
        {/* Footer with explore affordance */}
        <div className="flex items-center justify-between text-[13px] leading-[18px] text-[#475569] mt-auto">
          <span>Explore</span>
          <ChevronRight 
            size={16} 
            className={`transition-transform duration-200 ${
              isHovered ? 'translate-x-0.5' : ''
            }`}
            style={{ color: color }}
          />
        </div>
      </div>
    </div>
  );
}