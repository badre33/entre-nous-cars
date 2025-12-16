import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle, Phone, Users, Clock, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhyBenatna = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Shield,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      titleKey: "homepage.benefit1Title",
      descKey: "homepage.benefit1Text"
    },
    {
      icon: CheckCircle,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      titleKey: "homepage.benefit2Title",
      descKey: "homepage.benefit2Text"
    },
    {
      icon: Phone,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      titleKey: "homepage.benefit3Title",
      descKey: "homepage.benefit3Text"
    },
    {
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      titleKey: "homepage.benefit4Title",
      descKey: "homepage.benefit4Text"
    },
    {
      icon: Clock,
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      titleKey: "homepage.benefit5Title",
      descKey: "homepage.benefit5Text"
    },
    {
      icon: Star,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      titleKey: "homepage.benefit6Title",
      descKey: "homepage.benefit6Text"
    }
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          {t("homepage.whyBenatnaTitle")}
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          {t("homepage.whyBenatnaSubtitle")}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${benefit.iconBg} rounded-lg flex items-center justify-center mb-4`}>
                  <benefit.icon className={`w-6 h-6 ${benefit.iconColor}`} />
                </div>
                <h3 className="font-semibold mb-2">{t(benefit.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(benefit.descKey)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBenatna;
