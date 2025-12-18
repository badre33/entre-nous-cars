import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, ExternalLink, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BUSINESS_INFO } from "@/constants/businessInfo";

interface SitemapUrl {
  path: string;
  priority: number;
  changefreq: string;
  category: string;
}

// All site URLs extracted from App.tsx routes
const allUrls: SitemapUrl[] = [
  // Pages principales
  { path: "/", priority: 1.0, changefreq: "daily", category: "Principal" },
  { path: "/louer", priority: 0.9, changefreq: "daily", category: "Principal" },
  { path: "/nos-services", priority: 0.8, changefreq: "weekly", category: "Principal" },
  { path: "/partenaires", priority: 0.8, changefreq: "weekly", category: "Principal" },
  { path: "/a-propos", priority: 0.7, changefreq: "monthly", category: "Principal" },
  { path: "/blog", priority: 0.8, changefreq: "weekly", category: "Principal" },
  { path: "/contact", priority: 0.6, changefreq: "monthly", category: "Principal" },
  { path: "/faq", priority: 0.7, changefreq: "monthly", category: "Principal" },
  { path: "/glossaire", priority: 0.7, changefreq: "monthly", category: "Principal" },
  { path: "/comparatifs", priority: 0.7, changefreq: "weekly", category: "Principal" },
  { path: "/conditions-generales", priority: 0.4, changefreq: "monthly", category: "Légal" },
  
  // Villes principales
  { path: "/location-voiture-casablanca", priority: 0.9, changefreq: "weekly", category: "Ville" },
  { path: "/location-voiture-marrakech", priority: 0.9, changefreq: "weekly", category: "Ville" },
  { path: "/location-voiture-rabat", priority: 0.8, changefreq: "weekly", category: "Ville" },
  { path: "/location-voiture-tanger", priority: 0.8, changefreq: "weekly", category: "Ville" },
  { path: "/location-voiture-agadir", priority: 0.8, changefreq: "weekly", category: "Ville" },
  { path: "/location-voiture-fes", priority: 0.8, changefreq: "weekly", category: "Ville" },
  
  // Aéroports
  { path: "/location-voiture-aeroport-casablanca", priority: 0.85, changefreq: "weekly", category: "Aéroport" },
  { path: "/location-voiture-aeroport-marrakech", priority: 0.85, changefreq: "weekly", category: "Aéroport" },
  { path: "/location-voiture-aeroport-agadir", priority: 0.85, changefreq: "weekly", category: "Aéroport" },
  { path: "/location-voiture-aeroport-tanger", priority: 0.85, changefreq: "weekly", category: "Aéroport" },
  { path: "/location-voiture-aeroport-fes", priority: 0.85, changefreq: "weekly", category: "Aéroport" },
  { path: "/location-voiture-aeroport-rabat", priority: 0.85, changefreq: "weekly", category: "Aéroport" },
  
  // Thématiques
  { path: "/location-voiture-sans-carte-credit-marrakech", priority: 0.8, changefreq: "weekly", category: "Thématique" },
  { path: "/location-voiture-sans-carte-credit-casablanca", priority: 0.8, changefreq: "weekly", category: "Thématique" },
  { path: "/location-voiture-mariage-maroc", priority: 0.75, changefreq: "monthly", category: "Thématique" },
  { path: "/location-longue-duree-casablanca", priority: 0.8, changefreq: "weekly", category: "Thématique" },
  { path: "/location-longue-duree-marrakech", priority: 0.8, changefreq: "weekly", category: "Thématique" },
  { path: "/location-jeune-conducteur-casablanca", priority: 0.8, changefreq: "weekly", category: "Thématique" },
  { path: "/location-jeune-conducteur-marrakech", priority: 0.8, changefreq: "weekly", category: "Thématique" },
  { path: "/location-jeune-conducteur-rabat", priority: 0.8, changefreq: "weekly", category: "Thématique" },
  { path: "/location-suv-atlas", priority: 0.75, changefreq: "monthly", category: "Thématique" },
  { path: "/location-4x4-desert", priority: 0.75, changefreq: "monthly", category: "Thématique" },
  { path: "/location-suv-sud-maroc", priority: 0.75, changefreq: "monthly", category: "Thématique" },
  { path: "/location-voiture-luxe-evenement", priority: 0.75, changefreq: "monthly", category: "Thématique" },
  { path: "/location-weekend-marrakech", priority: 0.75, changefreq: "weekly", category: "Thématique" },
  { path: "/location-voiture-electrique-casablanca", priority: 0.75, changefreq: "weekly", category: "Thématique" },
  { path: "/location-van-famille-maroc", priority: 0.75, changefreq: "monthly", category: "Thématique" },
  { path: "/location-cabriolet-agadir", priority: 0.75, changefreq: "monthly", category: "Thématique" },
  { path: "/location-utilitaire-demenagement-casablanca", priority: 0.75, changefreq: "monthly", category: "Thématique" },
  
  // CAN 2025
  { path: "/location-voiture-can-2025-maroc", priority: 1.0, changefreq: "daily", category: "CAN 2025" },
  { path: "/location-voiture-can-2025-casablanca", priority: 0.95, changefreq: "daily", category: "CAN 2025" },
  { path: "/location-voiture-can-2025-rabat", priority: 0.95, changefreq: "daily", category: "CAN 2025" },
  { path: "/location-voiture-can-2025-marrakech", priority: 0.95, changefreq: "daily", category: "CAN 2025" },
  { path: "/location-voiture-can-2025-agadir", priority: 0.95, changefreq: "daily", category: "CAN 2025" },
  { path: "/location-voiture-can-2025-fes", priority: 0.95, changefreq: "daily", category: "CAN 2025" },
  { path: "/location-voiture-can-2025-tanger", priority: 0.95, changefreq: "daily", category: "CAN 2025" },
  
  // Quartiers Casablanca
  { path: "/location-voiture-ain-diab-casablanca", priority: 0.85, changefreq: "weekly", category: "Quartier Casa" },
  { path: "/location-voiture-maarif-casablanca", priority: 0.85, changefreq: "weekly", category: "Quartier Casa" },
  { path: "/location-voiture-anfa-casablanca", priority: 0.85, changefreq: "weekly", category: "Quartier Casa" },
  { path: "/location-voiture-sidi-maarouf-casablanca", priority: 0.85, changefreq: "weekly", category: "Quartier Casa" },
  { path: "/location-voiture-hassan-casablanca", priority: 0.85, changefreq: "weekly", category: "Quartier Casa" },
  
  // Quartiers Marrakech
  { path: "/location-voiture-gueliz-marrakech", priority: 0.85, changefreq: "weekly", category: "Quartier Marrakech" },
  { path: "/location-voiture-hivernage-marrakech", priority: 0.85, changefreq: "weekly", category: "Quartier Marrakech" },
  { path: "/location-voiture-medina-marrakech", priority: 0.85, changefreq: "weekly", category: "Quartier Marrakech" },
  { path: "/location-voiture-palmeraie-marrakech", priority: 0.85, changefreq: "weekly", category: "Quartier Marrakech" },
  { path: "/location-voiture-route-ourika-marrakech", priority: 0.85, changefreq: "weekly", category: "Quartier Marrakech" },
  
  // Blog articles
  { path: "/blog/pourquoi-benatna", priority: 0.8, changefreq: "monthly", category: "Blog" },
  { path: "/blog/louer-voiture-marrakech", priority: 0.8, changefreq: "monthly", category: "Blog" },
  { path: "/blog/guide-conduire-maroc", priority: 0.8, changefreq: "monthly", category: "Blog" },
  { path: "/blog/assurance-location-voiture", priority: 0.8, changefreq: "monthly", category: "Blog" },
  { path: "/blog/road-trip-maroc", priority: 0.8, changefreq: "monthly", category: "Blog" },
  { path: "/blog/choisir-voiture-location", priority: 0.8, changefreq: "monthly", category: "Blog" },
  { path: "/blog/meilleure-saison-maroc", priority: 0.8, changefreq: "monthly", category: "Blog" },
];

