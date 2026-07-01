import { createClient } from "@supabase/supabase-js";
// export const supabaseUrl = "https://pthfnkuaynjpjshkemef.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0aGZua3VheW5qcGpzaGtlbWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNzQ2ODMsImV4cCI6MjA4Njg1MDY4M30.BxCjzO5mbDBVD9ophcPfBPf0BnLnhw7J_0p4tm_r-ng";
// const supabase = createClient(supabaseUrl, supabaseKey);
// export default supabase;
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);
export default supabase;
