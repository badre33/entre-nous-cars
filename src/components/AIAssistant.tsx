import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Trash2, Car, Calculator, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAIChat } from '@/hooks/useAIChat';
import { cn } from '@/lib/utils';
import { analytics } from '@/utils/analytics';
import { useLanguage } from '@/contexts/LanguageContext';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { messages, isLoading, sendMessage, clearMessages } = useAIChat();
  const { t, language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
    analytics.trackChatOpened('ai_assistant');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = language === 'en' 
    ? [
        "I want to rent a car for 7 days",
        "Best car for Marrakech?",
        "How much for an SUV?",
        "Available cars in Casablanca?"
      ]
    : language === 'es'
    ? [
        "Quiero alquilar un coche por 7 días",
        "¿Mejor coche para Marrakech?",
        "¿Cuánto cuesta un SUV?",
        "¿Coches disponibles en Casablanca?"
      ]
    : [
        "Je veux louer pour 7 jours",
        "Meilleure voiture pour Marrakech ?",
        "Combien coûte un SUV ?",
        "Voitures dispo à Casablanca ?"
      ];

  const quickActions = [
    {
      icon: Car,
      label: language === 'en' ? "🚗 Rent now" : language === 'es' ? "🚗 Alquilar ahora" : "🚗 Louer maintenant",
      action: () => setInputValue(language === 'en' ? "I want to rent a car" : language === 'es' ? "Quiero alquilar un coche" : "Je veux louer une voiture")
    },
    {
      icon: Calculator,
      label: language === 'en' ? "💰 Get a quote" : language === 'es' ? "💰 Obtener cotización" : "💰 Obtenir un devis",
      action: () => setInputValue(language === 'en' ? "How much for 7 days?" : language === 'es' ? "¿Cuánto por 7 días?" : "Combien pour 7 jours ?")
    },
    {
      icon: Map,
      label: language === 'en' ? "📍 Best car for my trip" : language === 'es' ? "📍 Mejor coche para mi viaje" : "📍 Meilleure voiture pour mon voyage",
      action: () => setInputValue(language === 'en' ? "Which car for my trip?" : language === 'es' ? "¿Qué coche para mi viaje?" : "Quelle voiture pour mon voyage ?")
    }
  ];

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={handleOpen}
          className="fixed bottom-40 md:bottom-6 right-6 h-16 w-16 md:h-14 md:w-14 rounded-full shadow-lg hover:scale-110 transition-all duration-300 bg-primary hover:bg-primary/90 z-50 touch-target touch-feedback"
          aria-label={
            language === 'en' 
              ? "Open virtual assistant" 
              : language === 'es' 
              ? "Abrir asistente virtual" 
              : "Ouvrir l'assistant virtuel"
          }
        >
          <MessageSquare className="h-7 w-7 md:h-6 md:w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-96 h-screen sm:h-[600px] sm:max-h-[80vh] bg-background border-t sm:border border-border sm:rounded-lg shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg sm:rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">
                  {language === 'en' ? "Rental Assistant" : language === 'es' ? "Asistente de Alquiler" : "Assistant Location"}
                </h3>
                <p className="text-xs opacity-90">
                  {language === 'en' ? "Find your perfect car" : language === 'es' ? "Encuentra tu coche perfecto" : "Trouvez votre voiture idéale"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearMessages}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
                  aria-label={
                    language === 'en' 
                      ? "Clear conversation" 
                      : language === 'es' 
                      ? "Borrar conversación" 
                      : "Effacer la conversation"
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
                aria-label={
                  language === 'en' 
                    ? "Close assistant" 
                    : language === 'es' 
                    ? "Cerrar asistente" 
                    : "Fermer l'assistant"
                }
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-3">
                    👋 {language === 'en' 
                      ? "Hello! Ready to find your perfect car? Tell me about your trip and I'll help you choose the best vehicle!" 
                      : language === 'es'
                      ? "¡Hola! ¿Listo para encontrar tu coche perfecto? ¡Cuéntame sobre tu viaje y te ayudaré a elegir el mejor vehículo!"
                      : "Bonjour ! Prêt à trouver votre voiture idéale ? Parlez-moi de votre voyage et je vous aide à choisir le meilleur véhicule !"}
                  </p>
                </div>
                
                {/* Boutons d'action rapides */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    {language === 'en' ? "Quick actions:" : language === 'es' ? "Acciones rápidas:" : "Actions rapides :"}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.action}
                        className="flex items-center gap-2 text-left text-sm p-3 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20"
                      >
                        <action.icon className="h-4 w-4 text-primary" />
                        <span className="font-medium">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Questions fréquentes */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    {language === 'en' ? "Common questions:" : language === 'es' ? "Preguntas frecuentes:" : "Questions fréquentes :"}
                  </p>
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputValue(question);
                      }}
                      className="block w-full text-left text-sm p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex",
                      message.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-3 text-sm",
                        message.role === 'user'
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 text-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  language === 'en' 
                    ? "Ask your question..." 
                    : language === 'es' 
                    ? "Haz tu pregunta..." 
                    : "Posez votre question..."
                }
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                size="icon"
                aria-label={
                  language === 'en' 
                    ? "Send message" 
                    : language === 'es' 
                    ? "Enviar mensaje" 
                    : "Envoyer le message"
                }
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