const categoryColors: Record<string, string> = {
  "Principal": "bg-primary text-primary-foreground",
  "Ville": "bg-blue-500 text-white",
  "Aéroport": "bg-purple-500 text-white",
  "Thématique": "bg-orange-500 text-white",
  "CAN 2025": "bg-green-500 text-white",
  "Quartier Casa": "bg-cyan-500 text-white",
  "Quartier Marrakech": "bg-pink-500 text-white",
  "Blog": "bg-amber-500 text-white",
  "Légal": "bg-gray-500 text-white",
};

const SitemapAudit = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => 
    [...new Set(allUrls.map(url => url.category))],
    []
  );

  const filteredUrls = useMemo(() => {
    return allUrls.filter(url => {
      const matchesSearch = url.path.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || url.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const stats = useMemo(() => ({
    total: allUrls.length,
    highPriority: allUrls.filter(u => u.priority >= 0.8).length,
    daily: allUrls.filter(u => u.changefreq === "daily").length,
    weekly: allUrls.filter(u => u.changefreq === "weekly").length,
  }), []);

  return (
    <>
      <Helmet>
        <title>Sitemap Audit SEO | Benatna</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Audit SEO - Sitemap
            </h1>
            <p className="text-muted-foreground">
              Vue d'ensemble de toutes les URLs du site avec leur statut canonical
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">URLs totales</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-500">{stats.highPriority}</div>
              <div className="text-sm text-muted-foreground">Priorité ≥ 0.8</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-500">{stats.daily}</div>
              <div className="text-sm text-muted-foreground">MAJ Daily</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-orange-500">{stats.weekly}</div>
              <div className="text-sm text-muted-foreground">MAJ Weekly</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une URL..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                Tous ({allUrls.length})
              </Badge>
              {categories.map(cat => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                >
                  {cat} ({allUrls.filter(u => u.category === cat).length})
                </Badge>
              ))}
            </div>
          </div>

          {/* URL List */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-sm">URL</th>
                    <th className="text-left p-4 font-medium text-sm">Catégorie</th>
                    <th className="text-center p-4 font-medium text-sm">Priorité</th>
                    <th className="text-center p-4 font-medium text-sm">Fréquence</th>
                    <th className="text-center p-4 font-medium text-sm">Canonical</th>
                    <th className="text-center p-4 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUrls.map((url) => (
                    <tr key={url.path} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                          {url.path}
                        </code>
                      </td>
                      <td className="p-4">
                        <Badge className={categoryColors[url.category] || "bg-gray-500"}>
                          {url.category}
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`font-medium ${
                          url.priority >= 0.9 ? "text-green-500" :
                          url.priority >= 0.7 ? "text-blue-500" :
                          "text-muted-foreground"
                        }`}>
                          {url.priority}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <Badge variant="outline" className="text-xs">
                          {url.changefreq}
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="p-4 text-center">
                        <a
                          href={`${BUSINESS_INFO.website}${url.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Ouvrir
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer info */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Cette page est en <code className="bg-muted px-1 rounded">noindex</code> - 
              Usage interne uniquement
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default SitemapAudit;
