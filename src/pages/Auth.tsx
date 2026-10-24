import { generateStrongPassword } from '@/utils/strongPassword';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState<{ kind: 'error' | 'success'; text: string; focus?: boolean } | null>(null);
  const feedbackRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!feedback || (feedback.kind === 'success' && !feedback.focus)) return;
    feedbackRef.current?.focus({ preventScroll: true });
    feedbackRef.current?.scrollIntoView({ block: 'center', behavior: 'instant' });
  }, [feedback]);
  
  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  // Check if user is already logged in
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate("/analytics");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/analytics");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const showAuthError = (error: { message: string; code?: string; status?: number }, signup = false) => {
    let text = signup ? 'La création du compte est impossible pour le moment. Réessayez ou connectez-vous si vous avez déjà un compte.' : 'La connexion est impossible pour le moment. Réessayez.';
    if (error.code === 'invalid_credentials' || error.message.includes('Invalid login credentials')) text = 'Email ou mot de passe incorrect.';
    else if (error.code === 'email_not_confirmed') text = 'Confirmez votre adresse depuis le message reçu par email, puis connectez-vous.';
    else if (error.status === 429) text = 'Trop de tentatives. Patientez avant de réessayer.';
    else if (error.code === 'weak_password') text = 'Choisissez un mot de passe unique plus robuste, ou utilisez la proposition générée.';
    setFeedback({ kind: 'error', text });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: loginEmail.trim(), password: loginPassword });
      if (error) showAuthError(error);
      else {
        toast({ title: 'Connexion réussie', description: 'Vérification de votre accès administrateur.' });
        navigate('/analytics');
      }
    } catch {
      setFeedback({ kind: 'error', text: 'La connexion est impossible pour le moment. Vérifiez votre connexion et réessayez.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (signupPassword !== signupConfirmPassword) {
      setFeedback({ kind: 'error', text: 'Les mots de passe ne correspondent pas.' });
      return;
    }
    if (signupPassword.length < 12) {
      setFeedback({ kind: 'error', text: 'Le mot de passe doit contenir au moins 12 caractères.' });
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail.trim(), password: signupPassword,
        options: { emailRedirectTo: `${window.location.origin}/analytics` },
      });
      if (error) showAuthError(error, true);
      else if (data.session) navigate('/analytics');
      else setFeedback({ kind: 'success', focus: true, text: 'Consultez votre messagerie pour confirmer votre adresse, puis connectez-vous. La création d’un compte ne donne pas accès aux données administrateur.' });
    } catch {
      setFeedback({ kind: 'error', text: 'La création du compte est impossible pour le moment. Vérifiez votre connexion et réessayez.' });
    } finally {
      setIsLoading(false);
    }
  };

  const suggestPassword = () => {
    try {
      const password = generateStrongPassword();
      setSignupPassword(password);
      setSignupConfirmPassword(password);
      setFeedback({ kind: 'success', text: 'Mot de passe proposé dans les deux champs. Enregistrez-le dans votre gestionnaire de mots de passe avant de continuer.' });
    } catch {
      setFeedback({ kind: 'error', text: 'La proposition automatique est indisponible. Utilisez votre gestionnaire de mots de passe ou une phrase de passe unique.' });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Analytics Benatna</CardTitle>
            <CardDescription>
              Espace administrateur : accès réservé au compte autorisé.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" onValueChange={() => { setFeedback(null); setShowPassword(false); }} className="w-full">
              {feedback && <p ref={feedbackRef} tabIndex={-1} role={feedback.kind === 'error' ? 'alert' : 'status'} className={`mb-4 text-sm ${feedback.kind === 'error' ? 'text-destructive' : 'text-foreground'}`}>{feedback.text}</p>}
              <TabsList className="grid h-auto w-full grid-cols-2 border border-input bg-[#f5ffe4]">
                <TabsTrigger value="login" disabled={isLoading} className="min-h-11 transition-none text-black data-[state=active]:bg-[#4c7a15] data-[state=active]:text-white">Connexion</TabsTrigger>
                <TabsTrigger value="signup" disabled={isLoading} className="min-h-11 transition-none text-black data-[state=active]:bg-[#4c7a15] data-[state=active]:text-white">Inscription</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form aria-label="Connexion administrateur" onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        name="email"
                        autoComplete="username"
                        type="email"
                        placeholder="votre@email.com"
                        className="min-h-11 pl-10 text-base"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        name="password"
                        autoComplete="current-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="min-h-11 pl-10 pr-12 text-base"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                        aria-pressed={showPassword}
                        className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <Button type="submit" className="min-h-11 w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connexion...
                      </>
                    ) : (
                      "Se connecter"
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form aria-label="Inscription" onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        name="email"
                        autoComplete="username"
                        type="email"
                        placeholder="votre@email.com"
                        className="min-h-11 pl-10 text-base"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        name="password"
                        autoComplete="new-password"
                        aria-describedby="signup-password-help"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 12 caractères"
                        className="min-h-11 pl-10 pr-12 text-base"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                        minLength={12}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                        aria-pressed={showPassword}
                        className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <p id="signup-password-help" className="text-sm text-muted-foreground">
                    Choisissez au moins 12 caractères, par exemple une phrase de plusieurs mots sans lien entre eux. Utilisez un mot de passe unique ou celui proposé par votre gestionnaire de mots de passe.
                  </p>

                  <Button type="button" variant="outline" className="min-h-11 h-auto w-full whitespace-normal" disabled={isLoading} onClick={suggestPassword}>Proposer un mot de passe robuste</Button>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirmer le mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-confirm"
                        name="password-confirmation"
                        autoComplete="new-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirmez votre mot de passe"
                        className="min-h-11 pl-10 text-base"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="min-h-11 w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Création...
                      </>
                    ) : (
                      "Créer un compte"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
