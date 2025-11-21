import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { carName, city, price, category, baseImageUrl } = await req.json();

    if (!carName || !city || !price) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: carName, city, price" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating OG image for:", { carName, city, price, category });

    // Créer un prompt détaillé pour une image OG professionnelle
    const prompt = `Create a professional social media share image (1200x630px) for a car rental service.

Layout:
- Background: Modern gradient (dark blue to teal) with subtle geometric patterns
- Left side: Show a ${carName} car (${category || 'modern vehicle'}) in a professional studio lighting
- Right side: Information overlay with:
  * Car name: "${carName}" in large, bold, white text
  * Location: "${city}" with a pin icon in smaller text
  * Price: "${price}" in prominent orange/yellow text with "par jour" below
  * Small logo placeholder in top right corner
  
Style: Professional, modern, clean design with high contrast text for readability on social media. Make it eye-catching and premium-looking.`;

    // Appeler Lovable AI pour générer l'image
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`AI Gateway error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log("AI response received");

    // Extraire l'image générée
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      throw new Error("No image generated in response");
    }

    // Optionnel: Sauvegarder l'image dans Supabase Storage pour la mettre en cache
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Convertir base64 en blob pour upload
    if (imageUrl.startsWith("data:image")) {
      const base64Data = imageUrl.split(",")[1];
      const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
      
      // Créer un nom de fichier unique basé sur les paramètres de la voiture
      const fileName = `og-${carName.replace(/\s+/g, "-").toLowerCase()}-${city.replace(/\s+/g, "-").toLowerCase()}.png`;
      const filePath = `og-images/${fileName}`;

      // Vérifier si le bucket existe, sinon le créer
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(b => b.name === "og-images");

      if (!bucketExists) {
        await supabase.storage.createBucket("og-images", {
          public: true,
          fileSizeLimit: 5242880, // 5MB
        });
      }

      // Upload l'image
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("og-images")
        .upload(filePath, imageBuffer, {
          contentType: "image/png",
          upsert: true,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
      } else {
        console.log("Image uploaded successfully:", filePath);
        
        // Retourner l'URL publique
        const { data: publicUrlData } = supabase.storage
          .from("og-images")
          .getPublicUrl(filePath);

        return new Response(
          JSON.stringify({ 
            imageUrl: publicUrlData.publicUrl,
            cached: true 
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Si pas de cache, retourner l'image base64 directement
    return new Response(
      JSON.stringify({ imageUrl, cached: false }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
