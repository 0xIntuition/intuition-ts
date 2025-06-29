// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://intuition-nextjs-template.vercel.app'
export const NEXT_PUBLIC_WC_PROJECT_ID =
  process.env.NEXT_PUBLIC_WC_PROJECT_ID || 'TEST_123456789'
