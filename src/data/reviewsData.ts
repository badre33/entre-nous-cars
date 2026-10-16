/**
 * Données des avis clients pour Individual Reviews Schema
 * Reviews structurées pour améliorer le SEO et la confiance
 */

interface Review {
  author: string;
  rating: number;
  date: string;
  text: string;
  title?: string;
}

export const globalReviews: Review[] = [];

export const casablancaReviews: Review[] = globalReviews.slice(0, 10);
export const marrakechReviews: Review[] = globalReviews.slice(5, 15);
export const rabatReviews: Review[] = globalReviews.slice(10, 20);
export const tangerReviews: Review[] = globalReviews.slice(15, 25);
export const agadirReviews: Review[] = globalReviews.slice(20, 30);
export const fesReviews: Review[] = [];
