import { auth } from "@/lib/auth";

// Next.js App Router-এর জন্য BetterAuth ডিফল্টভাবেই Web Handler সাপোর্ট করে
export const GET = auth.handler;
export const POST = auth.handler;