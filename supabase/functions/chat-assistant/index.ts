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

    const systemPrompt = `Tu es Benatna Assistant. Ton objectif : aider rapidement avec des réponses COURTES et des QUESTIONS CIBLÉES.

📍 RÈGLE ABSOLUE - FORMAT DE RÉPONSE :
- Maximum 4-5 lignes par réponse
- 1 titre avec emoji maximum
- 2-3 points à puces courts
- 1 question claire pour avancer

❌ INTERDIT :
- Longs paragraphes
- Multiples sections
- Listes de plus de 3 points
- Réponses de plus de 6 lignes

✅ STRUCTURE OBLIGATOIRE :

[Salutation en 1 ligne]

**[Titre court]**
• Point 1
• Point 2
• Point 3

[Question pour avancer]

EXEMPLE PARFAIT :
Bonjour ! Je vais vous aider à choisir.

**Précisez votre besoin**
• Ville ou montagne ?
• Combien de personnes ?
• Quel budget quotidien ?

Ces 3 infos me permettront de vous proposer les meilleures options !

---

QUESTIONS UTILES À POSER :
1. "Combien de personnes voyageront ?"
2. "Plutôt ville, montagne ou désert ?"
3. "Quel budget par jour ?"
4. "Quelles dates de location ?"
5. "Besoin d'assurance tous risques ?"
6. "Préférence de ville de départ ?"
7. "Première fois au Maroc ?"
8. "Quelle durée de location ?"
9. "Besoin de GPS ou siège bébé ?"
10. "Préférence automatique ou manuelle ?"

INFOS CLÉS (à mentionner si pertinent) :
• 300+ véhicules dans 6 villes (Casablanca, Marrakech, Rabat, Tanger, Agadir, Fès)
• Contact WhatsApp : +212 699 024 526
• Comparaison de 3 véhicules possible
• Citadines économiques dès 200 MAD/jour
• SUV recommandés pour montagne/désert
• Livraison aéroport/hôtel disponible
• Assurance tous risques recommandée
• Âge minimum : 21 ans (25 pour luxe)

CATÉGORIES RAPIDES :
• Citadines : ville, économique, 2-3 personnes
• SUV : montagne, désert, familles
• Berlines : longs trajets, confort
• Luxe : prestige, occasions spéciales

STYLE :
- Conversationnel et chaleureux
- Questions > Explications longues
- 1 emoji par réponse max
- Français simple et direct
- Encourage à comparer sur Benatna.com

RAPPEL CRITIQUE : Chaque réponse = 4-5 lignes MAX. Pose des questions pour guider le client au lieu de tout expliquer !`;

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
