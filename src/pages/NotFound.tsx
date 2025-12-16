import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, ArrowLeft, Car, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { WHATSAPP_NUMBER } from "@/utils/whatsapp";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const suggestedPages = [
    { path: "/", label: "Accueil", icon: Home, description: "Retour à la page d'accueil" },
    { path: "/louer", label: "Louer une voiture", icon: Car, description: "Trouvez votre véhicule idéal" },
    { path: "/partenaires", label: "Devenir partenaire", icon: MapPin, description: "Rejoignez notre réseau" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="container max-w-4xl">
          {/* 404 Hero */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="relative inline-block mb-6">
              <h1 className="text-[150px] md:text-[200px] font-bold text-primary/10 leading-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="w-24 h-24 text-primary animate-pulse" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Oups ! Cette route n'existe pas
            </h2>
            <p className="text-xl text-muted-foreground mb-2">
              La page que vous cherchez semble introuvable.
            </p>
            <p className="text-sm text-muted-foreground">
              URL demandée : <code className="bg-secondary/30 px-2 py-1 rounded">{location.pathname}</code>
            </p>
          </div>

          {/* Countdown Card */}
          <Card className="mb-8 border-2 border-primary/20 animate-fade-in [animation-delay:200ms]">
            <CardContent className="p-6 text-center">
              <p className="text-lg mb-2">
                Redirection automatique vers l'accueil dans
              </p>
              <div className="text-5xl font-bold text-primary mb-2">
                {countdown}
              </div>
              <p className="text-sm text-muted-foreground">secondes</p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 justify-center mb-12 animate-fade-in [animation-delay:400ms]">
            <Button 
              size="lg" 
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </Button>
            <Link to="/">
              <Button 
                size="lg" 
                variant="partner"
                className="rounded-full"
              >
                <Home className="w-5 h-5 mr-2" />
                Accueil
              </Button>
            </Link>
          </div>

          {/* Suggested Pages */}
          <div className="animate-fade-in [animation-delay:600ms]">
            <h3 className="text-2xl font-semibold text-center mb-6">
              Pages qui pourraient vous intéresser
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {suggestedPages.map((page) => (
                <Link key={page.path} to={page.path}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <page.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{page.label}</h4>
                      <p className="text-sm text-muted-foreground">
                        {page.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-12 text-center animate-fade-in [animation-delay:800ms]">
            <Card className="bg-secondary/20 border-secondary">
              <CardContent className="p-6">
                <p className="text-lg mb-4">
                  Besoin d'aide ? Notre équipe est là pour vous
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/contact">
                    <Button variant="outline">
                      Contactez-nous
                    </Button>
                  </Link>
                  <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary">
                      WhatsApp Support
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
