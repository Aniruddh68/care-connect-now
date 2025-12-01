import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SMSRequest {
  phoneNumber: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phoneNumber, message }: SMSRequest = await req.json();

    if (!phoneNumber || !message) {
      return new Response(
        JSON.stringify({ error: 'Phone number and message are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format phone number for India (add +91 if not present)
    let formattedPhone = phoneNumber.replace(/\s+/g, '').replace(/-/g, '');
    if (!formattedPhone.startsWith('+')) {
      if (formattedPhone.startsWith('91')) {
        formattedPhone = '+' + formattedPhone;
      } else {
        formattedPhone = '+91' + formattedPhone;
      }
    }

    // Log the SMS (for demo purposes - in production, integrate with Twilio/MSG91/etc.)
    console.log(`📱 SMS to ${formattedPhone}: ${message}`);

    // TODO: When Twilio credentials are added, use this:
    // const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    // const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    // const twilioPhone = Deno.env.get('TWILIO_PHONE_NUMBER');
    
    // For now, simulate successful SMS send
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'SMS sent successfully (demo mode)',
        to: formattedPhone,
        content: message
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('SMS Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send SMS', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
