import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Zap, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import aboutImage from "@/assets/about-mission.jpg";

const APropos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl mb-8">À propos de Benatna</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Benatna, c'est bien plus qu'une simple plateforme de location de véhicules. 
            C'est une marque marocaine née d'un besoin clair : rendre la mobilité plus simple, 
            plus humaine et plus connectée.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl md:text-5xl mb-6">Notre mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Faciliter la mobilité au Maroc grâce à la technologie et à la confiance. 
                Benatna connecte voyageurs, résidents et agences locales à travers une plateforme 
                fluide, moderne et sécurisée, pour une expérience de location sans stress, 
                sans paperasse et sans attente.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Notre mission est de créer un pont entre la technologie et la confiance locale, 
                en offrant une expérience de location fluide, 100% sans contact, tout en valorisant 
                les acteurs du territoire.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={aboutImage} 
                alt="Notre mission" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-secondary/20">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl mb-8">Notre vision</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Faire de Benatna la première marque marocaine de mobilité intelligente, 
            capable de combiner innovation technologique et ancrage local. Nous voulons 
            bâtir un écosystème où chaque acteur — utilisateur, loueur ou partenaire — 
            trouve sa place et bénéficie d'une expérience à la hauteur des standards internationaux.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl md:text-5xl text-center mb-16">Nos valeurs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-12 pb-8 text-center">
                <Heart className="w-12 h-12 mb-6 text-primary mx-auto" />
                <h3 className="text-xl font-barlow font-semibold mb-4">Lien humain</h3>
                <p className="text-muted-foreground text-sm">
                  La technologie au service de la connexion humaine
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-12 pb-8 text-center">
                <Shield className="w-12 h-12 mb-6 text-secondary mx-auto" />
                <h3 className="text-xl font-barlow font-semibold mb-4">Transparence</h3>
                <p className="text-muted-foreground text-sm">
                  Des prix clairs, sans surprise ni frais cachés
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-12 pb-8 text-center">
                <Zap className="w-12 h-12 mb-6 text-accent mx-auto" />
                <h3 className="text-xl font-barlow font-semibold mb-4">Efficacité</h3>
                <p className="text-muted-foreground text-sm">
                  Un processus rapide, simple et 100% digital
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-12 pb-8 text-center">
                <MapPin className="w-12 h-12 mb-6 text-primary mx-auto" />
                <h3 className="text-xl font-barlow font-semibold mb-4">Fierté locale</h3>
                <p className="text-muted-foreground text-sm">
                  Valoriser les acteurs marocains de la mobilité
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Benatna */}
      <section className="py-20 bg-card">
        <div className="container max-w-4xl">
          <h2 className="text-4xl md:text-5xl text-center mb-8">Pourquoi « Benatna » ?</h2>
          <p className="text-xl text-center text-muted-foreground leading-relaxed mb-12">
            « Benatna » signifie « entre nous ». Ce nom exprime le lien humain de confiance 
            entre les agences locales et les conducteurs — une mobilité à visage humain.
          </p>
          
          <Card className="border-2 rounded-2xl bg-secondary/30">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-barlow font-semibold mb-4">
                Une technologie humaine
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                La location de voiture ne devrait pas être un parcours du combattant. 
                Notre mission : la rendre simple, claire et rassurante — du premier clic jusqu'aux clés.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default APropos;
