import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, User, AlertCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { CanonicalTag } from "@/components/CanonicalTag";
import { FAQSchemaEnriched } from "@/components/schemas/FAQSchemaEnriched";
import { BreadcrumbsEnriched } from "@/components/BreadcrumbsEnriched";

const AgeMinimumLocation = () => {
  const faqs = [
    {
      question: "Quel est l'âge minimum pour louer une voiture au Maroc ?",
      answer: "L'âge minimum légal pour louer une voiture au Maroc est de 21 ans avec un permis de conduire obtenu depuis au moins 2 ans. Chez Benatna, nous acceptons les conducteurs dès 21 ans pour la plupart des véhicules (citadines, SUV standards). Pour les véhicules de luxe et certains 4x4 puissants, l'âge minimum est porté à 25 ans pour des raisons d'assurance."
    },
    {
      question: "Y a-t-il un supplément jeune conducteur au Maroc ?",
      answer: "Oui, pour les conducteurs âgés de 21 à 24 ans, un supplément jeune conducteur s'applique chez la plupart des loueurs. Chez Benatna, ce supplément est de 50 DH par jour pour les 21-24 ans. À partir de 25 ans, aucun supplément n'est appliqué. Ce supplément couvre le risque statistiquement plus élevé des jeunes conducteurs et permet d'adapter les conditions d'assurance."
    },
    {
      question: "Puis-je louer une voiture au Maroc à 18 ans ?",
      answer: "Non, il n'est pas possible de louer une voiture au Maroc à 18 ans, même avec un permis valide. La loi marocaine et les conditions d'assurance imposent un âge minimum de 21 ans avec 2 ans de permis. Si vous avez moins de 21 ans, vous devrez être accompagné d'un conducteur de 21 ans ou plus inscrit sur le contrat, ou opter pour une location avec chauffeur."
    },
    {
      question: "Y a-t-il un âge maximum pour louer une voiture au Maroc ?",
      answer: "Il n'y a généralement pas d'âge maximum strict pour louer une voiture au Maroc. Cependant, certains loueurs peuvent demander un certificat médical pour les conducteurs de plus de 75 ans. Chez Benatna, nous acceptons les conducteurs seniors sans limite d'âge tant qu'ils sont en possession d'un permis valide et en capacité physique de conduire. Pour les plus de 75 ans, un certificat médical peut être demandé."
    },
    {
      question: "Quels véhicules sont accessibles aux jeunes conducteurs (21-24 ans) ?",
      answer: "Les jeunes conducteurs (21-24 ans) peuvent louer chez Benatna : citadines (Clio, Sandero, 208), SUV compacts (Duster, Captur), berlines standards (Corolla). Les véhicules exclus pour les moins de 25 ans sont : voitures de luxe (Mercedes, BMW, Audi haut de gamme), SUV premium et sportifs (Range Rover, Porsche Cayenne), véhicules puissants (>200 CV). Cette restriction est imposée par nos assureurs pour limiter les risques."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Âge Minimum Location Voiture Maroc - 21 ans + Conditions | Benatna</title>
        <meta name="description" content="Âge minimum pour louer une voiture au Maroc : 21 ans avec 2 ans de permis. Supplément jeune conducteur 21-24 ans. Véhicules autorisés. Guide complet." />
        <meta name="keywords" content="age minimum location voiture maroc, jeune conducteur maroc, location voiture 21 ans maroc, supplément jeune conducteur, permis 2 ans" />
      </Helmet>

      <CanonicalTag path="/age-minimum-location-voiture-maroc" />
      <FAQSchemaEnriched faqs={faqs} pageName="Âge Minimum Location Voiture Maroc" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Âge Minimum pour Louer une Voiture au Maroc",
            "description": "Guide complet sur l'âge minimum requis pour louer une voiture au Maroc et les conditions pour jeunes conducteurs.",
            "author": {
              "@type": "Organization",
              "name": "Benatna"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <BreadcrumbsEnriched 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Guide", href: "/faq" },
            { label: "Âge Minimum", href: "/age-minimum-location-voiture-maroc" }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <User className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Guide Âge & Conditions</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Âge Minimum Location Voiture Maroc
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                21 ans Minimum + 2 ans de Permis
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/louer">Réserver Maintenant</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/documents-necessaires-location-maroc">Documents Requis</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">21 ans</div>
                  <div className="text-sm text-muted-foreground">Âge Min</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">2 ans</div>
                  <div className="text-sm text-muted-foreground">Permis Min</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">+50 DH</div>
                  <div className="text-sm text-muted-foreground">Si 21-24 ans</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">25 ans</div>
                  <div className="text-sm text-muted-foreground">Luxe Min</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Age Requirements Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Conditions d'Âge et de Permis
              </h2>

              <div className="space-y-6">
                <Card className="p-6 border-2 border-destructive/50">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-12 h-12 text-destructive flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-3">❌ Moins de 21 ans : Location Impossible</h3>
                      <p className="text-muted-foreground mb-4">
                        Il est <strong>impossible de louer une voiture au Maroc si vous avez moins de 21 ans</strong>, 
                        même avec un permis valide depuis plusieurs années. C'est une exigence légale marocaine 
                        et une condition imposée par toutes les compagnies d'assurance.
                      </p>
                      <div className="bg-card/50 p-4 rounded">
                        <h4 className="font-bold mb-2">Solutions alternatives :</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>Ajouter un conducteur additionnel de 21+ ans sur le contrat</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>Opter pour une location avec chauffeur</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>Utiliser les transports en commun ou taxis</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-primary/50">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-12 h-12 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-3">⚠️ 21-24 ans : Jeune Conducteur (Supplément)</h3>
                      <p className="text-muted-foreground mb-4">
                        Vous pouvez louer à partir de 21 ans, mais un <strong>supplément jeune conducteur</strong> 
                        s'applique jusqu'à 25 ans. Ce supplément couvre le risque statistiquement plus élevé 
                        des conducteurs de cette tranche d'âge.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-card/50 p-4 rounded">
                          <h4 className="font-bold mb-2">Conditions :</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>Âge : 21 à 24 ans révolus</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>Permis depuis 2 ans minimum</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>Supplément : +50 DH/jour</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-card/50 p-4 rounded">
                          <h4 className="font-bold mb-2">Véhicules Autorisés :</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>Citadines (Clio, Sandero...)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>SUV compacts (Duster, Captur)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>Berlines standards</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-destructive/10 p-3 rounded text-sm">
                        <strong>Véhicules EXCLUS 21-24 ans :</strong> Luxe (Mercedes, BMW), SUV premium, 
                        véhicules sportifs ou puissants (+200 CV)
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 border-primary">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-12 h-12 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-3">✅ 25 ans et Plus : Aucune Restriction</h3>
                      <p className="text-muted-foreground mb-4">
                        À partir de 25 ans avec un permis valide depuis au moins 2 ans, vous avez accès 
                        à <strong>tous les véhicules de notre flotte</strong> sans supplément jeune conducteur.
                      </p>
                      
                      <div className="bg-primary/10 p-4 rounded">
                        <h4 className="font-bold mb-3">Accès Complet à Tous Véhicules :</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>Citadines et économiques</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>SUV et 4x4 tous modèles</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>Berlines familiales</span>
                            </li>
                          </ul>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>Véhicules de luxe (Mercedes, BMW)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>SUV premium (Range Rover, Cayenne)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>Cabriolets et sportives</span>
                            </li>
                          </ul>
                        </div>
                        <p className="text-sm mt-3">
                          <strong>Aucun supplément</strong> lié à l'âge. Tarifs standards uniquement.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <User className="w-12 h-12 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-3">👴 Seniors (65 ans et Plus)</h3>
                      <p className="text-muted-foreground mb-4">
                        Aucun âge maximum strict chez Benatna. Les conducteurs seniors sont les bienvenus 
                        tant qu'ils possèdent un permis valide et sont aptes à conduire.
                      </p>
                      
                      <div className="bg-card/50 p-4 rounded">
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>65-74 ans : Aucune condition particulière</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>75 ans et plus : Certificat médical peut être demandé</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>Option location avec chauffeur disponible pour plus de confort</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Young Driver Supplement Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Supplément Jeune Conducteur : Calcul & Exemple
              </h2>

              <Card className="p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Tarification Jeune Conducteur</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3">Tranche d'Âge</th>
                        <th className="p-3">Supplément/Jour</th>
                        <th className="p-3">Véhicules Autorisés</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">Moins de 21 ans</td>
                        <td className="p-3 text-destructive font-bold">❌ Location impossible</td>
                        <td className="p-3">Aucun</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">21-24 ans</td>
                        <td className="p-3 font-bold text-primary">+50 DH/jour</td>
                        <td className="p-3">Citadines, SUV compacts, Berlines standards</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">25 ans et plus</td>
                        <td className="p-3 font-bold text-primary">0 DH (gratuit)</td>
                        <td className="p-3">Tous véhicules sans exception</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="p-6 bg-primary/10">
                <h3 className="text-xl font-bold mb-4">💰 Exemple de Calcul - Jeune Conducteur 23 ans</h3>
                
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    <strong>Contexte :</strong> Mathieu, 23 ans, permis depuis 3 ans, loue une Dacia Duster 
                    pendant 7 jours à Casablanca.
                  </p>
                  
                  <div className="bg-card p-4 rounded">
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Location Dacia Duster (7 jours × 250 DH)</span>
                        <strong>1750 DH</strong>
                      </li>
                      <li className="flex justify-between text-primary">
                        <span>Supplément jeune conducteur (7 jours × 50 DH)</span>
                        <strong>+350 DH</strong>
                      </li>
                      <li className="flex justify-between">
                        <span>Assurance tous risques (7 jours × 80 DH)</span>
                        <strong>+560 DH</strong>
                      </li>
                      <li className="flex justify-between pt-2 border-t font-bold text-lg">
                        <span>TOTAL À PAYER</span>
                        <strong>2660 DH</strong>
                      </li>
                    </ul>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4">
                    <strong>Note :</strong> Si Mathieu avait 25 ans, le supplément de 350 DH ne s'appliquerait pas. 
                    Total serait alors 2310 DH.
                  </p>
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
                Questions Fréquentes - Âge Minimum Location
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
                Prêt à Louer Votre Voiture ?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Vous avez 21 ans ou plus avec 2 ans de permis ? Réservez dès maintenant 
                et explorez le Maroc en toute liberté.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/louer">Réserver Ma Voiture</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/documents-necessaires-location-maroc">Voir Documents Requis</Link>
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

export default AgeMinimumLocation;