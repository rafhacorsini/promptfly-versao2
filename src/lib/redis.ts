import { Redis } from "@upstash/redis";

// Cliente Redis (Upstash / Vercel KV).
// Usa as variáveis KV_REST_API_URL e KV_REST_API_TOKEN.
export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});
