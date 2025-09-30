/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}'
  ],
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: ["light", {
        mytheme: {
          "primary": "#8b5cf6",      // Purple
          "secondary": "#64748b",     // Slate
          "accent": "#10b981",        // Green
          "neutral": "#1f2937",       // Gray
          "base-100": "#ffffff",      // White background
          "base-200": "#f8fafc",      // Light gray
          "base-300": "#e2e8f0",      // Medium gray
          "info": "#3b82f6",          // Blue
          "success": "#10b981",       // Green
          "warning": "#f59e0b",       // Orange
          "error": "#ef4444",         // Red
        },
      }], // Use only light theme, removes dark defaults
    styled: true,
    base: true,
    utils: true,
  }
}