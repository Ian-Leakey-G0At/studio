import { createClient } from '@supabase/supabase-js'

// IMPORTANT: Never expose this client to the browser. It has admin privileges.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error('Missing SUPABASE_URL environment variable')
}

if (!supabaseServiceRoleKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
}

// This client is used for server-side operations that require admin privileges,
// such as creating signed URLs for private content.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    // These options prevent the admin client from trying to manage user sessions
    // or store cookies, as it's intended for backend tasks only.
    autoRefreshToken: false,
    persistSession: false
  }
})