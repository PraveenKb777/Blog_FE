/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_KEY: string;
    REACT_APP_BASE_URL: string;
  }
}
declare module "*.svg" {
  const content: any;
  export default content;
}
