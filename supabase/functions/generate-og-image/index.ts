import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://benatna.ma",
  "https://www.benatna.ma", 
  "https://lovable.dev",
  "https://id-preview--oaajsamymjhxggwxdfwn.lovable.app",
  "http://localhost:5173",
  "http://localhost:3000"
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && ALLOWED_ORIGINS.some(allowed => 
    origin === allowed || origin.endsWith('.lovable.app') || origin.endsWith('.lovable.dev')
  ) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// Input validation schema
const requestSchema = z.object({
  carName: z.string().min(1).max(100),
  city: z.string().min(1).max(50),
  price: z.string().min(1).max(50),
  category: z.string().max(50).optional(),
  baseImageUrl: z.string().url().optional()
});

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // Very limited - OG images should be cached

function checkRateLimit(fingerprint: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(fingerprint);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(fingerprint, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  record.count++;
  return true;
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(',')[0].trim() || "unknown";
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse and validate input
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const validation = requestSchema.safeParse(body);
    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: "Invalid request parameters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { carName, city, price, category, baseImageUrl } = validation.data;


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
      // Log sanitized error for debugging (no sensitive details exposed)
      console.error(`AI Gateway error: status=${response.status}`);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Image generation service unavailable." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
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
      // Sanitize inputs to prevent path traversal attacks
      const sanitizedCarName = carName.replace(/[^a-z0-9-]/gi, '-').toLowerCase().slice(0, 50);
      const sanitizedCity = city.replace(/[^a-z0-9-]/gi, '-').toLowerCase().slice(0, 30);
      const fileName = `og-${sanitizedCarName}-${sanitizedCity}.png`;
      // Ensure file path stays within bucket (no directory traversal)
      const filePath = fileName.replace(/\.\./g, '').replace(/\/+/g, '');

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
    // Log sanitized error for debugging (no sensitive details in response)
    console.error(`OG image generation error: ${error instanceof Error ? error.name : 'Unknown'}`);
    return new Response(
      JSON.stringify({ error: "An error occurred while generating the image." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
