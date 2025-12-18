import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { BUSINESS_INFO, getFullAddress } from "@/constants/businessInfo";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Mentions Légales | Benatna - Location de Voiture au Maroc</title>
        <meta name="description" content="Mentions légales de Benatna, plateforme de location de voiture au Maroc. Informations sur l'éditeur, l'hébergeur et les conditions d'utilisation." />
        <link rel="canonical" href="https://benatna.ma/mentions-legales" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <Header />
      <Breadcrumbs />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl px-4">
          <h1 className="text-4xl font-bold mb-8">Mentions Légales</h1>
          
          <div className="space-y-8">
            {/* Éditeur du site */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">1. Éditeur du site</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Raison sociale :</strong> {BUSINESS_INFO.legalName}</p>
                  <p><strong>Nom commercial :</strong> {BUSINESS_INFO.name}</p>
                  <p><strong>Siège social :</strong> {getFullAddress()}</p>
                  <p><strong>Téléphone :</strong> {BUSINESS_INFO.phone}</p>
                  <p><strong>Email :</strong> {BUSINESS_INFO.email}</p>
                  <p><strong>Site web :</strong> {BUSINESS_INFO.website}</p>
                  <p><strong>Forme juridique :</strong> SARL (Société à Responsabilité Limitée)</p>
                  <p><strong>Capital social :</strong> 100 000 MAD</p>
                  <p><strong>RC :</strong> Casablanca</p>
                  <p><strong>ICE :</strong> 003XXXXXXXXXX</p>
                </div>
              </CardContent>
            </Card>

            {/* Directeur de publication */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">2. Directeur de la publication</h2>
                <p className="text-muted-foreground">
                  Le directeur de la publication est le représentant légal de {BUSINESS_INFO.legalName}.
                </p>
              </CardContent>
            </Card>

            {/* Hébergement */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">3. Hébergement</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>Le site {BUSINESS_INFO.website} est hébergé par :</p>
                  <p><strong>Lovable / Supabase</strong></p>
                  <p>Services cloud internationaux</p>
                  <p>Conformes aux normes RGPD</p>
                </div>
              </CardContent>
            </Card>

            {/* Propriété intellectuelle */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">4. Propriété intellectuelle</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    L'ensemble du contenu de ce site (textes, images, logos, icônes, sons, logiciels, etc.) 
                    est la propriété exclusive de {BUSINESS_INFO.legalName} ou de ses partenaires et est protégé 
                    par les lois françaises et internationales relatives à la propriété intellectuelle.
                  </p>
                  <p>
                    Toute reproduction, représentation, modification, publication, adaptation de tout ou partie 
                    des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf 
                    autorisation écrite préalable de {BUSINESS_INFO.legalName}.
                  </p>
                  <p>
                    La marque "Benatna" et son logo sont des marques déposées. Toute reproduction ou utilisation 
                    non autorisée est strictement interdite.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Limitation de responsabilité */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">5. Limitation de responsabilité</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {BUSINESS_INFO.legalName} s'efforce d'assurer au mieux de ses possibilités l'exactitude et 
                    la mise à jour des informations diffusées sur ce site. Toutefois, {BUSINESS_INFO.legalName} 
                    ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à 
                    disposition sur ce site.
                  </p>
                  <p>
                    En conséquence, {BUSINESS_INFO.legalName} décline toute responsabilité pour toute 
                    imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site.
                  </p>
                  <p>
                    {BUSINESS_INFO.legalName} ne pourra en aucun cas être tenue responsable de tout dommage de 
                    quelque nature qu'il soit résultant de l'interprétation ou de l'utilisation des informations 
                    et services disponibles sur ce site.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Liens hypertextes */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">6. Liens hypertextes</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Le site peut contenir des liens hypertextes vers d'autres sites. {BUSINESS_INFO.legalName} 
                    n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
                  </p>
                  <p>
                    La mise en place de liens hypertextes vers le site {BUSINESS_INFO.website} nécessite une 
                    autorisation préalable écrite de {BUSINESS_INFO.legalName}.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Droit applicable */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">7. Droit applicable</h2>
                <p className="text-muted-foreground">
                  Les présentes mentions légales sont régies par le droit marocain. En cas de litige, 
                  les tribunaux de Casablanca seront seuls compétents.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>Pour toute question concernant ces mentions légales, vous pouvez nous contacter :</p>
                  <p><strong>Email :</strong> {BUSINESS_INFO.email}</p>
                  <p><strong>Téléphone :</strong> {BUSINESS_INFO.phone}</p>
                  <p><strong>Adresse :</strong> {getFullAddress()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-sm text-muted-foreground mt-8 text-center">
            Dernière mise à jour : Janvier 2025
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MentionsLegales;