import { Skeleton } from "../ui/skeleton";

export function PreviewLoadingState() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-white border-b border-[#E2E8F0] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Skeleton className="h-4 w-48" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Hero Card Skeleton */}
        <div className="bg-white rounded-xl p-8 shadow-[0_6px_20px_rgba(15,23,42,0.08)] border-l-4 border-gray-200">
          <div className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-9 w-96" />
              <Skeleton className="h-6 w-full max-w-2xl" />
              <Skeleton className="h-6 w-80" />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </div>

        {/* First Week Skeleton */}
        <div className="bg-white rounded-xl p-8 shadow-[0_6px_20px_rgba(15,23,42,0.08)]">
          <Skeleton className="h-7 w-32 mb-6" />
          <div className="space-y-4 mb-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="h-6 flex-1" />
              </div>
            ))}
          </div>
          <Skeleton className="h-16 w-full" />
        </div>

        {/* Why This Will Work Skeleton */}
        <div className="bg-white rounded-xl p-8 shadow-[0_6px_20px_rgba(15,23,42,0.08)]">
          <Skeleton className="h-7 w-48 mb-6" />
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Skeleton className="h-5 w-40 mb-4" />
              <div className="space-y-2">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full" />
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-5 w-40 mb-4" />
              <div className="space-y-2">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TrackerLoadingState() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-[#E2E8F0] px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <Skeleton className="h-7 w-80" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Skeletons */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Plan Skeleton */}
            <div className="bg-white rounded-xl p-6 shadow-[0_6px_20px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="border border-[#E2E8F0] rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Skeleton className="w-5 h-5 mt-1" />
                      <div className="flex-1 min-w-0 space-y-2">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Board Skeleton */}
            <div className="bg-white rounded-xl p-6 shadow-[0_6px_20px_rgba(15,23,42,0.08)]">
              <Skeleton className="h-7 w-32 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-4">
                {[...Array(7)].map((_, index) => (
                  <div key={index} className="p-4 border border-[#E2E8F0] rounded-lg">
                    <div className="text-center mb-3">
                      <Skeleton className="h-4 w-12 mx-auto mb-1" />
                      <Skeleton className="h-3 w-16 mx-auto" />
                    </div>
                    <div className="space-y-2 mb-3">
                      {[...Array(3)].map((_, taskIndex) => (
                        <Skeleton key={taskIndex} className="h-3 w-full" />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3 w-12" />
                      <Skeleton className="h-4 w-6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeletons */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-[0_6px_20px_rgba(15,23,42,0.08)]">
              <Skeleton className="h-5 w-24 mb-4" />
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Skeleton className="w-5 h-5 mt-1" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-[0_6px_20px_rgba(15,23,42,0.08)]">
              <Skeleton className="h-5 w-32 mb-4" />
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <div className="flex gap-1">
                    {[...Array(8)].map((_, i) => (
                      <Skeleton key={i} className="w-6 h-6 rounded-full" />
                    ))}
                  </div>
                </div>
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DayDetailLoadingState() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <Skeleton className="h-4 w-32 mb-4" />
          <div className="flex items-center gap-4 mb-2">
            <Skeleton className="h-9 w-48" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-[0_6px_20px_rgba(15,23,42,0.08)] space-y-8">
          <div>
            <Skeleton className="h-7 w-32 mb-6" />
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border border-[#E2E8F0] rounded-lg">
                  <Skeleton className="w-5 h-5 mt-1" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Skeleton className="h-5 w-32 mb-4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>

          <div>
            <Skeleton className="h-5 w-16 mb-4" />
            <Skeleton className="h-32 w-full" />
          </div>

          <div>
            <Skeleton className="h-5 w-40 mb-4" />
            <div className="flex gap-4">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="w-12 h-12" />
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#E2E8F0]">
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}