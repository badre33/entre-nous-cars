import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { BUSINESS_INFO, getFullAddress } from "@/constants/businessInfo";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="w-full border-t border-border bg-card mt-20">
      <div className="container py-12">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-pacifico text-xl mb-4">benatna</h3>
            <p className="text-sm text-muted-foreground">
              {t('footer.tagline')}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link to="/louer" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('common.rent')}
                </Link>
              </li>
              <li>
                <Link to="/location-voiture-can-2025-maroc" className="text-muted-foreground hover:text-foreground transition-colors font-semibold">
                  🏆 CAN 2025 Maroc
                </Link>
              </li>
              <li>
                <Link to="/partenaires" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('common.partners')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('common.about')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/a-propos" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('common.about')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('common.blog')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('common.contact')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/conditions-generales" className="text-muted-foreground hover:text-foreground transition-colors">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="text-muted-foreground hover:text-foreground transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('common.contact')}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{getFullAddress()}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-foreground transition-colors">
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-foreground transition-colors">
                  {BUSINESS_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Section Villes Principales - SEO Internal Linking */}
        <div className="pt-8 border-t border-border mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Location de Voiture par Ville</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/location-voiture-casablanca" className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full text-sm font-medium transition-colors">
              Casablanca
            </Link>
            <Link to="/location-voiture-marrakech" className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full text-sm font-medium transition-colors">
              Marrakech
            </Link>
            <Link to="/location-voiture-rabat" className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full text-sm font-medium transition-colors">
              Rabat
            </Link>
            <Link to="/location-voiture-agadir" className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full text-sm font-medium transition-colors">
              Agadir
            </Link>
            <Link to="/location-voiture-fes" className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full text-sm font-medium transition-colors">
              Fès
            </Link>
            <Link to="/location-voiture-tanger" className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-full text-sm font-medium transition-colors">
              Tanger
            </Link>
          </div>
        </div>

        {/* Section Nos Services - SEO */}
        <div className="pt-8 border-t border-border">
          <h3 className="text-lg font-semibold mb-6 text-center">Nos Services de Location</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* Locations Aéroports */}
            <div>
              <h4 className="font-semibold mb-3 text-sm text-primary">Locations Aéroports</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/location-voiture-aeroport-casablanca" className="text-muted-foreground hover:text-foreground transition-colors">
                    Aéroport Casablanca
                  </Link>
                </li>
                <li>
                  <Link to="/location-voiture-aeroport-marrakech" className="text-muted-foreground hover:text-foreground transition-colors">
                    Aéroport Marrakech
                  </Link>
                </li>
                <li>
                  <Link to="/location-voiture-aeroport-rabat" className="text-muted-foreground hover:text-foreground transition-colors">
                    Aéroport Rabat
                  </Link>
                </li>
                <li>
                  <Link to="/location-voiture-aeroport-agadir" className="text-muted-foreground hover:text-foreground transition-colors">
                    Aéroport Agadir
                  </Link>
                </li>
                <li>
                  <Link to="/location-voiture-aeroport-tanger" className="text-muted-foreground hover:text-foreground transition-colors">
                    Aéroport Tanger
                  </Link>
                </li>
              </ul>
            </div>

            {/* Jeune Conducteur */}
            <div>
              <h4 className="font-semibold mb-3 text-sm text-primary">Jeune Conducteur</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/location-jeune-conducteur-casablanca" className="text-muted-foreground hover:text-foreground transition-colors">
                    Casablanca -21 ans
                  </Link>
                </li>
                <li>
                  <Link to="/location-jeune-conducteur-marrakech" className="text-muted-foreground hover:text-foreground transition-colors">
                    Marrakech -21 ans
                  </Link>
                </li>
                <li>
                  <Link to="/location-jeune-conducteur-rabat" className="text-muted-foreground hover:text-foreground transition-colors">
                    Rabat -21 ans
                  </Link>
                </li>
              </ul>
            </div>

            {/* Longue Durée & Spécial */}
            <div>
              <h4 className="font-semibold mb-3 text-sm text-primary">Formules Longue Durée</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/location-longue-duree-casablanca" className="text-muted-foreground hover:text-foreground transition-colors">
                    Longue Durée Casa
                  </Link>
                </li>
                <li>
                  <Link to="/location-longue-duree-marrakech" className="text-muted-foreground hover:text-foreground transition-colors">
                    Longue Durée Marrakech
                  </Link>
                </li>
                <li>
                  <Link to="/location-weekend-marrakech" className="text-muted-foreground hover:text-foreground transition-colors">
                    Weekend Marrakech
                  </Link>
                </li>
                <li>
                  <Link to="/location-voiture-sans-carte-credit-marrakech" className="text-muted-foreground hover:text-foreground transition-colors">
                    Sans Carte Crédit
                  </Link>
                </li>
              </ul>
            </div>

            {/* SUV & Aventure */}
            <div>
              <h4 className="font-semibold mb-3 text-sm text-primary">SUV & Aventure</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/location-suv-atlas" className="text-muted-foreground hover:text-foreground transition-colors">
                    SUV Atlas Montagne
                  </Link>
                </li>
                <li>
                  <Link to="/location-4x4-desert" className="text-muted-foreground hover:text-foreground transition-colors">
                    4x4 Désert Merzouga
                  </Link>
                </li>
                <li>
                  <Link to="/location-suv-sud-maroc" className="text-muted-foreground hover:text-foreground transition-colors">
                    SUV Sud Marocain
                  </Link>
                </li>
              </ul>
            </div>

            {/* Véhicules Spéciaux */}
            <div>
              <h4 className="font-semibold mb-3 text-sm text-primary">Véhicules Spéciaux</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/location-voiture-mariage-maroc" className="text-muted-foreground hover:text-foreground transition-colors">
                    Voiture Mariage Luxe
                  </Link>
                </li>
                <li>
                  <Link to="/location-voiture-luxe-evenement" className="text-muted-foreground hover:text-foreground transition-colors">
                    Luxe Événement
                  </Link>
                </li>
                <li>
                  <Link to="/location-voiture-electrique-casablanca" className="text-muted-foreground hover:text-foreground transition-colors">
                    Voiture Électrique
                  </Link>
                </li>
                <li>
                  <Link to="/location-van-famille-maroc" className="text-muted-foreground hover:text-foreground transition-colors">
                    Van Familial 7-9 Places
                  </Link>
                </li>
                <li>
                  <Link to="/location-cabriolet-agadir" className="text-muted-foreground hover:text-foreground transition-colors">
                    Cabriolet Agadir
                  </Link>
                </li>
                <li>
                  <Link to="/location-utilitaire-demenagement-casablanca" className="text-muted-foreground hover:text-foreground transition-colors">
                    Utilitaire Déménagement
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2025 Benatna - {t('footer.tagline')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
