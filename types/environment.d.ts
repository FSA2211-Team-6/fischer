declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      NEXTAUTH_URL: string;
      JWT_SECRET: string;
      OPENAI_ORG_ID: string;
      OPENAI_API_KEY: string;
      DATABASE_URL: string;
    }
  }
}

export {};
