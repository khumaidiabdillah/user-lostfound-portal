import { createClient } from '@supabase/supabase-js'

const userUrl = process.env.NEXT_PUBLIC_DB_USER_URL || 'https://placeholder.supabase.co'
const userKey = process.env.DB_USER_SERVICE_ROLE_KEY || 'placeholder-service-role-key'

export const supabaseUserDB = createClient(
  userUrl,
  userKey,
  { db: { schema: 'schema_lostfound' } }
)
