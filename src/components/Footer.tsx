import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="w-full border-t border-border bg-card mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('common.contact')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>WhatsApp: +212 699 024 526</li>
              <li>contact@benatna.ma</li>
            </ul>
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
