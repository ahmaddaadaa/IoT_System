import "dotenv/config";

const required = ["SUPABASE_URL", "SUPABASE_ANON_KEY"];

required.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1);
  }
});

export const env = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  PORT: process.env.PORT || 3001
};