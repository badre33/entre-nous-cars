import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, FileText, AlertCircle, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { CanonicalTag } from "@/components/CanonicalTag";
import { FAQSchemaEnriched } from "@/components/schemas/FAQSchemaEnriched";
import { BreadcrumbsEnriched } from "@/components/BreadcrumbsEnriched";

const DocumentsNecessairesLocation = () => {
  const faqs = [
    {
      question: "Quels documents sont obligatoires pour louer une voiture au Maroc ?",
      answer: "Pour louer une voiture au Maroc, vous devez obligatoirement présenter : 1) Une pièce d'identité valide (CNI marocaine, passeport pour étrangers), 2) Un permis de conduire valide depuis au moins 2 ans (permis marocain ou international), 3) Un justificatif de domicile récent (moins de 3 mois) : facture eau/électricité/téléphone ou attestation bancaire, 4) Une carte bancaire pour la caution (ou caution en espèces chez Benatna)."
    },
    {
      question: "Les photocopies de documents sont-elles acceptées ?",
      answer: "Non, nous acceptons uniquement les documents originaux. Les photocopies, scans ou photos de documents ne sont pas valables pour la location. Vous devez présenter physiquement votre pièce d'identité originale, permis de conduire original, et justificatif de domicile original au moment du retrait du véhicule. Cette règle est imposée par la réglementation marocaine."
    },
    {
      question: "Puis-je louer une voiture avec un permis de conduire étranger ?",
      answer: "Oui, les permis de conduire étrangers sont acceptés au Maroc selon les règles suivantes : 1) Permis européens : valables directement sans traduction, 2) Permis USA/Canada : valables avec permis international recommandé, 3) Autres pays : permis international obligatoire + permis national. Le permis doit être valide depuis au moins 2 ans et en cours de validité pendant toute la durée de location."
    },
    {
      question: "Que faire si j'ai oublié mes documents à l'hôtel ?",
      answer: "Si vous avez oublié vos documents, vous devez impérativement retourner les chercher avant de louer le véhicule. Aucune location ne peut être effectuée sans les documents originaux obligatoires, c'est une exigence légale. Pour éviter ce désagrément, nous vous recommandons de vérifier que vous avez tous vos documents avant de vous déplacer à notre agence. Vous pouvez également nous envoyer des photos par WhatsApp pour pré-validation."
    },
    {
      question: "Combien de temps prend la vérification des documents ?",
      answer: "La vérification de vos documents prend généralement 5 à 10 minutes. Nous vérifions l'authenticité de votre pièce d'identité, la validité de votre permis de conduire (date d'obtention, date d'expiration), et votre justificatif de domicile. Cette vérification est obligatoire et nous permet de finaliser le contrat de location. Pour accélérer le processus, préparez tous vos documents avant votre arrivée."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Documents Nécessaires Location Voiture Maroc - Liste Complète | Benatna</title>
        <meta name="description" content="Documents obligatoires pour louer une voiture au Maroc : pièce d'identité, permis de conduire, justificatif de domicile. Guide complet et checklist à télécharger." />
        <meta name="keywords" content="documents location voiture maroc, permis conduire location maroc, pièces nécessaires location voiture, justificatif domicile location" />
      </Helmet>

      <CanonicalTag path="/documents-necessaires-location-maroc" />
      <FAQSchemaEnriched faqs={faqs} pageName="Documents Nécessaires Location Voiture Maroc" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Documents Nécessaires pour Louer une Voiture au Maroc",
            "description": "Guide complet des documents obligatoires pour la location de voiture au Maroc",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Pièce d'identité",
                "text": "Présentez une pièce d'identité valide (CNI pour Marocains, passeport pour étrangers)"
              },
              {
                "@type": "HowToStep",
                "name": "Permis de conduire",
                "text": "Présentez votre permis de conduire valide depuis au moins 2 ans"
              },
              {
                "@type": "HowToStep",
                "name": "Justificatif de domicile",
                "text": "Fournissez un justificatif de domicile récent (moins de 3 mois)"
              },
              {
                "@type": "HowToStep",
                "name": "Moyen de paiement",
                "text": "Carte bancaire ou espèces pour le paiement et la caution"
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <BreadcrumbsEnriched 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Guide", href: "/faq" },
            { label: "Documents Nécessaires", href: "/documents-necessaires-location-maroc" }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Guide Complet Documents</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Documents Nécessaires Location Voiture Maroc
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Liste Complète & Checklist à Télécharger
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/louer">Réserver Maintenant</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg">
                  <Download className="w-5 h-5 mr-2" />
                  Télécharger Checklist
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">4</div>
                  <div className="text-sm text-muted-foreground">Documents</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">2 ans</div>
                  <div className="text-sm text-muted-foreground">Permis Min</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">5-10min</div>
                  <div className="text-sm text-muted-foreground">Vérification</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Obligatoire</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Required Documents Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                4 Documents Obligatoires pour Louer au Maroc
              </h2>

              <div className="space-y-6">
                <Card className="p-6 border-2 border-primary">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">Pièce d'Identité Valide</h3>
                      <p className="text-muted-foreground mb-4">
                        Document officiel prouvant votre identité. Doit être en cours de validité pendant toute la durée de location.
                      </p>
                      
                      <div className="bg-card/50 p-4 rounded-lg mb-4">
                        <h4 className="font-bold mb-2">Pour les Marocains :</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>Carte Nationale d'Identité (CNI) en cours de validité</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>OU Passeport marocain valide</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-card/50 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Pour les Étrangers :</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>Passeport en cours de validité (minimum 3 mois après date retour)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>Carte d'identité européenne valide (pour ressortissants UE)</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-4 flex items-start gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          <strong>Important :</strong> Document original obligatoire, photocopies refusées
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-primary">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">Permis de Conduire Valide</h3>
                      <p className="text-muted-foreground mb-4">
                        Permis de conduire obtenu depuis au moins 2 ans. Doit être en cours de validité pendant toute la location.
                      </p>
                      
                      <div className="bg-card/50 p-4 rounded-lg mb-4">
                        <h4 className="font-bold mb-2">Permis Marocain :</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>Permis de conduire marocain valide depuis 2 ans minimum</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>Toutes catégories acceptées (B, C, D selon véhicule)</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-card/50 p-4 rounded-lg mb-4">
                        <h4 className="font-bold mb-2">Permis Étranger :</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>UE/EEE :</strong> Permis national suffisant (français, belge, allemand...)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>USA/Canada :</strong> Permis + permis international recommandé</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Autres pays :</strong> Permis international obligatoire + permis national</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-4 flex items-start gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          <strong>Âge minimum :</strong> 21 ans avec 2 ans de permis. Jeunes conducteurs (21-25 ans) : supplément possible
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-primary">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">Justificatif de Domicile Récent</h3>
                      <p className="text-muted-foreground mb-4">
                        Document prouvant votre adresse actuelle. Doit dater de moins de 3 mois.
                      </p>
                      
                      <div className="bg-card/50 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Documents Acceptés :</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>Facture électricité, eau, gaz (moins de 3 mois)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>Facture téléphone fixe ou internet (moins de 3 mois)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>Attestation bancaire récente</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>Contrat de bail ou quittance de loyer</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>Avis d'imposition ou taxe d'habitation</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-4 flex items-start gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          <strong>Touristes :</strong> Réservation hôtel ou attestation hébergement acceptée
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-primary">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">Moyen de Paiement pour Caution</h3>
                      <p className="text-muted-foreground mb-4">
                        Carte bancaire ou espèces pour le blocage de la caution de garantie.
                      </p>
                      
                      <div className="bg-card/50 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Options Acceptées chez Benatna :</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>Carte de crédit (Visa, Mastercard) au nom du conducteur principal</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>Espèces (Dirhams) pour caution et paiement location</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>Carte de débit pour paiement (pas pour caution)</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-4 bg-primary/10 p-4 rounded-lg">
                        <p className="text-sm">
                          <strong>Montant caution :</strong> 3000 à 8000 DH selon véhicule. 
                          <Link to="/paiement-especes-sans-carte-maroc" className="text-primary underline ml-1">
                            Voir guide paiement espèces
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Checklist Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Checklist Avant de Venir
              </h2>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6">✅ À Préparer Avant Votre Venue :</h3>
                
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1" />
                    <span>Pièce d'identité originale (CNI ou passeport) en cours de validité</span>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1" />
                    <span>Permis de conduire original obtenu depuis au moins 2 ans</span>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1" />
                    <span>Permis international (si permis non européen)</span>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1" />
                    <span>Justificatif de domicile récent (moins de 3 mois)</span>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1" />
                    <span>Carte bancaire OU espèces pour caution</span>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1" />
                    <span>Confirmation de réservation (email ou SMS)</span>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1" />
                    <span>Numéro de téléphone joignable au Maroc</span>
                  </label>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Button className="w-full" variant="outline">
                    <Download className="w-5 h-5 mr-2" />
                    Télécharger cette Checklist en PDF
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Questions Fréquentes - Documents Location
              </h2>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-lg font-bold mb-3 flex items-start gap-2">
                      <span className="text-primary">Q:</span>
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground pl-6">
                      <strong className="text-primary">R:</strong> {faq.answer}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Documents Prêts ? Réservez Maintenant !
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Assurez-vous d'avoir tous vos documents et réservez votre véhicule en 2 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/louer">Réserver Ma Voiture</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/contact">Questions ? Contactez-nous</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default DocumentsNecessairesLocation;