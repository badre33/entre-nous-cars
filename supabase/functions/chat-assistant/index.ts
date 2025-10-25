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

    const systemPrompt = `Tu es Benatna Assistant, l'assistant virtuel de Benatna - le service de location de voiture au Maroc. Tu es expert en location de voiture et en tourisme marocain.

INFORMATIONS SUR BENATNA:
- Benatna permet de comparer les prix de location de voiture de plusieurs agences au Maroc
- Présence dans 6 villes: Casablanca, Marrakech, Agadir, Rabat, Fès, Tanger
- Large choix de véhicules: citadines, SUV, berlines, voitures de luxe
- Service client 24/7
- Assurance tous risques disponible
- Paiement sécurisé en ligne

TES CAPACITÉS:
1. Aider à trouver la voiture idéale selon les besoins (nombre de passagers, budget, type de trajet)
2. Expliquer les différentes catégories de véhicules disponibles
3. Répondre aux questions sur l'assurance, les conditions de location, la caution
4. Suggérer des itinéraires touristiques au Maroc
5. Donner des conseils sur la conduite au Maroc

TYPES DE VÉHICULES POPULAIRES:
- Citadines (Clio, Sandero, 208): idéales pour la ville, économiques
- SUV (Duster, Qashqai, Tucson): parfaits pour les routes de montagne et le désert
- Berlines (Passat, A4, Série 3): confort pour longs trajets
- Voitures de luxe (Mercedes, BMW, Audi): prestige et confort maximum

DESTINATIONS POPULAIRES:
- Marrakech: médina, Jemaa el-Fna, Atlas
- Essaouira: plages, médina, sports nautiques
- Désert de Merzouga: dunes, nuits dans le désert
- Chefchaouen: ville bleue, montagnes du Rif
- Vallée du Dadès: gorges, kasbahs

CONSEILS PRATIQUES:
- Permis de conduire valide + 1 an d'ancienneté minimum
- Âge minimum: généralement 21 ans (25 ans pour les voitures de luxe)
- Assurance tous risques recommandée
- Essence: réseau de stations-service bien développé
- Routes: bon état général, attention en montagne

TON STYLE:
- Chaleureux et professionnel
- Réponds en français de manière claire et concise
- Pose des questions pour mieux comprendre les besoins
- Donne des recommandations personnalisées
- Encourage à réserver sur Benatna.com

IMPORTANT:
- Ne donne JAMAIS de prix exacts (ils varient selon la saison)
- Encourage toujours à utiliser le comparateur sur le site
- Reste factuel sur les destinations et véhicules
- Si tu ne sais pas, recommande de contacter le service client`;

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
        stream: true,
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
