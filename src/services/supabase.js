import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://sxzltwqufjsjcbsihwcr.supabase.co"; // 🔥 Replace this
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4emx0d3F1ZmpzamNic2lod2NyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTE0MTkxNCwiZXhwIjoyMDc2NzE3OTE0fQ.Ctz3CvDIxzxtarUd0YwAnuUTn-WpostOgafDaQhVr0s"; // 🔒 Never expose service key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export default supabase;
