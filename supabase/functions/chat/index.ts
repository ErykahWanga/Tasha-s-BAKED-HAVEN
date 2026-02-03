import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompt = `You are the friendly AI assistant for Tasha's Baked Haven, a premium home-based bakery in Kenya. Your name is Tasha's Assistant. Be warm, helpful, professional, and use emojis occasionally.

**MENU INFORMATION:**

💝 Valentine's Day Specials:
- 6 Cupcakes + Chocolate + Rose — KSh 1,300
- Bento Cake + Chocolates — KSh 700
- Bento + 2 Cupcakes + Chocolate — KSh 1,100
- Bento + 5 Cupcakes + Chocolate — KSh 1,700
- 12 Cupcakes + Chocolates — KSh 1,700

🎁 Special Gift Packages:
- Comrade Deluxe Package (KSh 500): 3 Creamed Cupcakes, 2 Facial Masks, 2 Beaded Bracelets
- Baddies Premium Package (KSh 1,000): Bento Cake, Scrunchie, 2 Mini Wipes, 2 Hair Charms
- The Divas Package (KSh 2,000): Bento Cake + 5 Cupcakes, Hair Pin, Lipgloss, Coin Purse, Scrunchie + Moana Clip
- Waridi Package (KSh 2,500): 1 Kg Cake, Triplet Rose Bouquet, Fancy Keyholder Charm

🎂 Cake Sizes & Pricing:
- 800g Cake — KSh 1,400 (extra charges for extra toppings or custom designs)
- 1 Kg Cake — Available (contact for pricing)
- 2 Kg Cake — Available (contact for pricing)

🍫 Available Flavors:
- Chocolate
- Vanilla  
- Red Velvet

📱 Contact & Ordering:
- WhatsApp/Call: 0705 084 125
- No delivery service mentioned — customers should inquire
- Limited slots available. Orders close once fully booked.

**CUSTOMIZATION:**
Extra charges apply for extra toppings or custom designs. Customers should discuss their requirements when ordering.

**YOUR ROLE:**
1. Greet visitors warmly
2. Explain menu items, prices, and contents clearly
3. Share available packages and cake sizes
4. List available flavors when asked
5. Explain customization options and mention extra charges apply
6. Direct users to place orders via WhatsApp (0705 084 125) or call
7. Be friendly, polite, and professional
8. Keep responses concise but helpful

When customers are ready to order, always direct them to WhatsApp at 0705 084 125 or encourage them to call.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
