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

// Valid Moroccan cities for OG images
const VALID_CITIES = [
  "casablanca", "marrakech", "rabat", "agadir", "tanger", "fes", "fès",
  "meknes", "meknès", "oujda", "kenitra", "tétouan", "tetouan", "nador",
  "safi", "mohammedia", "el jadida", "beni mellal", "khouribga", "taza"
];

// Valid vehicle categories
const VALID_CATEGORIES = ["citadine", "suv", "berline", "luxe", "4x4", "utilitaire", "van", "électrique"];

// Input validation schema with strict character whitelisting
const requestSchema = z.object({
  carName: z.string()
    .min(1, "Car name required")
    .max(100, "Car name too long")
    .regex(/^[a-zA-Z0-9àâäéèêëïîôùûüçÀÂÄÉÈÊËÏÎÔÙÛÜÇ\s\-\.]+$/, "Invalid characters in car name"),
  city: z.string()
    .min(1, "City required")
    .max(50, "City name too long")
    .regex(/^[a-zA-ZàâäéèêëïîôùûüçÀÂÄÉÈÊËÏÎÔÙÛÜÇ\s\-]+$/, "Invalid characters in city name"),
  price: z.string()
    .min(1, "Price required")
    .max(50, "Price too long")
    .regex(/^[\d\s\-MADmadjour\/]+$/, "Invalid price format"),
  category: z.string()
    .max(50)
    .regex(/^[a-zA-ZàâäéèêëïîôùûüçÀÂÄÉÈÊËÏÎÔÙÛÜÇ\s\-]*$/, "Invalid category")
    .optional(),
  baseImageUrl: z.string().url("Invalid URL format").optional()
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

// Generate content-based hash for unpredictable filenames
async function generateHash(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input + Date.now().toString());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("").substring(0, 16);
}

// Sanitize input for prompt injection prevention
function sanitizeForPrompt(input: string, maxLength: number): string {
  return input
    .replace(/[^a-zA-Z0-9àâäéèêëïîôùûüçÀÂÄÉÈÊËÏÎÔÙÛÜÇ\s\-\.\/]/g, "")
    .substring(0, maxLength)
    .trim();
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
        JSON.stringify({ error: "Invalid request format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const validation = requestSchema.safeParse(body);
    if (!validation.success) {
      console.log("[OG Image] Validation failed");
      return new Response(
        JSON.stringify({ error: "Invalid request parameters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { carName, city, price, category, baseImageUrl } = validation.data;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("[OG Image] Missing API configuration");
      return new Response(
        JSON.stringify({ error: "Service configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize inputs for prompt injection prevention
    const sanitizedCarName = sanitizeForPrompt(carName, 100);
    const sanitizedCity = sanitizeForPrompt(city, 50);
    const sanitizedPrice = sanitizeForPrompt(price, 50);
    const sanitizedCategory = category ? sanitizeForPrompt(category, 30) : "modern vehicle";

    console.log("[OG Image] Generating image");

    // Create detailed prompt for professional OG image
    const prompt = `Create a professional social media share image (1200x630px) for a car rental service.

Layout:
- Background: Modern gradient (dark blue to teal) with subtle geometric patterns
- Left side: Show a ${sanitizedCarName} car (${sanitizedCategory}) in a professional studio lighting
- Right side: Information overlay with:
  * Car name: "${sanitizedCarName}" in large, bold, white text
  * Location: "${sanitizedCity}" with a pin icon in smaller text
  * Price: "${sanitizedPrice}" in prominent orange/yellow text with "par jour" below
  * Small logo placeholder in top right corner
  
Style: Professional, modern, clean design with high contrast text for readability on social media. Make it eye-catching and premium-looking.`;

    // Call Lovable AI to generate image
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
      // Log sanitized error server-side only (no details to client)
      console.error(`[OG Image] Gateway error: status=${response.status}`);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        // Don't expose payment details - return generic service error
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Generic error for all other cases - no internal details to client
      return new Response(
        JSON.stringify({ error: "Failed to generate image. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log("[OG Image] AI response received");

    // Extract generated image
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      console.error("[OG Image] No image in response");
      return new Response(
        JSON.stringify({ error: "Failed to generate image. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Save image to Supabase Storage for caching
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Convert base64 to blob for upload
    if (imageUrl.startsWith("data:image")) {
      const base64Data = imageUrl.split(",")[1];
      const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
      
      // Use content-based hash for unpredictable filenames (security improvement)
      const contentHash = await generateHash(`${carName}-${city}-${price}`);
      const fileName = `og-${contentHash}.png`;
      const filePath = `og-images/${fileName}`;

      // Check if bucket exists, create if needed
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(b => b.name === "og-images");

      if (!bucketExists) {
        await supabase.storage.createBucket("og-images", {
          public: true,
          fileSizeLimit: 5242880, // 5MB
          allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"]
        });
      }

      // Upload image with cache control
      const { error: uploadError } = await supabase.storage
        .from("og-images")
        .upload(filePath, imageBuffer, {
          contentType: "image/png",
          cacheControl: "3600", // 1 hour browser cache
          upsert: true,
        });

      if (uploadError) {
        console.error("[OG Image] Upload failed");
      } else {
        console.log("[OG Image] Cached successfully");
        
        // Return public URL
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

    // If no cache, return base64 image directly
    return new Response(
      JSON.stringify({ imageUrl, cached: false }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    // Log sanitized error without exposing sensitive details
    console.error(`[OG Image] Error: ${error instanceof Error ? error.name : "Unknown"}`);
    return new Response(
      JSON.stringify({ error: "Failed to generate image. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
