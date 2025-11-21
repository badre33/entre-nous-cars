import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseOGImagePreloadProps {
  carName: string;
  city: string;
  price: string;
  category?: string;
}

/**
 * Hook pour précharger les images OG en arrière-plan
 * Permet de générer les images avant le partage pour une meilleure UX
 */
export const useOGImagePreload = ({
  carName,
  city,
  price,
  category
}: UseOGImagePreloadProps) => {
  useEffect(() => {
    const preloadOGImage = async () => {
      try {
        // Vérifier si l'image existe déjà
        const fileName = `og-${carName.replace(/\s+/g, "-").toLowerCase()}-${city.replace(/\s+/g, "-").toLowerCase()}.png`;
        const { data: existingFile } = await supabase.storage
          .from("og-images")
          .list("", { search: fileName });

        // Si l'image existe déjà, pas besoin de la régénérer
        if (existingFile && existingFile.length > 0) {
          return;
        }

        // Générer l'image en arrière-plan (sans attendre)
        supabase.functions.invoke("generate-og-image", {
          body: { carName, city, price, category }
        }).then(({ error }) => {
          if (error) {
            console.error("Background OG image generation failed:", error);
          }
        });
      } catch (error) {
        console.error("Failed to preload OG image:", error);
      }
    };

    // Démarrer le préchargement après un court délai
    const timeoutId = setTimeout(preloadOGImage, 2000);

    return () => clearTimeout(timeoutId);
  }, [carName, city, price, category]);
};
