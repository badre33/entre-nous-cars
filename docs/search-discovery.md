# Search discovery

`node scripts/submit-indexnow.mjs` previews the public sitemap URLs. After a production release, `node scripts/submit-indexnow.mjs --submit` checks the live verification file and notifies IndexNow once. A 200 confirms receipt; a 202 means key verification is pending. Neither confirms indexing or an AI citation. This is a manual release step, not a scheduled job.

The verification file in `public/` is intentionally public and grants no access to the hosting account, database, or webmaster reports. Submit only canonical public pages listed in the sitemap. Keep excluded offers and private routes out of that sitemap.

The existing wildcard robots rule permits public content for Bingbot, OAI-SearchBot and PerplexityBot, while excluding API, admin, analytics and authentication routes. Adding a named bot group without repeating those exclusions could accidentally override the wildcard restrictions. Search eligibility and model-training preferences are separate; this change does not alter training preferences or firewall rules.

Keep the visible FAQ and structured data consistent: Casablanca first, Rabat on request, free delivery at served arrival points, classic tourist cars, 3 days to 6 calendar months, indicative prices and WhatsApp requests. Do not present sample models as guaranteed stock, sample reviews as genuine reviews, or request submissions as confirmed reservations.

IndexNow documentation: https://www.indexnow.org/documentation
OpenAI search crawler: https://developers.openai.com/api/docs/bots
Perplexity search crawler: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
Bing AI reporting: https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/
