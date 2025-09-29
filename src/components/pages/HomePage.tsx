import { Button } from "../ui/button";
import { PackMainCard } from "../PackMainCard";
import type { Page, AppState } from "../../src/types";

interface HomePageProps {
  onNavigate: (page: Page, updates?: Partial<AppState>) => void;
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const packs = [
    {
      type: 'fitness' as const,
      title: 'Fitness & Health',
      description: 'Fat-loss, strength, or rehab.'
    },
    {
      type: 'work' as const,
      title: 'Work & Productivity',
      description: 'Focus, promotion, or career switch.'
    },
    {
      type: 'money' as const,
      title: 'Money & Career',
      description: 'Budget, debt, or savings.'
    },
    {
      type: 'relationships' as const,
      title: 'Relationships & Social',
      description: 'Communication, dating, or marriage.'
    },
    {
      type: 'purpose' as const,
      title: 'Purpose & Clarity',
      description: 'Direction, values, or projects.'
    },
    {
      type: 'learning' as const,
      title: 'Learning & Habits',
      description: 'Study, exams, or skills.'
    }
  ];

  return (
    <div className="min-h-screen bg-white" data-page="home">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* Logo placeholder */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6E59F0] to-[#4F46E5] flex items-center justify-center shadow-lg">
                  <div className="w-6 h-6 bg-white rounded-md"></div>
                </div>
                <div className="text-2xl font-semibold text-[#0F172A]">MissionMap</div>
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-[#0F172A] leading-tight">
                  Make progress you can 
                  <span className="block text-[#6E59F0]">actually feel</span>
                </h1>
                <p className="text-xl text-[#475569] leading-relaxed max-w-lg">
                  Answer 10 quick questions. Get a personalized 30-day plan you can actually finish.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  id="cta-start"
                  size="lg"
                  onClick={() => onNavigate('packs')}
                  className="bg-[#6E59F0] hover:bg-[#4F46E5] text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Take the quiz
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => onNavigate('how-it-works')}
                  className="border-2 border-[#E2E8F0] hover:border-[#6E59F0] text-[#475569] hover:text-[#6E59F0] px-8 py-4 text-lg font-medium transition-all duration-200"
                >
                  See how it works
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 pt-8 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                  <span className="text-sm text-[#475569]">6 life areas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#6366F1] rounded-full"></div>
                  <span className="text-sm text-[#475569]">30-day plans</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#F59E0B] rounded-full"></div>
                  <span className="text-sm text-[#475569]">Daily tracking</span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6E59F0]/10 to-[#4F46E5]/5 rounded-3xl transform rotate-3"></div>
              
              {/* Main container */}
              <div className="relative bg-white rounded-3xl p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)] border border-[#E2E8F0]/50">
                {/* Progress visualization */}
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Your Progress Journey</h3>
                    <p className="text-sm text-[#475569]">From quiz to success in 30 days</p>
                  </div>

                  {/* Step cards */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#10B981]/10 to-transparent rounded-xl border border-[#10B981]/20">
                      <div className="w-8 h-8 bg-[#10B981] text-white rounded-lg flex items-center justify-center text-sm font-semibold">1</div>
                      <div>
                        <div className="font-medium text-[#0F172A] text-sm">Pick your focus area</div>
                        <div className="text-xs text-[#475569]">Fitness, Work, Money & more</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#6366F1]/10 to-transparent rounded-xl border border-[#6366F1]/20">
                      <div className="w-8 h-8 bg-[#6366F1] text-white rounded-lg flex items-center justify-center text-sm font-semibold">2</div>
                      <div>
                        <div className="font-medium text-[#0F172A] text-sm">Answer 10 questions</div>
                        <div className="text-xs text-[#475569]">Quick & personalized</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#F59E0B]/10 to-transparent rounded-xl border border-[#F59E0B]/20">
                      <div className="w-8 h-8 bg-[#F59E0B] text-white rounded-lg flex items-center justify-center text-sm font-semibold">3</div>
                      <div>
                        <div className="font-medium text-[#0F172A] text-sm">Get your plan</div>
                        <div className="text-xs text-[#475569]">30 days of daily actions</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#8B5CF6]/10 to-transparent rounded-xl border border-[#8B5CF6]/20">
                      <div className="w-8 h-8 bg-[#8B5CF6] text-white rounded-lg flex items-center justify-center text-sm font-semibold">4</div>
                      <div>
                        <div className="font-medium text-[#0F172A] text-sm">Track progress</div>
                        <div className="text-xs text-[#475569]">Feel the momentum build</div>
                      </div>
                    </div>
                  </div>

                  {/* Success indicator */}
                  <div className="text-center pt-6 border-t border-[#E2E8F0]">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#10B981]/10 text-[#10B981] rounded-full text-sm font-medium">
                      <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
                      Progress you can actually feel
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packs Grid */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Choose your focus area</h2>
            <p className="text-muted-foreground">Pick what matters most to you right now</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {packs.map((pack) => (
              <PackMainCard
                key={pack.type}
                type={pack.type}
                title={pack.title}
                description={pack.description}
                onClick={() => onNavigate('subpacks', { 
                  packId: pack.type,
                  selectedPackId: pack.type,
                  subpackId: "",
                  selectedSubpackId: "",
                  answers: {},
                  currentQuestionIndex: 0
                })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">How it works</h2>
            <p className="text-muted-foreground">Three simple steps to get started</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-semibold">1</span>
              </div>
              <h3 className="mb-2">Take the Quiz</h3>
              <p className="text-small text-muted-foreground">
                Answer 10 questions about your goals and situation
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-semibold">2</span>
              </div>
              <h3 className="mb-2">Get Your Preview</h3>
              <p className="text-small text-muted-foreground">
                See your personalized plan before you commit
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-semibold">3</span>
              </div>
              <h3 className="mb-2">Track Weekly</h3>
              <p className="text-small text-muted-foreground">
                Check off your goals and build momentum
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-small mb-4">
                "Finally, a plan that actually fits my real life. I'm seeing progress in just 2 weeks."
              </p>
              <div className="text-xs text-muted-foreground">— Sarah, Fitness Pack</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-small mb-4">
                "The quiz nailed exactly what I needed. No fluff, just actionable steps."
              </p>
              <div className="text-xs text-muted-foreground">— Mike, Work Pack</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-small mb-4">
                "I tried so many apps. This is the first one that actually stuck."
              </p>
              <div className="text-xs text-muted-foreground">— Alex, Money Pack</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4">Simple pricing</h2>
          <p className="text-muted-foreground mb-8">Start with a free preview, then choose your plan</p>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-card">
            <div className="mb-6">
              <div className="flex justify-center items-baseline gap-2 mb-2">
                <span className="text-2xl font-semibold">$12</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <div className="flex justify-center">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                  2 months free with annual
                </div>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full mb-4"
              onClick={() => onNavigate('packs')}
            >
              Start with a preview (free)
            </Button>
            
            <p className="text-small text-muted-foreground">
              No commitment required. Cancel anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}