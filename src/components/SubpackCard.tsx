import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Subpack } from '../data/library';

interface SubpackCardProps {
  subpack: Subpack;
  packId: string;
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

export function SubpackCard({ subpack, packId, onClick, className = '', isSelected = false }: SubpackCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const color = packColors[packId] || '#6E59F0';

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
        minHeight: '180px'
      }}
      data-subpack-id={subpack.id}
      data-selected={isSelected ? "true" : "false"}
      onClick={onClick}
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
      aria-label={`Select ${subpack.label}`}
    >
      {/* Top accent bar */}
      <div 
        className="w-full h-1 rounded-t-xl"
        style={{ backgroundColor: color }}
      />
      
      {/* Card content */}
      <div className="p-4 flex flex-col h-full min-h-[179px]">
        {/* Title */}
        <h3 className="text-[20px] leading-[28px] font-semibold text-[#0F172A] mb-3">
          {subpack.label}
        </h3>
        
        {/* Value Promise */}
        {subpack.valuePromise && (
          <p className="text-[14px] leading-[20px] text-[#475569] mb-4 flex-1">
            {subpack.valuePromise}
          </p>
        )}
        
        {/* Question count */}
        <p className="text-[13px] leading-[18px] text-[#64748B] mb-4">
          {subpack.questions.length} questions • 5 min
        </p>
        
        {/* Footer with start affordance */}
        <div className="flex items-center justify-between text-[13px] leading-[18px] text-[#475569] mt-auto">
          <span>Start Quiz</span>
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