# Repères de reprise

Le [journal technique complet expurgé](historique-technique/STATUS.md) et [la stratégie commerciale](historique-technique/strategy-casablanca.json) sont désormais versionnés. Les états historiques sont datés ; la référence courante est [RELECTURE.json](2026-10-16/RELECTURE.json), complétée par le journal et les décisions.

Les PR #11 à #19 documentent les étapes techniques et commerciales précédentes. PR #20 fusionnée : ba09e90d2e674844065783534a62c12d640ab746. Les corrections de la relecture commencent avec les PR #21 (avis), #22 (statuts HTTP) et #23 (architecture des URL). Voir le suivi pour les commits et preuves de chaque étape.

Google Search Console : les six captures historiques de demandes/sitemap sont identifiées par leur empreinte dans `historique-technique/historical-gsc-manifest.json`. Leurs originaux restent localement privés parce qu’ils comportent un bandeau de compte personnel. Des captures et relevés actuels du 16 octobre, sans bandeau de compte, sont inclus. Ils ne constituent pas une preuve d’indexation finale : Google affiche encore 87 pages à la lecture du sitemap du 15 octobre et signale l’accueil non indexé avec une canonique choisie en www. Le sitemap public révisé comporte 73 URL ; le HTML brut actuel fournit une canonique sans www. Le test Google en direct du 16 octobre à 13:07 confirme l’accès, l’indexabilité technique et la canonique https://benatna.ma/ ; la sélection canonique finale reste à déterminer après indexation.

Bing : connexion autorisée, soumission du sitemap et relevé historique AI Performance conservés dans evidence/. IndexNow : réception HTTP202 documentée, indexation finale non démontrée. Aucun message ou campagne payante lancé.

Les anciens audits de racine sont archivés avec avertissement et empreintes, sans perte de contenu. Ils ne décrivent pas le périmètre actuel. Aucun secret, identifiant personnel ou donnée de visiteur n’a été copié dans ce dossier.
