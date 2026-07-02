import { useState, useEffect } from "react";
import RentalRequestForm from "@/components/RentalRequestForm";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ChevronRight, Check, X, Users, DoorOpen, Briefcase, Fuel, Gauge, Zap, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getVehicleDetail } from "@/data/vehicleDetails";
import { analytics } from "@/utils/analytics";
import { currentDailyPrice } from "@/utils/priceCalculations";
import { currentContextBadge } from "@/lib/pricing";

const VehicleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const vehicle = slug ? getVehicleDetail(slug) : undefined;

  // Scroll to top + GTM vehicle_view event
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (vehicle) {
      // Push to dataLayer for GTM
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'vehicle_view',
          vehicle_slug: vehicle.slug,
          vehicle_name: vehicle.name,
          price: vehicle.priceFrom,
          category: vehicle.category,
        });
      }
      // Also track via analytics
      analytics.trackVehicleView(vehicle.slug, vehicle.name).catch(() => {});
    }
  }, [slug, vehicle]);

  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [rentalFormOpen, setRentalFormOpen] = useState(false);

  if (!vehicle) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Véhicule introuvable</h1>
        <Link to="/louer">
          <Button>Voir tous les véhicules</Button>
        </Link>
      </div>
    );
  }

  const nextPhoto = () => setCurrentPhoto((p) => (p + 1) % vehicle.photos.length);
  const prevPhoto = () => setCurrentPhoto((p) => (p - 1 + vehicle.photos.length) % vehicle.photos.length);

  const whatsappMessage = encodeURIComponent(
    `Bonjour, je souhaite louer le ${vehicle.name} (${vehicle.priceDisplay}). Pouvez-vous me confirmer la disponibilité ?`
  );
  const whatsappLink = `https://wa.me/212699024526?text=${whatsappMessage}`;

  const FeatureRow = ({ label, value }: { label: string; value: boolean | string | undefined }) => {
    if (value === undefined) return null;
    return (
      <div className="flex items-center justify-between py-2 border-b border-border/40">
        <span className="text-sm text-muted-foreground">{label}</span>
        {typeof value === "boolean" ? (
          value ? <Check className="h-5 w-5 text-green-600" /> : <X className="h-5 w-5 text-muted-foreground/40" />
        ) : (
          <span className="text-sm font-medium">{value}</span>
        )}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>{vehicle.name} - Location {vehicle.priceDisplay} | Benatna</title>
        <meta name="description" content={vehicle.description.substring(0, 155)} />
        <link rel="canonical" href={`https://benatna.ma/vehicule/${vehicle.slug}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary">Accueil</Link>
          <span className="mx-2 text-muted-foreground/40">/</span>
          <Link to="/louer" className="text-muted-foreground hover:text-primary">Nos véhicules</Link>
          <span className="mx-2 text-muted-foreground/40">/</span>
          <span className="text-foreground font-medium">{vehicle.name}</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* LEFT — Photos + tabs (2/3) */}
          <div className="md:col-span-2">
            {/* Carousel principal */}
            <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/3] mb-3">
              <img
                src={vehicle.photos[currentPhoto]}
                alt={`${vehicle.name} - photo ${currentPhoto + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
                loading="lazy"
              />
              {vehicle.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 hover:bg-background shadow-md flex items-center justify-center transition"
                    aria-label="Photo précédente"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 hover:bg-background shadow-md flex items-center justify-center transition"
                    aria-label="Photo suivante"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/90 text-xs font-medium">
                    {currentPhoto + 1} / {vehicle.photos.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {vehicle.photos.length > 1 && (
              <div className="flex gap-2 mb-6 overflow-x-auto">
                {vehicle.photos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPhoto(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      currentPhoto === idx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={photo} alt={`Miniature ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Tabs Présentation / Équipements / Conditions */}
            <Tabs defaultValue="presentation" className="w-full">
              <TabsList className="grid grid-cols-3 w-full bg-muted">
                <TabsTrigger value="presentation" className="text-foreground/80 data-[state=active]:text-foreground data-[state=active]:bg-background data-[state=active]:shadow-sm font-medium">Présentation</TabsTrigger>
                <TabsTrigger value="equipements" className="text-foreground/80 data-[state=active]:text-foreground data-[state=active]:bg-background data-[state=active]:shadow-sm font-medium">Équipements</TabsTrigger>
                <TabsTrigger value="conditions" className="text-foreground/80 data-[state=active]:text-foreground data-[state=active]:bg-background data-[state=active]:shadow-sm font-medium">Conditions</TabsTrigger>
              </TabsList>

              <TabsContent value="presentation" className="space-y-4 mt-4">
                <p className="text-muted-foreground leading-relaxed">{vehicle.description}</p>

                <div>
                  <h3 className="font-semibold mb-2">Points forts</h3>
                  <ul className="space-y-1">
                    {vehicle.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Parfait pour</h3>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.perfectFor.map((p, i) => (
                      <Badge key={i} variant="secondary">{p}</Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="equipements" className="space-y-4 mt-4">
                <div>
                  <h3 className="font-semibold mb-3">Caractéristiques techniques</h3>
                  <FeatureRow label="Transmission" value={vehicle.options.transmission} />
                  <FeatureRow label="Places" value={`${vehicle.options.seats}`} />
                  <FeatureRow label="Portes" value={`${vehicle.options.doors}`} />
                  <FeatureRow label="Coffre" value={vehicle.options.luggage} />
                  <FeatureRow label="Carburant" value={vehicle.options.fuel} />
                  {vehicle.options.consumption && <FeatureRow label="Consommation" value={vehicle.options.consumption} />}
                  {vehicle.options.enginePower && <FeatureRow label="Puissance moteur" value={vehicle.options.enginePower} />}
                  {vehicle.options.acceleration && <FeatureRow label="Accélération" value={vehicle.options.acceleration} />}
                </div>

                <div>
                  <h3 className="font-semibold mb-3 mt-6">Confort</h3>
                  <FeatureRow label="Climatisation" value={vehicle.options.airConditioning} />
                  <FeatureRow label="Bluetooth" value={vehicle.options.bluetooth} />
                  <FeatureRow label="GPS intégré" value={vehicle.options.gps} />
                  <FeatureRow label="Régulateur de vitesse" value={vehicle.options.cruiseControl} />
                  <FeatureRow label="Capteurs de stationnement" value={vehicle.options.parkingSensors} />
                  <FeatureRow label="Caméra de recul" value={vehicle.options.rearCamera} />
                  <FeatureRow label="Toit ouvrant" value={vehicle.options.sunroof} />
                  <FeatureRow label="Sièges cuir" value={vehicle.options.leatherSeats} />
                  <FeatureRow label="Démarrage sans clé" value={vehicle.options.keyless} />
                </div>

                <div>
                  <h3 className="font-semibold mb-3 mt-6">Connectivité</h3>
                  <FeatureRow label="Android Auto" value={vehicle.options.androidAuto} />
                  <FeatureRow label="Apple CarPlay" value={vehicle.options.appleCarPlay} />
                  <FeatureRow label="Fixation ISOFIX" value={vehicle.options.isofix} />
                </div>

                <div>
                  <h3 className="font-semibold mb-3 mt-6">Sécurité</h3>
                  <FeatureRow label="Freinage d'urgence automatique" value={vehicle.options.automaticEmergencyBraking} />
                  <FeatureRow label="Assistance maintien de voie" value={vehicle.options.laneAssist} />
                  <FeatureRow label="Surveillance angle mort" value={vehicle.options.blindSpotMonitoring} />
                </div>
              </TabsContent>

              <TabsContent value="conditions" className="space-y-3 mt-4 text-sm">
                <p><strong>Âge minimum :</strong> 21 ans (citadine), 23 ans (SUV), 25 ans (premium)</p>
                <p><strong>Permis :</strong> 1 an d'ancienneté minimum (3 ans pour catégorie premium)</p>
                <p><strong>Kilométrage :</strong> Illimité inclus</p>
                <p><strong>Assurance :</strong> Tous risques incluse (franchise 3 000-8 000 DH selon catégorie)</p>
                <p><strong>Caution :</strong> Espèces, virement SEPA, Cash Plus ou Wafacash acceptés. CB internationale NON obligatoire.</p>
                <p><strong>Livraison :</strong> Gratuite aux aéroports CMN, RAK, RBA, TNG, AGA, FEZ + gares ONCF Casa-Voyageurs, Marrakech, Rabat-Agdal, Tanger Ville</p>
                <p><strong>Restitution :</strong> Même point que retrait, ou one-way avec supplément modeste</p>
                <p><strong>Annulation :</strong> Gratuite jusqu'à 48h avant</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* RIGHT — Sidebar prix + CTA */}
          <div className="md:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-5 space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">{vehicle.category}</Badge>
                  <h1 className="text-2xl font-bold">{vehicle.name}</h1>
                  <p className="text-sm text-muted-foreground">{vehicle.brand}</p>
                </div>

                <div className="py-3 border-y border-border">
                  <p className="text-xs text-muted-foreground mb-1">À partir de</p>
                  <p className="text-3xl font-bold text-primary">{currentDailyPrice(parseInt(String(vehicle.priceFrom).replace(/[^\d]/g, '')) || vehicle.priceFrom)} <span className="text-base font-medium text-muted-foreground">DH/jour</span></p>
                  {currentContextBadge() && (
                    <p className="text-xs text-secondary font-medium mt-1">{currentContextBadge()}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">✨ Le prix annoncé est le prix payé. Rabais -15% dès 7 jours, -38% dès 30 jours.</p>
                </div>

                {/* Quick specs */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="flex flex-col items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{vehicle.options.seats} places</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>Coffre</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Fuel className="h-4 w-4 text-muted-foreground" />
                    <span>{vehicle.options.fuel.split(" ")[0]}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="space-y-2">
                  <Button onClick={() => setRentalFormOpen(true)} className="w-full bg-green-600 hover:bg-green-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Demander un devis
                  </Button>
                  <a href="tel:+212699024526">
                    <Button variant="outline" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Appeler
                    </Button>
                  </a>
                </div>

                <div className="pt-3 border-t border-border space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                    <span>Sans carte de crédit internationale</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                    <span>Livraison aéroport gratuite</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                    <span>Annulation gratuite 48h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                    <span>Assurance tous risques incluse</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <RentalRequestForm
        open={rentalFormOpen}
        onOpenChange={setRentalFormOpen}
        vehicleName={vehicle.name}
        vehicleSlug={vehicle.slug}
      />
    </>
  );
};

export default VehicleDetail;
