import { Button } from "../ui/button";
import { Calendar, Target, AlertCircle, RefreshCw } from "lucide-react";

interface EmptyStateProps {
  onNavigate?: (page: string, pack?: string, subpack?: string) => void;
}

export function EmptyTrackerState({ onNavigate }: EmptyStateProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="bg-white rounded-xl p-8 shadow-[0_6px_20px_rgba(15,23,42,0.08)]">
          <div className="mb-6">
            <Calendar size={48} className="mx-auto mb-4 text-[#475569]" />
            <h2 className="text-[28px] leading-[36px] font-semibold text-[#0F172A] mb-2">
              No week yet
            </h2>
            <p className="text-[16px] leading-[24px] text-[#475569]">
              Start your plan to begin tracking your progress.
            </p>
          </div>
          
          <Button 
            onClick={() => onNavigate?.('preview')}
            className="w-full bg-[#6E59F0] hover:bg-[#4F46E5] text-white font-medium"
          >
            Start your plan
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ErrorState({ 
  onRetry,
  message = "Couldn't load your data. Check your connection and try again."
}: {
  onRetry?: () => void;
  message?: string;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="bg-white rounded-xl p-8 shadow-[0_6px_20px_rgba(15,23,42,0.08)]">
          <div className="mb-6">
            <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
            <h2 className="text-[28px] leading-[36px] font-semibold text-[#0F172A] mb-2">
              Something went wrong
            </h2>
            <p className="text-[16px] leading-[24px] text-[#475569]">
              {message}
            </p>
          </div>
          
          <Button 
            onClick={onRetry}
            variant="outline"
            className="w-full border-[#E2E8F0] text-[#475569] hover:text-[#0F172A] hover:border-[#0F172A]"
          >
            <RefreshCw size={16} className="mr-2" />
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}

export function EmptyWeekState() {
  return (
    <div className="bg-white rounded-xl p-12 shadow-[0_6px_20px_rgba(15,23,42,0.08)] text-center">
      <Target size={48} className="mx-auto mb-4 text-[#475569]" />
      <h3 className="text-[20px] leading-[28px] font-semibold text-[#0F172A] mb-2">
        Week not started
      </h3>
      <p className="text-[16px] leading-[24px] text-[#475569] mb-6">
        Complete your weekly review to unlock the next week.
      </p>
      <Button variant="outline" className="border-[#E2E8F0] text-[#475569]">
        Start Week Review
      </Button>
    </div>
  );
}

export function EmptyDayState() {
  return (
    <div className="bg-white rounded-xl p-8 shadow-[0_6px_20px_rgba(15,23,42,0.08)] text-center">
      <Calendar size={32} className="mx-auto mb-4 text-[#475569]" />
      <h4 className="text-[16px] leading-[24px] font-semibold text-[#0F172A] mb-2">
        Day not started
      </h4>
      <p className="text-[14px] leading-[20px] text-[#475569]">
        Click to plan your day and track progress.
      </p>
    </div>
  );
}