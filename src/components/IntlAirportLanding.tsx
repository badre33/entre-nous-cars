import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { vehicleDetails } from '@/data/vehicleDetails';
import { airportAlternates, type IntlAirportContent } from '@/data/intlAirportPages';
import { requestRental } from '@/utils/rentalRequest';
import { vehicleImageSrcSet } from '@/utils/vehicleImages';

export function IntlAirportLanding({ content }: { content: IntlAirportContent }) {
  const url = `https://benatna.ma${content.path}`;
  const catalogueHref = `/${content.lang}/louer?city=Casablanca&pickup=cmn`;
  const whatsAppButton = <button type="button"
    onClick={() => requestRental({ city: 'Casablanca', pickupId: 'cmn' })}
    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3 font-semibold">
    <MessageCircle className="w-5 h-5" />{content.ctaWhatsApp}</button>;
  return <>
    <Helmet htmlAttributes={{ lang: content.lang }}>
      <title>{content.title}</title>
      <meta name="description" content={content.description} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="fr" href={`https://benatna.ma${airportAlternates.fr}`} />
      <link rel="alternate" hrefLang="en" href={`https://benatna.ma${airportAlternates.en}`} />
      <link rel="alternate" hrefLang="es" href={`https://benatna.ma${airportAlternates.es}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://benatna.ma${airportAlternates.fr}`} />
      <meta property="og:title" content={content.title} />
      <meta property="og:description" content={content.description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={content.title} />
      <meta name="twitter:description" content={content.description} />
      <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: content.lang, mainEntity: content.faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) })}</script>
    </Helmet>
    <Header />
    <main lang={content.lang} className="container max-w-5xl px-4 sm:px-6 py-8 md:py-16 space-y-8 md:space-y-10">
      <nav aria-label="Breadcrumb"><Link to={`/${content.lang}`}>Benatna</Link> / {content.breadcrumb}</nav>
      <section className="space-y-5">
        <h1 className="text-3xl md:text-5xl font-semibold">{content.heading}</h1>
        <p className="text-lg">{content.intro}</p>
        <p><strong>{content.minimum}</strong></p>
        <div className="flex flex-wrap gap-3">{whatsAppButton}<Link className="inline-flex min-h-12 items-center justify-center rounded-lg border px-4 py-3 font-semibold" to={catalogueHref}>{content.ctaCatalogue}</Link></div>
      </section>
      <section aria-label={content.pricesTitle} className="space-y-4">
        <h2 className="text-2xl font-semibold">{content.pricesTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-2">{content.models.map(model => ({ model, v: vehicleDetails[model.slug] })).filter(({ v }) => v).map(({ model, v }) => <Link key={v.slug} to={`/vehicule/${v.slug}`} className="rounded-lg border overflow-hidden flex gap-4 items-center p-3 hover:border-primary">
          <img src={v.photos[0]} srcSet={vehicleImageSrcSet(v.photos[0])} sizes="112px" alt={`${v.name} — Casablanca airport`} loading="lazy" decoding="async" width={120} height={80} className="w-28 h-20 object-cover rounded-md shrink-0" />
          <span className="min-w-0 flex-1"><span className="block font-semibold">{v.name}</span><span className="block text-sm text-muted-foreground">{model.label} · {v.options.seats}</span></span>
          <span className="text-right whitespace-nowrap"><span className="block text-xs text-muted-foreground">{content.from}</span><span className="text-lg font-bold text-primary">{v.priceFrom} MAD</span><span className="block text-xs">{content.perDay}</span></span>
        </Link>)}</div>
        <p className="text-sm text-muted-foreground">{content.pricesNote}</p>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{content.audienceTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">{content.audience.map(item => <div key={item.title} className="rounded-lg border p-4 space-y-2"><h3 className="font-semibold">{item.title}</h3><p>{item.text}</p></div>)}</div>
        <p className="text-sm">{content.exclusions}</p>
      </section>
      {content.sections.map(section => <section key={section.title} className="space-y-3"><h2 className="text-2xl font-semibold">{section.title}</h2><p>{section.text}</p></section>)}
      <section className="space-y-4"><h2 className="text-2xl font-semibold">{content.faqTitle}</h2>{content.faqs.map(faq => <div key={faq.question}><h3 className="font-semibold">{faq.question}</h3><p>{faq.answer}</p></div>)}</section>
      <section className="space-y-3">{whatsAppButton}</section>
    </main>
    <Footer />
  </>;
}
