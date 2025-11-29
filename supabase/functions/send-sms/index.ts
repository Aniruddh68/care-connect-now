import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SMSRequest {
  phoneNumber: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  hospital: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phoneNumber, doctorName, appointmentDate, appointmentTime, hospital }: SMSRequest = await req.json();

    const message = `Your appointment with ${doctorName} is confirmed for ${appointmentDate} at ${appointmentTime}. Location: ${hospital}. Thank you for booking with CareConnect!`;

    // Log the SMS that would be sent (for testing)
    console.log("=== SMS NOTIFICATION ===");
    console.log(`To: ${phoneNumber}`);
    console.log(`Message: ${message}`);
    console.log("========================");

    // Simulate SMS sent successfully
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "SMS notification logged successfully",
        details: { phoneNumber, message }
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-sms function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
