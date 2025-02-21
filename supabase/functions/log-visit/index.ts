
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const body = await req.json()
    const { path, referrer } = body
    
    // Get IP and user agent from request headers
    const ip_address = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip')
    const user_agent = req.headers.get('user-agent')

    console.log('Logging visit:', { path, referrer, ip_address, user_agent })

    const { data, error } = await supabaseClient
      .from('visits')
      .insert([
        {
          path,
          referrer,
          ip_address,
          user_agent
        }
      ])

    if (error) {
      console.error('Error logging visit:', error)
      throw error
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
