import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // এটি হবে আপনার ফ্রন্টএন্ডের URL
  baseURL: "https://commune-pulse.vercel.app" 
});