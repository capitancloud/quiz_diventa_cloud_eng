/// <reference types="vite/client" />

// Global gtag function injected by the Google Analytics snippet in index.html
interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gtag: (...args: any[]) => void;
  dataLayer: unknown[];
}

interface ImportMetaEnv {
  readonly VITE_LEAD_WEBHOOK_URL?: string;
  readonly VITE_CTA_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
