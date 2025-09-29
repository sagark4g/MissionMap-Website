// Environment configuration for frontend
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  appEnv: import.meta.env.VITE_APP_ENV || 'production',
  isDevelopment: import.meta.env.VITE_APP_ENV === 'development',
  isProduction: import.meta.env.VITE_APP_ENV === 'production',
};

// Type safety for environment variables
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_APP_ENV: string;
  }
}

export {};