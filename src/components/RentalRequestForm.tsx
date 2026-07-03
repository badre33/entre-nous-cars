import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, Car, Loader2 } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client"; // désactivé : lead traité en direct via WhatsApp
import { analytics } from "@/utils/analytics";

const CITIES = [
  "Casablanca",
  "Marrakech",
  "Rabat",
  "Tanger",
  "Agadir",
  "Fès",
  "Autre",
];

const formSchema = z.object({
  full_name: z.string().min(2, "Au moins 2 caractères").max(120),
  phone: z.string().min(8, "Numéro invalide").max(30),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  city: z.string().min(1, "Sélectionne une ville"),
  pickup_date: z.string().min(1, "Date de début requise"),
  return_date: z.string().min(1, "Date de fin requise"),
  message: z.string().max(800).optional().or(z.literal("")),
  rgpd: z.boolean().refine((v) => v === true, { message: "Tu dois accepter pour continuer" }),
}).refine((data) => new Date(data.return_date) >= new Date(data.pickup_date), {
  message: "La date de fin doit être après la date de début",
  path: ["return_date"],
});

type FormValues = z.infer<typeof formSchema>;

interface RentalRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleName?: string;
  vehicleSlug?: string;
  defaultCity?: string;
  whatsappNumber?: string;
}

export default function RentalRequestForm({
  open,
  onOpenChange,
  vehicleName,
  vehicleSlug,
  defaultCity,
  whatsappNumber = "212699024526",
}: RentalRequestFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      city: defaultCity || "",
      pickup_date: "",
      return_date: "",
      message: "",
      rgpd: true,
    },
  });

  const buildWhatsAppMessage = (data: FormValues): string => {
    const lines = [
      "Bonjour Benatna,",
      "",
      "Je souhaite louer une voiture :",
      "",
      `📋 Nom : ${data.full_name}`,
      `📱 WhatsApp : ${data.phone}`,
    ];
    if (data.email) lines.push(`📧 Email : ${data.email}`);
    lines.push(`🏙 Ville : ${data.city}`);
    lines.push(`📅 Du ${data.pickup_date} au ${data.return_date}`);
    if (vehicleName) lines.push(`🚗 Véhicule : ${vehicleName}`);
    if (data.message && data.message.trim()) {
      lines.push("");
      lines.push(data.message.trim());
    }
    lines.push("");
    lines.push("Merci !");
    return lines.join("\n");
  };

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      // Note : pas de stockage DB. Le lead qualifié arrive direct sur
      // WhatsApp Business + est tracké via GA4. Simple et sans dépendance.

      // Analytics events (GTM dataLayer + GA4)
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "rental_request_submitted",
          city: data.city,
          vehicle_name: vehicleName || null,
          vehicle_slug: vehicleSlug || null,
          page_path: location.pathname,
        });
      }
      analytics.trackEvent({
        eventType: "conversion",
        eventName: "rental_request_submitted",
        properties: {
          city: data.city,
          vehicle_name: vehicleName,
          vehicle_slug: vehicleSlug,
        },
      }).catch(() => {});

      // Open WhatsApp with structured message
      const message = buildWhatsAppMessage(data);
      const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");

      analytics.trackEvent({
        eventType: "engagement",
        eventName: "whatsapp_message_sent",
        properties: {
          message_length: message.length,
          source: "rental_request_form",
        },
      }).catch(() => {});

      toast.success("Demande envoyée ! WhatsApp s'ouvre…", {
        description: "Notre équipe te répond en 2 minutes.",
      });

      form.reset();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("Erreur réseau. Réessayez svp.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Demander un devis</DialogTitle>
          <DialogDescription>Réponse WhatsApp en 2 minutes</DialogDescription>
        </DialogHeader>

        {vehicleName && (
          <div className="rounded-md bg-primary/10 text-primary px-3 py-2 text-sm flex items-center gap-2">
            <Car className="h-4 w-4 flex-shrink-0" />
            <span>
              Véhicule : <strong>{vehicleName}</strong>
            </span>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet *</FormLabel>
                  <FormControl>
                    <Input placeholder="Mohamed Benali" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp *</FormLabel>
                    <FormControl>
                      <Input placeholder="+33 6 12 34 56 78" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (optionnel)</FormLabel>
                    <FormControl>
                      <Input placeholder="email@exemple.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville de prise en charge *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisis une ville" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CITIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="pickup_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date début *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="return_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date fin *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Préférences, livraison aéroport, conducteur additionnel, etc."
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rgpd"
              render={({ field }) => (
                <FormItem className="flex items-start gap-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" />
                  </FormControl>
                  <FormLabel className="text-xs text-muted-foreground font-normal cursor-pointer">
                    J'accepte que Benatna utilise mes données pour me recontacter (RGPD).
                  </FormLabel>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={submitting}>
              {submitting ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Envoi…</>
              ) : (
                <><MessageCircle className="h-4 w-4 mr-2" /> Envoyer ma demande</>
              )}
            </Button>

            <button
              type="button"
              onClick={() => {
                analytics.trackEvent({
                  eventType: "engagement",
                  eventName: "whatsapp_direct_click",
                  properties: { source: "rental_request_form_skip" },
                }).catch(() => {});
                window.open(`https://wa.me/${whatsappNumber}`, "_blank");
                onOpenChange(false);
              }}
              className="w-full text-xs text-muted-foreground hover:text-foreground py-2 transition-colors"
            >
              Continuer sans formulaire
            </button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
