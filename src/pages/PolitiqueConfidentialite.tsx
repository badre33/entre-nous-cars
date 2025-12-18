import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { BUSINESS_INFO, getFullAddress } from "@/constants/businessInfo";

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Politique de Confidentialité | Benatna - Location de Voiture au Maroc</title>
        <meta name="description" content="Politique de confidentialité de Benatna. Découvrez comment nous protégeons vos données personnelles et respectons votre vie privée." />
        <link rel="canonical" href="https://benatna.ma/politique-confidentialite" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <Header />
      <Breadcrumbs />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl px-4">
          <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Chez {BUSINESS_INFO.name}, nous accordons une grande importance à la protection de vos données 
            personnelles. Cette politique de confidentialité décrit les types de données que nous collectons, 
            comment nous les utilisons et les mesures que nous prenons pour les protéger.
          </p>
          
          <div className="space-y-8">
            {/* Responsable du traitement */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">1. Responsable du traitement</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>Le responsable du traitement des données personnelles est :</p>
                  <p><strong>{BUSINESS_INFO.legalName}</strong></p>
                  <p>{getFullAddress()}</p>
                  <p>Email : {BUSINESS_INFO.email}</p>
                  <p>Téléphone : {BUSINESS_INFO.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Données collectées */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">2. Données personnelles collectées</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Nous collectons les données suivantes lorsque vous utilisez notre service :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Données d'identification :</strong> nom, prénom, date de naissance</li>
                    <li><strong>Coordonnées :</strong> adresse email, numéro de téléphone, adresse postale</li>
                    <li><strong>Documents :</strong> permis de conduire, carte d'identité nationale ou passeport</li>
                    <li><strong>Données de réservation :</strong> dates, lieu de prise en charge, véhicule choisi</li>
                    <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées</li>
                    <li><strong>Données de paiement :</strong> uniquement via nos partenaires de paiement sécurisés</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Finalités */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">3. Finalités du traitement</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Vos données personnelles sont utilisées pour :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Traiter et gérer vos réservations de véhicules</li>
                    <li>Vous contacter concernant votre réservation (confirmation, rappels, modifications)</li>
                    <li>Améliorer nos services et votre expérience utilisateur</li>
                    <li>Respecter nos obligations légales et réglementaires</li>
                    <li>Prévenir la fraude et assurer la sécurité de nos services</li>
                    <li>Vous envoyer des offres promotionnelles (avec votre consentement)</li>
                    <li>Répondre à vos demandes d'information ou réclamations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Base légale */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">4. Base légale du traitement</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Le traitement de vos données repose sur les bases légales suivantes :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Exécution du contrat :</strong> pour traiter vos réservations</li>
                    <li><strong>Obligation légale :</strong> conservation des documents contractuels</li>
                    <li><strong>Intérêt légitime :</strong> amélioration de nos services, prévention de la fraude</li>
                    <li><strong>Consentement :</strong> pour l'envoi de communications marketing</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Destinataires */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">5. Destinataires des données</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Vos données peuvent être transmises à :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Agences partenaires :</strong> pour la mise à disposition du véhicule</li>
                    <li><strong>Compagnies d'assurance :</strong> pour la gestion des sinistres éventuels</li>
                    <li><strong>Prestataires techniques :</strong> hébergement, paiement, analytics</li>
                    <li><strong>Autorités compétentes :</strong> sur demande légale uniquement</li>
                  </ul>
                  <p className="mt-4">
                    Nous ne vendons jamais vos données personnelles à des tiers.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Durée de conservation */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">6. Durée de conservation</h2>
                <div className="space-y-4 text-muted-foreground">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Données de réservation :</strong> 5 ans après la fin du contrat</li>
                    <li><strong>Documents comptables :</strong> 10 ans (obligation légale)</li>
                    <li><strong>Données de navigation :</strong> 13 mois maximum</li>
                    <li><strong>Données marketing :</strong> 3 ans après le dernier contact</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Vos droits */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">7. Vos droits</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Conformément à la loi 09-08 relative à la protection des personnes physiques à l'égard 
                  du traitement des données à caractère personnel, vous disposez des droits suivants :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                    <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
                    <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                    <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                    <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                    <li><strong>Droit de retrait du consentement :</strong> à tout moment pour le marketing</li>
                  </ul>
                  <p className="mt-4">
                    Pour exercer ces droits, contactez-nous à : <strong>{BUSINESS_INFO.email}</strong>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">8. Cookies</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Notre site utilise des cookies pour améliorer votre expérience :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Cookies essentiels :</strong> fonctionnement du site (session, préférences)</li>
                    <li><strong>Cookies analytiques :</strong> mesure d'audience (Google Analytics)</li>
                    <li><strong>Cookies marketing :</strong> personnalisation des publicités (avec consentement)</li>
                  </ul>
                  <p className="mt-4">
                    Vous pouvez gérer vos préférences cookies dans les paramètres de votre navigateur.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Sécurité */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">9. Sécurité des données</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Chiffrement SSL/TLS pour toutes les communications</li>
                    <li>Accès restreint aux données personnelles</li>
                    <li>Hébergement sécurisé avec sauvegardes régulières</li>
                    <li>Surveillance continue des systèmes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Modifications */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">10. Modifications de la politique</h2>
                <p className="text-muted-foreground">
                  Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                  En cas de modification substantielle, nous vous en informerons par email ou par une 
                  notification sur notre site. La date de dernière mise à jour est indiquée en bas de cette page.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">11. Nous contacter</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>Pour toute question concernant cette politique ou vos données personnelles :</p>
                  <p><strong>Email :</strong> {BUSINESS_INFO.email}</p>
                  <p><strong>Téléphone :</strong> {BUSINESS_INFO.phone}</p>
                  <p><strong>Adresse :</strong> {getFullAddress()}</p>
                  <p className="mt-4">
                    Vous pouvez également déposer une réclamation auprès de la CNDP (Commission Nationale 
                    de contrôle de la protection des Données à caractère Personnel) : www.cndp.ma
                  </p>
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

export default PolitiqueConfidentialite;