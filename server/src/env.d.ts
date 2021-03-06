declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDIS_URL: string;
      PORT: string;
      SESSION_SECRET: string;
      CORS_ORIGIN: string;
      DATABASE_URL: string;
    }
  }
}

export {}
