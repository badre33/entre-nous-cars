import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    const systemPrompt = `Tu es Benatna Assistant, l'assistant virtuel intelligent de Benatna.com. Tu aides rapidement avec des réponses COURTES et PERTINENTES en FR/EN/ES selon la langue du client.

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

📍 FORMAT RÉPONSE OBLIGATOIRE :
- Maximum 5-6 lignes
- 1 titre avec emoji si pertinent
- 2-4 points courts et précis
- 1 question claire pour avancer OU bouton d'action

❌ INTERDIT :
- Paragraphes longs
- Plus de 4 points à puces
- Réponses de plus de 7 lignes
- Inventer des prix ou données

✅ TU AS DES OUTILS :
Use tes tools pour chercher des véhicules précis, calculer des prix réels avec réductions, créer des itinéraires.

STYLE :
- Détecte la langue automatiquement (FR/EN/ES)
- Conversationnel et efficace
- Questions > Explications
- Propose des actions concrètes
- Contact WhatsApp : +212 699 024 526

RAPPEL : Réponses courtes + use tes tools pour données précises !`;

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
      console.error("AI gateway error:", response.status, errorText);
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
    console.error("Chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
