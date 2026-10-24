# Liens publics — 24 octobre 2026

L’analyse des 99 pages du sitemap a recensé 2860 références internes vers 75 chemins distincts. Contrôle HTTP des 75 destinations : 72 répondent HTTP200, trois HTTP404, toutes liées depuis `/glossaire`.

| Source dans glossaryTerms.ts | Ancienne destination (404) | Destination existante |
|---|---|---|
| Ligne100 | /location-aeroport-casablanca | /location-voiture-aeroport-casablanca |
| Ligne217 | /location-electrique-casablanca | /location-voiture-electrique-casablanca |
| Ligne428 | /location-sans-carte-casablanca | /location-voiture-sans-carte-credit-casablanca |

Les liens sont corrigés à la source. Aucune nouvelle page ni redirection vers un contenu sans rapport créée. Les destinations correctes répondaient déjà HTTP200 avant correction.

## Prévention

`audit-internal-links.mjs` examine les ancres HTML des pages du sitemap, les destinations internes et leurs fragments. Il prend en compte les redirections exactes configurées et refuse les boucles/chaînes de plus de deux sauts. Il a bien échoué sur les trois liens avant correction. Ajouté à `prerender:safe` : un lien manquant bloque désormais ce contrôle du build. Mode `--base https://benatna.ma` disponible pour vérifier le HTML et les destinations par HTTP ; mode local `--dist dist` par défaut.

## Liens externes et limites

Cinq URL externes ont été recensées. Visitmorocco et la page Casablanca City des gares répondent HTTP200 ; Visitmorocco redirige vers /en. gov.ma et ONCF échouent dans le client automatisé, ONDA renvoie403. Une seconde vérification via l’outil web échoue également. Ce sont des contrôles non concluants, pas des preuves suffisantes de liens morts : aucun lien officiel n’est supprimé sur cette seule base.

Portée : liens présents dans le HTML rendu des99pages du sitemap. Les états accessibles seulement après interaction JavaScript, pages privées comme sources, backlinks et affirmations éditoriales ne sont pas audités par ce script. Les politiques d’anciennes villes ne sont pas changées. Aucun classement, trafic, lead ou gain SEO chiffré revendiqué. Preuves avant jointes ; contrôles après et publication consignés dans le suivi avant clôture.

Contrôle local après correction : 99 pages, 2860 références, 72 destinations uniques, aucune destination ni ancre manquante, aucune redirection interne détectée. Prérendu99/99, politique169routes et26/26fiches réussis. TypeScript, ESLint ciblé et build réussis. Voir controle-apres.json.
