// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ehbmrdaxhswhdbcmgvfx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoYm1yZGF4aHN3aGRiY21ndmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNzAzNzMsImV4cCI6MjA2Njc0NjM3M30.HUgzlzT1a2er-lpUV-P7vIsuwCnH14tOR9YpVg8l9TA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);