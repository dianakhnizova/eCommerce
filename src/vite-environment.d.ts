interface ImportMetaEnvironment {
  readonly VITE_CTP_AUTH_URL: string;
  VITE_CTP_API_URL: string;
  VITE_CTP_PROJECT_KEY: string;
  VITE_CTP_SCOPES: string;
  VITE_CTP_CLIENT_ID: string;
  VITE_CTP_CLIENT_SECRET: string;
  VITE_CTP_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnvironment;
}
