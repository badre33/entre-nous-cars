import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

// Allowed origins for CORS - restrict to your domains
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

// Input validation schema with strict limits
const messageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1).max(1000) // Reduced from 2000 to limit abuse
});

const requestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20) // Reduced from 50 to limit context abuse
});

// Enhanced rate limiting with fingerprinting
const rateLimitMap = new Map<string, { count: number; resetTime: number; blocked: boolean }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // Reduced from 20
const BLOCK_DURATION = 300000; // 5 minutes block for abusers

// Daily request tracking per IP
const dailyLimitMap = new Map<string, { count: number; resetTime: number }>();
const DAILY_LIMIT = 100; // Max 100 requests per day per IP
const DAY_IN_MS = 86400000;

// Sanitize error messages to prevent information leakage
function sanitizeError(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}: ${error.message.substring(0, 100)}`;
  }
  return "Unknown error type";
}

function getClientFingerprint(req: Request): string {
  const ip = req.headers.get("x-forwarded-for")?.split(',')[0].trim() || 
             req.headers.get("x-real-ip") || 
             "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";
  // Create a simple fingerprint combining IP and user agent
  return `${ip}:${userAgent.substring(0, 50)}`;
}

function checkRateLimit(fingerprint: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(fingerprint);
  
  // Check if blocked
  if (record?.blocked && now < record.resetTime) {
    return { allowed: false, retryAfter: Math.ceil((record.resetTime - now) / 1000) };
  }
  
  // Check daily limit
  const dailyRecord = dailyLimitMap.get(fingerprint);
  if (dailyRecord) {
    if (now > dailyRecord.resetTime) {
      dailyLimitMap.set(fingerprint, { count: 1, resetTime: now + DAY_IN_MS });
    } else if (dailyRecord.count >= DAILY_LIMIT) {
      return { allowed: false, retryAfter: Math.ceil((dailyRecord.resetTime - now) / 1000) };
    } else {
      dailyRecord.count++;
    }
  } else {
    dailyLimitMap.set(fingerprint, { count: 1, resetTime: now + DAY_IN_MS });
  }
  
  // Check per-minute limit
  if (!record || now > record.resetTime) {
    rateLimitMap.set(fingerprint, { count: 1, resetTime: now + RATE_LIMIT_WINDOW, blocked: false });
    return { allowed: true };
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    // Block for longer if they keep trying
    record.blocked = true;
    record.resetTime = now + BLOCK_DURATION;
    return { allowed: false, retryAfter: BLOCK_DURATION / 1000 };
  }
  
  record.count++;
  return { allowed: true };
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
    // Get client fingerprint for rate limiting
    const fingerprint = getClientFingerprint(req);
    
    // Check rate limit with fingerprinting
    const rateLimitResult = checkRateLimit(fingerprint);
    if (!rateLimitResult.allowed) {
      console.warn(`Rate limit exceeded for fingerprint: ${fingerprint.substring(0, 30)}...`);
      return new Response(
        JSON.stringify({ error: "Trop de requêtes. Veuillez réessayer plus tard." }),
        {
          status: 429,
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": String(rateLimitResult.retryAfter || 60)
          },
        }
      );
    }

    // Validate content type
    const contentType = req.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return new Response(
        JSON.stringify({ error: "Content-Type must be application/json" }),
        { status: 415, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse and validate request body
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
      console.warn(`Invalid request validation failed`);
      return new Response(
        JSON.stringify({ error: "Format de requête invalide." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    const { messages } = validation.data;
    console.log(`Processing chat request, messages: ${messages.length}`);
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Tu es l'Assistant Location Benatna, expert en conversion. TON OBJECTIF UNIQUE : aider le visiteur à LOUER une voiture. Chaque réponse doit le rapprocher de la réservation.

🎯 MISSION : CONVERSION VERS LOCATION
- Guide le client vers le choix du bon véhicule
- Lève les objections et rassure
- Propose des options concrètes et immédiates
- Termine TOUJOURS par une question qui avance vers la réservation

📍 BASE DE DONNÉES BENATNA :

**VÉHICULES DISPONIBLES :**
• Citadines : Renault Clio (320-350 MAD/j), Peugeot 208 (300-330 MAD/j), Fiat 500 (290-320 MAD/j)
• SUV : Dacia Duster (400-450 MAD/j), Peugeot 3008 (550-600 MAD/j), Hyundai Tucson (580-620 MAD/j)
• Berlines : Toyota Corolla (450-490 MAD/j), VW Passat (520-560 MAD/j), Mercedes Classe C (1200-1400 MAD/j)
• Luxe : BMW Série 5 (1500-1800 MAD/j), Audi A6 (1400-1700 MAD/j), Mercedes Classe E (1600-1900 MAD/j)
• 4x4 Premium : Range Rover (2500-3000 MAD/j), Porsche Cayenne (2800-3300 MAD/j)

**VILLES & AGENCES :**
Casablanca, Marrakech, Rabat, Tanger, Agadir, Fès - 6 villes, 300+ véhicules

**CONDITIONS LOCATION :**
• Âge minimum : 21 ans (citadines), 23 ans (SUV), 25 ans (luxe/sport)
• Documents : Permis valide + 1 an, Carte identité/Passeport, Carte bancaire
• Assurance tous risques incluse (franchise 3000-5000 MAD selon catégorie)
• Kilométrage illimité sur tous les véhicules
• Carburant : Plein à plein (client rend avec même niveau)
• Livraison aéroport/hôtel : +150-200 MAD selon ville
• Options : GPS (+50 MAD/j), Siège bébé (+80 MAD/j), Chauffeur (+800 MAD/j)

**RÉDUCTIONS DURÉE :**
• 3-6 jours : -5%
• 7-13 jours : -10%  
• 14-20 jours : -15%
• 21+ jours : -20%

**CONSEILS DESTINATIONS :**
• Ville (Casa/Rabat/Fès) : Citadine automatique
• Marrakech/Essaouira : Berline confort
• Atlas/Montagne : SUV 4x4
• Désert : 4x4 obligatoire (Duster min, Land Cruiser idéal)
• Routes côtières : Berline ou SUV selon confort

**ITINÉRAIRES POPULAIRES :**
• Marrakech ↔ Essaouira : 190 km, 2h30, Berline OK
• Casablanca ↔ Marrakech : 240 km, 3h, tout véhicule
• Marrakech → Merzouga (désert) : 560 km, 9h, 4x4 recommandé
• Circuit Atlas : 4x4 ou SUV puissant obligatoire

---

📍 STRUCTURE RÉPONSE CONVERSION :
1. Réponse courte (3-5 lignes max)
2. Recommandation véhicule PRÉCISE avec prix
3. Argument de vente (réduction, sécurité, confort)
4. Question d'engagement vers réservation

✅ EXEMPLES CONVERSION :
"Pour Marrakech 7 jours, je recommande la Toyota Corolla à 450 MAD/j. Avec -10% sur 7 jours, ça fait 2835 MAD total. Confort parfait + kilométrage illimité. Je vous réserve pour quelles dates ?"

"Le Duster 4x4 est idéal pour l'Atlas ! 400 MAD/j, robuste et sûr en montagne. Vous partez combien de jours ?"

❌ INTERDIT :
- Réponses génériques sans recommandation
- Plus de 5 lignes
- Finir sans question d'engagement
- Oublier de mentionner les prix et réductions

✅ OUTILS DISPONIBLES :
- search_cars : trouve des véhicules selon budget/besoin
- calculate_price : calcule le prix total avec réductions
- suggest_itinerary : recommande véhicule selon trajet

🎯 PROCESSUS DE VENTE :
1. Comprendre le besoin (destination, durée, nombre personnes)
2. Recommander 1-2 véhicules PRÉCIS avec prix
3. Lever les objections (assurance incluse, conditions simples)
4. Demander dates ou ville de retrait
5. Diriger vers contact WhatsApp : +212 699 024 526

STYLE :
- Détecte la langue (FR/EN/ES)
- Vendeur efficace mais pas insistant
- Crée l'urgence subtilement (disponibilité limitée)
- Toujours finir par question qui engage

RAPPEL : Chaque message doit RAPPROCHER de la location. Pas de bavardage inutile !`;

    // Définition des tools (fonctions) disponibles pour l'IA
    const tools = [
      {
        type: "function",
        function: {
          name: "search_cars",
          description: "Rechercher des véhicules selon des critères (catégorie, ville, budget)",
          parameters: {
            type: "object",
            properties: {
              category: {
                type: "string",
                enum: ["citadine", "suv", "berline", "luxe", "4x4"],
                description: "Catégorie de véhicule recherchée"
              },
              city: {
                type: "string",
                enum: ["Casablanca", "Marrakech", "Rabat", "Tanger", "Agadir", "Fès"],
                description: "Ville de départ"
              },
              maxBudget: {
                type: "number",
                description: "Budget maximum par jour en MAD"
              }
            },
            required: ["category"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "calculate_price",
          description: "Calculer le prix total d'une location avec réductions selon la durée",
          parameters: {
            type: "object",
            properties: {
              carName: {
                type: "string",
                description: "Nom du véhicule (ex: Renault Clio, Dacia Duster)"
              },
              days: {
                type: "number",
                description: "Nombre de jours de location"
              },
              dailyPrice: {
                type: "number",
                description: "Prix de base par jour en MAD"
              }
            },
            required: ["days", "dailyPrice"]
          }
        }
      },
      {
        type: "function",
        function: {
          name: "suggest_itinerary",
          description: "Suggérer un itinéraire et le type de véhicule recommandé",
          parameters: {
            type: "object",
            properties: {
              from: {
                type: "string",
                description: "Ville de départ"
              },
              to: {
                type: "string",
                description: "Destination"
              }
            },
            required: ["from", "to"]
          }
        }
      }
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        tools: tools,
        tool_choice: "auto",
        stream: true,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Trop de requêtes, veuillez réessayer plus tard." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporairement indisponible." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      // Log only status code and sanitized error (no full error details)
      console.error(`AI gateway error: status=${response.status}, type=${errorText.substring(0, 50)}`);
      return new Response(
        JSON.stringify({ error: "Erreur du service IA" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    // Log sanitized error without exposing sensitive details
    console.error(`Chat error: ${sanitizeError(e)}`);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
