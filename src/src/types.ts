export type Page = "home" | "packs" | "subpacks" | "quiz" | "preview" | "tracker" | "review" | "how-it-works" | "pricing" | "signin" | "about" | "blog" | "careers" | "help" | "contact" | "privacy";

export type PreviewData = {
  title: string;
  mission: string;
  thisWeek: string[];
  hook?: string;
};

export interface AppState {
  page: Page;
  // Required variables
  packId: string;
  subpackId: string;
  answers: Record<string, any>;
  previewJSON: PreviewData | null;
  weekJSON: any;
  errorText: string;
  loading: boolean;
  // Legacy compatibility
  selectedPackId: string;
  selectedSubpackId: string;
  currentQuestionIndex: number;
  planData?: any;
  error?: string | null;
  // Additional state for tracker and review
  previewData?: any;
  weeklyProgress?: Record<string, any>;
  currentWeek?: number;
}