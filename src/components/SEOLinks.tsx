import { Link } from "react-router-dom";

export const SEOLinks = () => {
  const internalLinks = [
    { to: "/louer", text: "Louer une voiture", keywords: "location voiture maroc casablanca" },
    { to: "/partenaires", text: "Devenir partenaire", keywords: "agence location voiture partenariat" },
    { to: "/blog", text: "Blog & Conseils", keywords: "guide location voiture maroc tourisme" },
    { to: "/contact", text: "Contact", keywords: "contacter benatna support client" }
  ];

  const externalResourceLinks = [
    { href: "https://www.visitmorocco.com/", text: "Office National Marocain du Tourisme", rel: "external nofollow" },
    { href: "https://www.gov.ma/", text: "Portail National du Maroc", rel: "external nofollow" }
  ];

  return (
    <section className="py-12 bg-secondary/10">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Internal Links for SEO */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Navigation Rapide</h3>
            <nav className="space-y-2">
              {internalLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to}
                  className="block text-muted-foreground hover:text-primary transition-colors py-1"
                  aria-label={`${link.text} - ${link.keywords}`}
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* External Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Ressources Utiles</h3>
            <nav className="space-y-2">
              {externalResourceLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href}
                  rel={link.rel}
                  target="_blank"
                  className="block text-muted-foreground hover:text-primary transition-colors py-1"
                >
                  {link.text}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* SEO-rich content */}
        <div className="mt-12 max-w-4xl mx-auto prose prose-sm">
          <h2 className="text-2xl font-semibold mb-4">Location de Voiture au Maroc - Guide Complet 2025</h2>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Benatna</strong> est la plateforme de référence pour la <strong>location de voiture au Maroc</strong>. 
            Nous facilitons l'accès à plus de 300 véhicules dans les principales villes : 
            <Link to="/louer" className="text-primary hover:underline"> location voiture Casablanca</Link>, 
            <Link to="/louer" className="text-primary hover:underline"> Marrakech</Link>, 
            <Link to="/louer" className="text-primary hover:underline"> Rabat</Link>, 
            <Link to="/louer" className="text-primary hover:underline"> Tanger</Link>, 
            <Link to="/louer" className="text-primary hover:underline"> Agadir</Link> et 
            <Link to="/louer" className="text-primary hover:underline"> Fès</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Notre service de <strong>location automobile</strong> se distingue par sa transparence totale des prix, 
            son processus 100% digital et l'absence de frais cachés. Que vous recherchiez une citadine économique, 
            un SUV familial ou un véhicule de luxe, notre réseau d'<strong>agences partenaires vérifiées</strong> vous 
            garantit un service professionnel et des véhicules en excellent état.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Idéal pour le <strong>tourisme au Maroc</strong>, les déplacements professionnels ou les besoins locaux, 
            Benatna simplifie votre mobilité avec des tarifs compétitifs dès 250 MAD/jour.
          </p>
          
          {/* Bloc SEO Casablanca - Maillage interne stratégique */}
          <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/10">
            <h3 className="text-xl font-semibold mb-3">Location de voiture à Casablanca</h3>
            <p className="text-muted-foreground leading-relaxed">
              Première destination économique du Maroc, <strong>Casablanca</strong> concentre entreprises, 
              aéroport international et quartiers d'affaires. Que vous arriviez à l'aéroport Mohammed V ou 
              que vous ayez besoin d'un véhicule pour vos déplacements professionnels, nos agences locales 
              partenaires vous proposent une <Link to="/location-voiture-casablanca" className="text-primary hover:underline font-medium">location de voiture à Casablanca</Link> simple 
              et transparente. Réservation 100 % digitale, prix clairs, assistance réactive : 
              découvrez pourquoi des milliers de clients nous font confiance pour leur mobilité casablancaise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
