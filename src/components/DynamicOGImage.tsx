import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

// Dynamic import to keep Supabase out of critical path
const getSupabaseClient = async () => {
  const { supabase } = await import("@/integrations/supabase/client");
  return supabase;
};

interface DynamicOGImageProps {
  carName: string;
  city: string;
  price: string;
  category?: string;
  baseImageUrl?: string;
  pageUrl: string;
  pageTitle: string;
  pageDescription: string;
}

/**
 * Composant pour générer et injecter des images OG dynamiques
 * Génère une image Open Graph personnalisée pour chaque voiture
 */
export const DynamicOGImage = ({
  carName,
  city,
  price,
  category,
  baseImageUrl,
  pageUrl,
  pageTitle,
  pageDescription
}: DynamicOGImageProps) => {
  const [ogImageUrl, setOgImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateOGImage = async () => {
      try {
        setIsLoading(true);
        
        // Load Supabase client dynamically
        const supabase = await getSupabaseClient();

        // Vérifier d'abord si l'image existe déjà en cache
        const fileName = `og-${carName.replace(/\s+/g, "-").toLowerCase()}-${city.replace(/\s+/g, "-").toLowerCase()}.png`;
        const { data: existingFile } = await supabase.storage
          .from("og-images")
          .list("", { search: fileName });

        if (existingFile && existingFile.length > 0) {
          // Image existe déjà, utiliser le cache
          const { data: publicUrlData } = supabase.storage
            .from("og-images")
            .getPublicUrl(`og-images/${fileName}`);

          setOgImageUrl(publicUrlData.publicUrl);
          setIsLoading(false);
          return;
        }

        // Générer une nouvelle image
        const { data, error } = await supabase.functions.invoke("generate-og-image", {
          body: {
            carName,
            city,
            price,
            category,
            baseImageUrl
          }
        });

        if (error) {
          console.error("Error generating OG image:", error);
          setIsLoading(false);
          return;
        }

        if (data?.imageUrl) {
          setOgImageUrl(data.imageUrl);
        }
      } catch (error) {
        console.error("Failed to generate OG image:", error);
      } finally {
        setIsLoading(false);
      }
    };

    generateOGImage();
  }, [carName, city, price, category, baseImageUrl]);

  return (
    <Helmet>
      {/* Open Graph Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      
      {ogImageUrl && !isLoading && (
        <>
          <meta property="og:image" content={ogImageUrl} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={`${carName} à louer à ${city} - ${price}`} />
        </>
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {ogImageUrl && !isLoading && (
        <meta name="twitter:image" content={ogImageUrl} />
      )}

      {/* WhatsApp specific */}
      {ogImageUrl && !isLoading && (
        <meta property="og:image:secure_url" content={ogImageUrl} />
      )}
    </Helmet>
  );
};
