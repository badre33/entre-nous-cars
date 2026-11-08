import { Link } from 'react-router-dom';
import { casablancaModelContent } from '@/data/casablancaModelContent';

export function RentalModelLinks({ exclude }: { exclude?: string }) {
  return <section aria-label="Comparer les modèles à Casablanca" className="space-y-4">
    <h2 className="text-2xl font-semibold">Comparer les modèles à Casablanca</h2>
    <p>Choisissez selon votre séjour, votre budget et vos bagages. Les modèles du catalogue sont à confirmer pour vos dates.</p>
    <div className="grid gap-4 sm:grid-cols-2">
      {Object.entries(casablancaModelContent).filter(([slug, model]) => slug !== exclude && model.compare !== false).map(([slug, model]) => <div key={slug} className="rounded-lg border p-4 space-y-2">
        <Link className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4" to={`/vehicule/${slug}`}>{model.name} à Casablanca</Link>
        <p>{model.summary}</p>
      </div>)}
    </div>
  </section>;
}
