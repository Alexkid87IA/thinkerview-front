import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, MessageSquare, Users, ChevronRight, ChevronDown, ThumbsUp, Compass, X, Flame, TrendingUp, Clock, Reply, CornerDownRight, Send } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { GALAXIES, PILLAR_COLORS } from '../data/galaxies';
import s from './ForumPage.module.css';

/* ── Mock citizens ── */

const C = {
  marineL:    { name: 'Marine L.',    since: '2023' },
  thomasR:    { name: 'Thomas R.',    since: '2024' },
  claireD:    { name: 'Claire D.',    since: '2022' },
  julienM:    { name: 'Julien M.',    since: '2024' },
  nadiaK:     { name: 'Nadia K.',     since: '2023' },
  ericB:      { name: 'Éric B.',      since: '2022' },
  sophieM:    { name: 'Sophie M.',    since: '2023' },
  antoineP:   { name: 'Antoine P.',   since: '2024' },
  yasminaH:   { name: 'Yasmina H.',   since: '2023' },
  lucasG:     { name: 'Lucas G.',     since: '2022' },
  isabelleF:  { name: 'Isabelle F.',  since: '2023' },
  mehdiA:     { name: 'Mehdi A.',     since: '2024' },
  paulineV:   { name: 'Pauline V.',   since: '2022' },
  francoisD:  { name: 'François D.',  since: '2023' },
  amandineR:  { name: 'Amandine R.',  since: '2024' },
  karimS:     { name: 'Karim S.',     since: '2023' },
  heleneC:    { name: 'Hélène C.',    since: '2022' },
  nicolasW:   { name: 'Nicolas W.',   since: '2024' },
};

interface Msg { author: typeof C.marineL; text: string; time: string; likes: number; replies?: number }
interface ThreadAI { summary: string; positions: { label: string; pct: number; text: string }[]; consensus: string; questions: string[]; sources: { type: string; title: string }[] }
interface Thread { title: string; galaxy: string; replies: number; participants: number; lastActivity: string; engagement: number; excerpt: string; messages: Msg[]; ai: ThreadAI }

/* ── Threads data ── */

const THREADS: Thread[] = [
  {
    title: 'Câbles sous-marins : pourquoi la France doit sécuriser ses artères numériques',
    galaxy: 'technologie', replies: 47, participants: 23, lastActivity: 'il y a 12 min', engagement: 85,
    excerpt: "La rupture du câble ACE au large de la Côte d'Ivoire pose la question de notre vulnérabilité numérique.",
    messages: [
      { author: C.lucasG, text: "La rupture du câble ACE montre qu'un seul incident peut couper l'accès internet de tout un pays. La France a 14 câbles transatlantiques. Que se passe-t-il si 3 sont coupés simultanément ?", time: 'il y a 4h', likes: 34, replies: 5 },
      { author: C.yasminaH, text: "C'est déjà arrivé. En 2008, la coupure de deux câbles en Méditerranée a réduit la bande passante de l'Égypte de 80%. On n'en a presque pas parlé.", time: 'il y a 3h48', likes: 28, replies: 2 },
      { author: C.antoineP, text: "Le vrai problème c'est que la majorité des câbles appartiennent à Google, Meta et Microsoft. La France n'a aucun levier sur l'infrastructure qu'elle utilise.", time: 'il y a 3h20', likes: 45, replies: 8 },
      { author: C.isabelleF, text: "Orange Marine est le 2ème câblier mondial. On a les compétences techniques. Ce qui manque c'est une stratégie nationale, pas des ingénieurs.", time: 'il y a 2h55', likes: 31, replies: 3 },
      { author: C.mehdiA, text: "J'ai travaillé chez Alcatel Submarine Networks. Le savoir-faire existe, mais les commandes viennent des GAFAM, pas de l'État. On construit les câbles des autres.", time: 'il y a 2h30', likes: 52, replies: 11 },
      { author: C.claireD, text: "Question concrète : est-ce que le programme SMART Cables de l'UE est suffisant ? 200 M€ c'est rien comparé aux investissements de Google.", time: 'il y a 2h10', likes: 18 },
      { author: C.nicolasW, text: "Il ne faut pas confondre sécurisation physique et souveraineté du routage. Même avec nos propres câbles, si le trafic est routé via des IX américains, on reste dépendants.", time: 'il y a 1h45', likes: 39, replies: 6 },
      { author: C.lucasG, text: "@Nicolas exactement. Le DNS, le BGP, les IX — c'est toute la pile qui doit être souveraine, pas juste le cuivre au fond de l'eau.", time: 'il y a 1h20', likes: 26 },
      { author: C.sophieM, text: "Pour ceux qui veulent creuser : le rapport du Sénat de 2023 « Sécuriser les câbles sous-marins » est excellent. 40 recommandations, 3 appliquées.", time: 'il y a 45 min', likes: 41, replies: 4 },
      { author: C.antoineP, text: "3 sur 40. Ça résume le niveau de prise de conscience politique sur le sujet.", time: 'il y a 12 min', likes: 22 },
    ],
    ai: {
      summary: "Le débat oppose deux visions : la sécurisation physique des infrastructures (câbles, atterrissements) et la souveraineté systémique (routage, DNS, points d'échange). Les participants convergent sur le diagnostic — dépendance critique aux GAFAM — mais divergent sur la réponse.",
      positions: [
        { label: 'Souveraineté industrielle', pct: 45, text: "La France possède le savoir-faire (Orange Marine, ASN) mais manque de commandes publiques. L'État doit investir dans ses propres câbles." },
        { label: 'Souveraineté systémique', pct: 35, text: "Les câbles ne suffisent pas. Sans maîtrise du routage BGP, du DNS et des IX, le contrôle reste illusoire." },
        { label: 'Approche européenne', pct: 20, text: "Le programme SMART Cables de l'UE est un début mais sous-financé. L'échelle pertinente est européenne, pas nationale." },
      ],
      consensus: "Unanimité sur le retard français : le rapport sénatorial de 2023 a produit 40 recommandations dont 3 appliquées. Le constat est partagé, l'action ne suit pas.",
      questions: ["Quel budget annuel pour un plan câbles souverain ?", "Faut-il nationaliser les atterrissements de câbles ?", "Quelle gouvernance pour les IX français ?"],
      sources: [{ type: 'Dossier', title: "Souveraineté numérique — Thinkerview" }, { type: 'Interview', title: "Jean-Marc Jancovici — Infrastructures critiques" }],
    },
  },
  {
    title: 'EPR2 Penly : le pari industriel français tient-il la route ?',
    galaxy: 'energie', replies: 89, participants: 41, lastActivity: 'il y a 23 min', engagement: 92,
    excerpt: 'Après les déboires de Flamanville, EDF relance la filière avec un calendrier ambitieux.',
    messages: [
      { author: C.francoisD, text: "Flamanville : 12 ans de retard, 19 Md€ au lieu de 3,3. Et maintenant on nous annonce 6 EPR2 pour 52 Md€ et une mise en service à partir de 2035. Qui y croit sérieusement ?", time: 'il y a 6h', likes: 56, replies: 7 },
      { author: C.heleneC, text: "La question n'est pas d'y croire ou non. La question c'est : quelle alternative pour produire 400 TWh/an en baseload décarboné ? Le renouvelable intermittent ne répond pas à cette question.", time: 'il y a 5h45', likes: 48, replies: 12 },
      { author: C.karimS, text: "L'EPR2 est une version simplifiée de l'EPR1. 30% de soudures en moins, bâtiment réacteur standardisé. EDF a appris de Flamanville, il faut être honnête là-dessus.", time: 'il y a 5h20', likes: 37, replies: 4 },
      { author: C.nadiaK, text: "« EDF a appris » — on nous dit ça à chaque projet. Hinkley Point C en Angleterre : même scénario, mêmes retards. Le problème est structurel, pas conjoncturel.", time: 'il y a 4h50', likes: 42, replies: 6 },
      { author: C.paulineV, text: "Ingénieure en génie civil nucléaire ici. Le problème de Flamanville c'était la perte de compétences après 15 ans sans construction. Penly bénéficiera de l'effet série. C'est un fait industriel, pas une opinion.", time: 'il y a 4h15', likes: 71, replies: 15 },
      { author: C.ericB, text: "@Pauline le « fait industriel » de l'effet série suppose un flux continu de commandes. Or le plan actuel prévoit 6 réacteurs en 2 tranches. C'est trop peu pour industrialiser.", time: 'il y a 3h40', likes: 29, replies: 3 },
      { author: C.thomasR, text: "Ce que personne ne mentionne : le financement. EDF est endetté à 65 Md€. Qui paie ? Le contribuable via la dette publique ou le consommateur via le prix du kWh ?", time: 'il y a 3h10', likes: 44, replies: 9 },
      { author: C.marineL, text: "Le coût du MWh nucléaire neuf (EPR2) est estimé à 70-80€. L'éolien offshore à 50-60€. Mais l'éolien nécessite du backup gaz. Le vrai calcul doit inclure le coût système.", time: 'il y a 2h30', likes: 53, replies: 7 },
      { author: C.karimS, text: "Exactement. Le LCOE seul est trompeur. RTE l'a montré dans Futurs Énergétiques 2050 : le scénario le moins cher est celui avec 50% de nucléaire.", time: 'il y a 1h15', likes: 38, replies: 2 },
      { author: C.francoisD, text: "Je note que personne n'a répondu à la question des délais. 2035 pour le premier EPR2, ça veut dire 2040 en vrai. Qui planifie la transition entre-temps ?", time: 'il y a 23 min', likes: 31 },
    ],
    ai: {
      summary: "Le débat cristallise la tension entre nécessité stratégique du nucléaire et doutes sur la capacité industrielle d'EDF. Les arguments techniques (effet série, perte de compétences) côtoient les enjeux financiers (dette EDF, coût système) et temporels (délais réalistes).",
      positions: [
        { label: 'Pro-EPR2 pragmatique', pct: 40, text: "L'EPR2 est techniquement simplifié, l'effet série jouera, et le nucléaire reste la seule baseload décarbonée à grande échelle." },
        { label: 'Sceptiques industriels', pct: 35, text: "Les précédents (Flamanville, Hinkley Point) montrent un problème structurel. Les délais et coûts seront probablement dépassés." },
        { label: 'Mix énergétique', pct: 25, text: "Le débat nucléaire vs. renouvelable est un faux dilemme. Le vrai sujet est le coût système global et le calendrier de transition." },
      ],
      consensus: "Accord général sur deux points : le LCOE seul est un indicateur insuffisant (le coût système compte), et la France a perdu des compétences industrielles nucléaires qu'il faudra reconstruire.",
      questions: ["Quel modèle de financement pour les EPR2 ?", "Le calendrier 2035 est-il réaliste ?", "Combien de réacteurs faut-il pour un vrai effet série ?"],
      sources: [{ type: 'Interview', title: "Jean-Marc Jancovici — Énergie et souveraineté" }, { type: 'Dossier', title: "Futurs Énergétiques 2050 — Décryptage" }],
    },
  },
  {
    title: 'Réforme du Conseil constitutionnel : vers une politisation assumée ?',
    galaxy: 'politique', replies: 34, participants: 18, lastActivity: 'il y a 45 min', engagement: 67,
    excerpt: "Les dernières nominations relancent le débat sur l'indépendance de l'institution.",
    messages: [
      { author: C.sophieM, text: "La nomination de X au Conseil constitutionnel pose un problème démocratique fondamental. Un ancien Premier ministre qui juge la constitutionnalité des lois qu'il a lui-même portées.", time: 'il y a 8h', likes: 38, replies: 4 },
      { author: C.julienM, text: "Rappelons que la France est le seul pays européen où les anciens présidents siègent de droit au Conseil constitutionnel. C'est une anomalie.", time: 'il y a 7h30', likes: 45, replies: 7 },
      { author: C.amandineR, text: "Le modèle allemand (Karlsruhe) repose sur des juges élus par le Parlement à la majorité des 2/3. Ça force le consensus transpartisan. Pourquoi pas en France ?", time: 'il y a 6h50', likes: 33, replies: 5 },
      { author: C.ericB, text: "Parce que la Ve République est construite sur la prééminence présidentielle. Le CC a été conçu comme un chien de garde du Parlement, pas comme un contre-pouvoir à l'exécutif.", time: 'il y a 6h15', likes: 51, replies: 9 },
      { author: C.claireD, text: "Depuis la QPC de 2010, le CC est devenu une quasi-cour suprême. Mais sa composition n'a pas suivi cette évolution. Le décalage est structurel.", time: 'il y a 5h40', likes: 29 },
      { author: C.marineL, text: "Le vrai scandale c'est l'absence de critères de compétence. On peut siéger au CC sans aucune formation juridique. C'est unique parmi les démocraties occidentales.", time: 'il y a 4h20', likes: 42, replies: 6 },
      { author: C.nicolasW, text: "À nuancer : plusieurs membres non-juristes ont eu un apport précieux (expertise économique, administrative). Le juridisme pur a aussi ses limites.", time: 'il y a 3h10', likes: 19 },
      { author: C.sophieM, text: "D'accord sur le principe, mais un minimum de formation juridique devrait être requis. On ne nomme pas un chirurgien sans diplôme de médecine.", time: 'il y a 45 min', likes: 36, replies: 3 },
    ],
    ai: {
      summary: "Le fil interroge la légitimité du Conseil constitutionnel à l'aune de sa composition et de son rôle élargi depuis la QPC. Le consensus se forme autour de la nécessité d'une réforme, mais les modalités divisent.",
      positions: [
        { label: 'Réforme radicale', pct: 50, text: "Alignement sur le modèle allemand : juges professionnels, élus par le Parlement à majorité qualifiée." },
        { label: 'Réforme incrémentale', pct: 35, text: "Supprimer les membres de droit, imposer des critères de compétence, allonger les mandats." },
        { label: 'Statu quo défendu', pct: 15, text: "La diversité des profils est une richesse. Le juridisme pur est une vision réductrice." },
      ],
      consensus: "Unanimité sur la suppression des membres de droit (anciens présidents) et sur la nécessité de critères minimaux de compétence.",
      questions: ["Faut-il une Constituante pour réformer le CC ?", "Le modèle Karlsruhe est-il transposable en France ?"],
      sources: [{ type: 'Article', title: "La Ve République à bout de souffle ?" }],
    },
  },
  {
    title: 'BRICS+ : la dédollarisation est-elle un fantasme ?',
    galaxy: 'economie', replies: 56, participants: 29, lastActivity: 'il y a 1h', engagement: 78,
    excerpt: "Le sommet de Kazan a relancé les discussions sur une alternative au dollar.",
    messages: [
      { author: C.thomasR, text: "Chiffres clés : le dollar représente encore 59% des réserves mondiales et 88% des transactions forex. Parler de dédollarisation à court terme est une illusion.", time: 'il y a 12h', likes: 43, replies: 6 },
      { author: C.mehdiA, text: "À court terme oui. Mais la tendance est claire : en 2000 c'était 71% des réserves. -12 points en 23 ans. Le mouvement est lent mais réel.", time: 'il y a 11h30', likes: 38, replies: 3 },
      { author: C.isabelleF, text: "Le vrai sujet n'est pas le dollar en soi mais le système SWIFT. Quand les US ont coupé l'Iran puis la Russie de SWIFT, ils ont démontré que le dollar est une arme géopolitique.", time: 'il y a 10h45', likes: 56, replies: 14 },
      { author: C.karimS, text: "C'est exactement pour ça que la Chine développe le CIPS et que les BRICS travaillent sur mBridge. La diversification n'est pas idéologique, elle est sécuritaire.", time: 'il y a 9h20', likes: 41, replies: 5 },
      { author: C.francoisD, text: "Sauf que les alternatives BRICS souffrent d'un problème fondamental : aucune monnaie BRICS n'est librement convertible. Le yuan est contrôlé par la PBoC.", time: 'il y a 8h10', likes: 47, replies: 8 },
      { author: C.heleneC, text: "La convertibilité est un choix, pas une incapacité. La Chine ne veut pas d'un yuan flottant parce que ça donnerait aux marchés un pouvoir sur sa politique monétaire.", time: 'il y a 7h', likes: 35, replies: 2 },
      { author: C.paulineV, text: "On oublie l'or. Les banques centrales des BRICS achètent massivement de l'or depuis 2022. C'est une dédollarisation silencieuse par les réserves.", time: 'il y a 5h30', likes: 49, replies: 7 },
      { author: C.antoineP, text: "Les achats d'or chinois et indiens sont documentés. +1 136 tonnes en 2023 pour les banques centrales mondiales. Record absolu.", time: 'il y a 4h15', likes: 32 },
      { author: C.thomasR, text: "Mais les échanges commerciaux restent massivement en dollars. L'Inde paie son pétrole saoudien en dollars, pas en roupies. La réalité commerciale résiste au discours politique.", time: 'il y a 2h40', likes: 28, replies: 4 },
      { author: C.mehdiA, text: "L'Inde a commencé à payer en roupies pour le pétrole russe. L'Arabie Saoudite accepte le yuan. Ce sont des brèches, pas encore un effondrement, mais la direction est claire.", time: 'il y a 1h', likes: 37 },
    ],
    ai: {
      summary: "Le débat distingue trois temporalités : court terme (domination incontestée du dollar), moyen terme (diversification par les réserves et les systèmes de paiement), long terme (architecture monétaire multipolaire). La tendance est réelle mais le rythme fait débat.",
      positions: [
        { label: 'Dollar résilient', pct: 35, text: "Les fondamentaux (liquidité, convertibilité, profondeur des marchés US) rendent le dollar irremplaçable à horizon 10-15 ans." },
        { label: 'Transition en cours', pct: 45, text: "La dédollarisation est un processus lent mais mesurable : réserves, systèmes de paiement alternatifs, accords bilatéraux en monnaies locales." },
        { label: 'Accélération géopolitique', pct: 20, text: "L'arme SWIFT a changé la donne. La diversification est désormais une question de sécurité nationale pour les non-alignés." },
      ],
      consensus: "Accord sur le fait que l'utilisation de SWIFT comme arme géopolitique a accéléré la recherche d'alternatives. Le dollar reste dominant mais la trajectoire est descendante.",
      questions: ["Le yuan peut-il devenir convertible sans changer de modèle politique ?", "Quel rôle pour l'euro dans un monde multidevises ?"],
      sources: [{ type: 'Article', title: "SWIFT : l'arme financière de l'Occident" }, { type: 'Interview', title: "Jacques Sapir — Monnaies et souveraineté" }],
    },
  },
  {
    title: 'Wagner au Sahel : recomposition ou chaos ?',
    galaxy: 'geopolitique', replies: 71, participants: 35, lastActivity: 'il y a 2h', engagement: 88,
    excerpt: 'Le redéploiement des forces russes en Afrique redessine les équilibres.',
    messages: [
      { author: C.claireD, text: "Le retrait de Barkhane a laissé un vide que la Russie a comblé en moins de 18 mois. Mali, Burkina, Niger — la bascule est géopolitique, pas seulement sécuritaire.", time: 'il y a 18h', likes: 52, replies: 8 },
      { author: C.karimS, text: "Attention au récit simpliste « France part, Russie arrive ». Les juntes sahéliennes ont choisi Wagner par pragmatisme : pas de conditionnalité démocratique, pas de leçons de morale.", time: 'il y a 17h', likes: 61, replies: 13 },
      { author: C.ericB, text: "Le « pragmatisme » de Wagner c'est aussi des exactions documentées par l'ONU. À Moura (Mali), 300+ civils exécutés en mars 2022. C'est le prix du pragmatisme ?", time: 'il y a 16h', likes: 44, replies: 9 },
      { author: C.yasminaH, text: "Sans excuser quoi que ce soit : les exactions de l'armée française au Sahel existent aussi (frappes de Bounti, 2021). La différence, c'est que Paris s'en excuse et Moscou l'assume.", time: 'il y a 14h30', likes: 38, replies: 5 },
      { author: C.julienM, text: "Le vrai sujet est économique. Wagner ne travaille pas gratuitement : mines d'or au Soudan, uranium au Niger, bois en Centrafrique. C'est une entreprise extractive avec une armée.", time: 'il y a 12h', likes: 57, replies: 10 },
      { author: C.francoisD, text: "Post-Prigojine, Wagner est devenu Africa Corps sous contrôle direct du MoD russe. La privatisation est terminée. C'est de la projection militaire étatique maintenant.", time: 'il y a 10h', likes: 42, replies: 3 },
      { author: C.marineL, text: "Ce qui m'inquiète c'est l'absence totale de stratégie française. On est parti du Sahel sans plan B. L'influence culturelle (francophonie, formation des élites) s'effondre aussi.", time: 'il y a 8h', likes: 35, replies: 6 },
      { author: C.lucasG, text: "La francophonie comme outil d'influence, c'est exactement ce que les populations sahéliennes rejettent. C'est perçu comme du néocolonialisme soft. Il faut l'entendre.", time: 'il y a 5h', likes: 48, replies: 11 },
      { author: C.claireD, text: "Alors quoi ? On abandonne 200 millions de francophones africains à la propagande RT ? Le soft power n'est pas du néocolonialisme si il est mutuellement bénéfique.", time: 'il y a 3h', likes: 29, replies: 4 },
      { author: C.karimS, text: "La question n'est pas d'abandonner mais de repenser. Moins d'interventionnisme militaire, plus de coopération économique égalitaire. Le modèle turc fonctionne : commerce, drones, pas de bases.", time: 'il y a 2h', likes: 40, replies: 7 },
    ],
    ai: {
      summary: "Le fil met en lumière l'échec de la stratégie française au Sahel et la montée russe, tout en refusant les grilles de lecture simplistes. Le débat progresse vers une réflexion sur les modèles alternatifs de coopération (turc, émirati).",
      positions: [
        { label: 'Réalisme critique', pct: 40, text: "La France a échoué au Sahel par excès d'interventionnisme et manque de compréhension des dynamiques locales. Un repositionnement est nécessaire." },
        { label: 'Souverainisme africain', pct: 35, text: "Les pays sahéliens ont le droit de choisir leurs partenaires. Le rejet de la France est politique avant d'être sécuritaire." },
        { label: 'Alerte sécuritaire', pct: 25, text: "Wagner/Africa Corps aggrave l'insécurité civile. Les exactions documentées montrent que le « pragmatisme » a un coût humain." },
      ],
      consensus: "Accord sur le fait que le modèle Barkhane a échoué et qu'un nouveau paradigme de coopération est nécessaire. Divergence sur la nature de ce paradigme.",
      questions: ["Le modèle turc est-il transposable pour la France ?", "Quel avenir pour la MINUSMA et les missions onusiennes au Sahel ?"],
      sources: [{ type: 'Dossier', title: "Sahel — La recomposition" }, { type: 'Interview', title: "Général Lecointre — Retour sur Barkhane" }],
    },
  },
  {
    title: 'Souveraineté alimentaire : la France peut-elle se nourrir seule ?',
    galaxy: 'souverainete', replies: 28, participants: 15, lastActivity: 'il y a 3h', engagement: 55,
    excerpt: "Le rapport du Sénat sur l'autonomie alimentaire révèle des failles structurelles.",
    messages: [
      { author: C.paulineV, text: "Données de base : la France exporte plus de calories qu'elle n'en importe. Techniquement, on peut se nourrir. Mais 40% de nos fruits et 25% de nos légumes sont importés.", time: 'il y a 14h', likes: 37, replies: 5 },
      { author: C.amandineR, text: "Le problème n'est pas la capacité mais la diversité. On exporte du blé et on importe des tomates. En cas de crise, on mangerait du pain sec pendant 6 mois.", time: 'il y a 13h', likes: 44, replies: 8 },
      { author: C.nicolasW, text: "Et les intrants ! 60% des engrais azotés sont importés, principalement de Russie et du Maghreb. Sans engrais, les rendements chutent de 40% en 2 ans.", time: 'il y a 11h30', likes: 39, replies: 4 },
      { author: C.heleneC, text: "L'agriculture bio résout partiellement la dépendance aux engrais mais pose un problème de rendement. À surface égale, le bio produit 20-30% de moins.", time: 'il y a 10h', likes: 26, replies: 6 },
      { author: C.thomasR, text: "Le bio n'est pas la seule alternative aux engrais de synthèse. L'agriculture de conservation, la permaculture, les légumineuses fixatrices d'azote — il existe un spectre de solutions.", time: 'il y a 8h45', likes: 33, replies: 3 },
      { author: C.isabelleF, text: "On oublie l'eau. Le changement climatique va réduire les rendements dans le Sud-Ouest de 15-20% d'ici 2050. La souveraineté alimentaire dépend aussi du climat.", time: 'il y a 6h20', likes: 41, replies: 7 },
      { author: C.antoineP, text: "Et la main-d'œuvre. 200 000 saisonniers étrangers chaque année pour les récoltes. Qui ramasse les fraises si les frontières ferment ?", time: 'il y a 4h30', likes: 28 },
      { author: C.paulineV, text: "Le vrai levier c'est le foncier. La France perd 50 000 hectares de terres agricoles par an au profit de l'urbanisation. C'est irréversible. À ce rythme, dans 30 ans…", time: 'il y a 3h', likes: 46, replies: 9 },
    ],
    ai: {
      summary: "Le débat révèle que la souveraineté alimentaire française est théorique (excédent calorique) mais fragile en pratique (dépendance aux intrants, perte de diversité, érosion du foncier, vulnérabilité climatique).",
      positions: [
        { label: 'Souveraineté possible', pct: 30, text: "La France a les surfaces et le savoir-faire. Il faut réorienter la PAC vers l'autonomie plutôt que l'export." },
        { label: 'Fragilité structurelle', pct: 50, text: "Les dépendances (engrais, semences, main-d'œuvre, eau) rendent l'autosuffisance illusoire sans transformation profonde du modèle." },
        { label: 'Approche systémique', pct: 20, text: "Le sujet dépasse l'agriculture : foncier, climat, démographie, modèle alimentaire (moins de viande = moins de surfaces nécessaires)." },
      ],
      consensus: "Consensus sur l'urgence de stopper l'artificialisation des terres agricoles (loi ZAN jugée insuffisante) et de réduire la dépendance aux engrais importés.",
      questions: ["La PAC peut-elle être réorientée vers la souveraineté ?", "Quel modèle alimentaire pour 70 millions de Français en 2050 ?"],
      sources: [{ type: 'Article', title: "Le grenier à blé se vide" }],
    },
  },
  {
    title: "L'IA générative va-t-elle remplacer les journalistes ?",
    galaxy: 'technologie', replies: 63, participants: 32, lastActivity: 'il y a 35 min', engagement: 81,
    excerpt: "Entre rédaction automatisée et deep fakes, le journalisme fait face à une mutation existentielle.",
    messages: [
      { author: C.lucasG, text: "Le Washington Post utilise déjà Heliograf pour les brèves sportives et électorales. 850 articles générés en un an. Aucun journaliste licencié — ils couvrent d'autres sujets.", time: 'il y a 8h', likes: 34 },
      { author: C.sophieM, text: "Le problème n'est pas la génération de texte, c'est l'investigation. L'IA ne va pas infiltrer un réseau mafieux ou protéger une source. Le journalisme de terrain est irremplaçable.", time: 'il y a 7h20', likes: 52 },
      { author: C.antoineP, text: "Sauf que 80% du journalisme actuel n'est PAS de l'investigation. C'est de la réécriture de dépêches AFP, du résumé de rapports, de l'agrégation. Ça, l'IA le fait déjà mieux.", time: 'il y a 6h', likes: 47 },
      { author: C.nadiaK, text: "Le vrai danger c'est le modèle économique. Si l'IA produit du contenu gratuit, qui paie les abonnements ? Et sans revenus, pas d'investigation.", time: 'il y a 5h15', likes: 41 },
      { author: C.mehdiA, text: "C'est pour ça que Thinkerview existe. Le modèle financé par les citoyens est le seul qui survit quand le contenu est commoditisé.", time: 'il y a 4h', likes: 38 },
      { author: C.claireD, text: "Attention au biais de survie. Pour chaque Thinkerview, 100 médias indépendants ont fermé. Le modèle citoyen fonctionne pour quelques-uns, pas pour un écosystème.", time: 'il y a 3h', likes: 29 },
      { author: C.isabelleF, text: "Point technique : les LLM hallucinent. GPT-4 invente des citations, des chiffres, des sources. En journalisme, une hallucination c'est une diffamation potentielle.", time: 'il y a 2h', likes: 55 },
      { author: C.karimS, text: "L'IA n'a pas besoin d'être parfaite, elle a besoin d'être meilleure que le stagiaire qui réécrit les dépêches à 2h du matin. Et elle l'est déjà.", time: 'il y a 35 min', likes: 23 },
    ],
    ai: {
      summary: "Le débat distingue le journalisme de flux (automatisable) du journalisme d'investigation (irremplaçable). La menace principale n'est pas technique mais économique : l'IA commoditise le contenu et fragilise les modèles de revenus.",
      positions: [
        { label: 'Complémentarité', pct: 45, text: "L'IA libère les journalistes des tâches routinières pour se concentrer sur l'investigation et l'analyse." },
        { label: 'Menace systémique', pct: 35, text: "La destruction du modèle économique de la presse par le contenu gratuit IA menace tout l'écosystème, y compris l'investigation." },
        { label: 'Mutation inévitable', pct: 20, text: "Le journalisme va se transformer comme la photographie avec le numérique : moins de professionnels, plus de qualité au sommet." },
      ],
      consensus: "Accord sur le fait que le journalisme d'investigation reste irremplaçable par l'IA et que le vrai enjeu est le financement.",
      questions: ["Faut-il réglementer l'utilisation de l'IA dans les rédactions ?", "Le modèle citoyen est-il scalable ?"],
      sources: [{ type: 'Interview', title: "Julia Cagé — Sauver les médias" }],
    },
  },
  {
    title: 'Réindustrialisation : le plan France 2030 est-il crédible ?',
    galaxy: 'economie', replies: 41, participants: 22, lastActivity: 'il y a 1h30', engagement: 71,
    excerpt: "54 milliards promis, mais les premiers bilans sont mitigés.",
    messages: [
      { author: C.francoisD, text: "54 Md€ annoncés, 15 Md€ décaissés en 3 ans. Le rythme est trop lent. Les usines chinoises de batteries se construisent en 18 mois, les nôtres en 5 ans.", time: 'il y a 10h', likes: 42 },
      { author: C.heleneC, text: "Le problème n'est pas l'argent, c'est la bureaucratie. Il faut 17 mois pour obtenir une autorisation d'exploiter en France. 4 mois en Allemagne.", time: 'il y a 9h', likes: 56 },
      { author: C.thomasR, text: "Et le foncier ? La loi ZAN interdit l'artificialisation. Comment construire des usines sans terrain ? On demande aux industriels de produire sur des terres dépolluées.", time: 'il y a 7h30', likes: 33 },
      { author: C.paulineV, text: "Les gigafactories de batteries (ACC à Douvrin, Verkor à Dunkerque) avancent. C'est lent, mais ça avance. Le déclinisme ambiant est aussi un frein à l'action.", time: 'il y a 6h', likes: 38 },
      { author: C.ericB, text: "ACC c'est Stellantis + TotalEnergies + Mercedes. C'est de l'assemblage, pas de la R&D. Les cellules sont conçues en Asie. On est intégrateur, pas innovateur.", time: 'il y a 4h30', likes: 45 },
      { author: C.julienM, text: "La France a choisi le nucléaire dans les années 70 avec un plan Messmer volontariste. France 2030, c'est un saupoudrage sur 50 secteurs. Il faudrait concentrer sur 5.", time: 'il y a 3h', likes: 51 },
      { author: C.amandineR, text: "L'IRA américain met 369 Md$ sur l'énergie seule. Notre réponse : 54 Md€ sur tout. On joue pas dans la même ligue.", time: 'il y a 1h30', likes: 39 },
    ],
    ai: {
      summary: "Le plan France 2030 est jugé insuffisant en volume et trop dispersé en cibles. Les freins identifiés sont bureaucratiques (délais d'autorisation), fonciers (loi ZAN) et stratégiques (saupoudrage vs. concentration).",
      positions: [
        { label: 'Trop peu, trop dispersé', pct: 55, text: "54 Md€ sur 50 secteurs = saupoudrage. Il faut concentrer sur 5 filières stratégiques avec un plan Messmer moderne." },
        { label: 'Direction correcte', pct: 25, text: "Les projets avancent (ACC, Verkor). Le pessimisme ambiant est un frein autant que la bureaucratie." },
        { label: 'Problème structurel', pct: 20, text: "Sans réforme du code minier, des délais d'autorisation et du foncier, aucun plan ne peut réussir." },
      ],
      consensus: "Les délais d'autorisation (17 mois vs. 4 en Allemagne) sont identifiés comme le frein principal par tous les participants.",
      questions: ["Quels 5 secteurs concentrer ?", "Faut-il une loi d'exception industrielle ?"],
      sources: [{ type: 'Dossier', title: "France 2030 — Bilan d'étape" }],
    },
  },
  {
    title: 'Eau : la guerre silencieuse qui vient',
    galaxy: 'energie', replies: 52, participants: 27, lastActivity: 'il y a 4h', engagement: 74,
    excerpt: "Méga-bassines, nappes phréatiques au plus bas : la France face au stress hydrique.",
    messages: [
      { author: C.amandineR, text: "68 départements en restriction d'eau en 2023. Record absolu. Et 2024 s'annonce pire. On parle de « stress hydrique » comme si c'était abstrait — c'est du concret.", time: 'il y a 18h', likes: 47 },
      { author: C.nicolasW, text: "Le problème c'est l'agriculture : 48% de la consommation d'eau en été. Le modèle d'irrigation intensive par aspersion perd 40% par évaporation.", time: 'il y a 16h', likes: 39 },
      { author: C.ericB, text: "Les méga-bassines sont une fausse solution. Stocker l'eau d'hiver pour arroser du maïs en été, c'est maintenir un modèle condamné au lieu de l'adapter.", time: 'il y a 14h', likes: 53 },
      { author: C.isabelleF, text: "Contre-point : Israël irrigue 90% de ses terres en goutte-à-goutte. Le problème n'est pas l'irrigation, c'est la technique. La France est en retard de 30 ans.", time: 'il y a 12h', likes: 44 },
      { author: C.heleneC, text: "Le modèle israélien suppose un investissement massif et une gestion centralisée de l'eau. En France, la compétence est éclatée entre communes, syndicats, agences de bassin.", time: 'il y a 10h', likes: 35 },
      { author: C.francoisD, text: "Chiffre clé : 20% de l'eau potable est perdue dans des fuites de canalisations. Avant de construire des bassines, on pourrait réparer les tuyaux.", time: 'il y a 8h', likes: 58 },
      { author: C.marineL, text: "Les réseaux d'eau ont un taux de renouvellement de 0.6%/an. À ce rythme, il faut 160 ans pour les remettre à neuf. Le sous-investissement est chronique.", time: 'il y a 6h', likes: 41 },
      { author: C.karimS, text: "Et pendant ce temps, Veolia et Suez font des profits records. La privatisation de l'eau est-elle compatible avec sa raréfaction ?", time: 'il y a 4h', likes: 49 },
    ],
    ai: {
      summary: "Le débat converge sur un constat : la France gère son eau avec des infrastructures vétustes et un modèle agricole inadapté au changement climatique. Les solutions divergent entre adaptation technique et transformation systémique.",
      positions: [
        { label: 'Modernisation technique', pct: 35, text: "Goutte-à-goutte, réparation des réseaux, recyclage des eaux usées. Les solutions existent, il faut investir." },
        { label: 'Changement de modèle', pct: 45, text: "L'agriculture intensive irriguée est condamnée. Il faut des cultures adaptées au climat, pas des méga-bassines." },
        { label: 'Gouvernance de l\'eau', pct: 20, text: "Le problème est institutionnel : compétences éclatées, privatisation contestée, sous-investissement chronique." },
      ],
      consensus: "Unanimité sur la priorité de réparer les réseaux (20% de fuites) avant de construire de nouvelles infrastructures de stockage.",
      questions: ["L'eau doit-elle rester un bien commun géré par le public ?", "Quelles cultures pour une agriculture sans irrigation ?"],
      sources: [{ type: 'Article', title: "Stress hydrique — La France en alerte" }],
    },
  },
  {
    title: 'Servicisation de l\'économie : la fin de la propriété ?',
    galaxy: 'economie', replies: 33, participants: 19, lastActivity: 'il y a 5h', engagement: 60,
    excerpt: "De Spotify à la voiture en leasing, tout devient abonnement. Progrès ou piège ?",
    messages: [
      { author: C.julienM, text: "En 2010, un ménage français avait 3 abonnements en moyenne. En 2024, c'est 12. Netflix, Spotify, cloud, assurance, voiture, vélo, même les logiciels. On ne possède plus rien.", time: 'il y a 15h', likes: 43 },
      { author: C.sophieM, text: "C'est le « You will own nothing and be happy » du WEF qui se réalise. Sauf qu'on n'est pas heureux, on est captifs.", time: 'il y a 13h', likes: 51 },
      { author: C.antoineP, text: "Nuance : le leasing automobile évite l'obsolescence programmée. Le constructeur a intérêt à faire durer le véhicule puisqu'il reste propriétaire.", time: 'il y a 11h', likes: 28 },
      { author: C.nadiaK, text: "Sauf que BMW fait payer 18€/mois pour activer les sièges chauffants déjà installés dans la voiture. C'est de la rent-seeking, pas du progrès.", time: 'il y a 9h30', likes: 62 },
      { author: C.mehdiA, text: "Le modèle SaaS a un avantage : les mises à jour continues. Photoshop en achat unique = 2 ans de support. En abo = support continu.", time: 'il y a 7h', likes: 22 },
      { author: C.paulineV, text: "Et si le service ferme ? Google a tué 250+ produits. Vos photos sur Picasa, vos docs sur Google Wave — disparus. La propriété, au moins, ça ne disparaît pas.", time: 'il y a 5h', likes: 46 },
    ],
    ai: {
      summary: "La servicisation divise entre partisans de l'usage (flexibilité, mise à jour, écologie) et défenseurs de la propriété (autonomie, pérennité, résistance à la captivité).",
      positions: [
        { label: 'Captivité organisée', pct: 55, text: "La servicisation est une stratégie de rent-seeking qui précarise le consommateur et détruit le droit de propriété." },
        { label: 'Progrès sous conditions', pct: 30, text: "L'usage plutôt que la propriété a des vertus (écologie, accessibilité) si encadré par la régulation." },
        { label: 'Transition inévitable', pct: 15, text: "Le modèle par abonnement s'impose par efficacité économique. Il faut l'accompagner, pas le combattre." },
      ],
      consensus: "Accord sur la nécessité de réguler les pratiques abusives (fonctionnalités bloquées dans un produit déjà payé).",
      questions: ["Faut-il un droit constitutionnel à la propriété numérique ?", "Le modèle open-source est-il une alternative crédible ?"],
      sources: [{ type: 'Interview', title: "Evgeny Morozov — Critique du solutionnisme" }],
    },
  },
  {
    title: 'Ingérence étrangère dans les élections : fantasme ou réalité ?',
    galaxy: 'politique', replies: 45, participants: 24, lastActivity: 'il y a 6h', engagement: 72,
    excerpt: "VIGINUM, Macron Leaks, réseaux de bots — l'état de la menace informationnelle.",
    messages: [
      { author: C.thomasR, text: "VIGINUM a détecté 193 opérations d'ingérence numérique en 2023. La plupart viennent de Russie, Chine et Turquie. Ce n'est pas un fantasme, c'est documenté.", time: 'il y a 20h', likes: 44 },
      { author: C.claireD, text: "Attention à ne pas tout mettre dans le même sac. Les Macron Leaks de 2017 c'est du hacking (GRU). Les fermes de trolls c'est de l'influence. Les deepfakes c'est de la manipulation. Trois menaces différentes.", time: 'il y a 18h', likes: 52 },
      { author: C.karimS, text: "Le risque c'est aussi l'instrumentalisation. Dès qu'un mouvement social émerge (Gilets jaunes), on crie à l'ingérence russe. C'est une façon commode de délégitimer la contestation.", time: 'il y a 15h', likes: 48 },
      { author: C.yasminaH, text: "Les deux peuvent être vrais simultanément. Les Gilets jaunes étaient un mouvement authentique ET RT France l'a amplifié. La manipulation n'invalide pas la colère.", time: 'il y a 12h', likes: 55 },
      { author: C.julienM, text: "Le problème fondamental : comment distinguer ingérence et débat ? Si un citoyen français partage un article de RT, est-ce de l'ingérence ou de la liberté d'expression ?", time: 'il y a 10h', likes: 36 },
      { author: C.marineL, text: "La loi contre les fake news de 2018 est quasi inapplicable. 0 condamnation en 6 ans. On légifère pour l'affichage sans se donner les moyens de l'application.", time: 'il y a 8h', likes: 40 },
      { author: C.nicolasW, text: "Le meilleur rempart c'est l'éducation aux médias. Un citoyen qui sait analyser une source est immunisé contre la désinformation. Mais ça ne se fait pas en un mandat.", time: 'il y a 6h', likes: 43 },
    ],
    ai: {
      summary: "Le fil distingue trois niveaux de menace (hacking, influence, manipulation) et met en garde contre l'instrumentalisation du concept d'ingérence pour délégitimer la contestation sociale.",
      positions: [
        { label: 'Menace réelle', pct: 45, text: "L'ingérence est documentée et quantifiée. La France doit renforcer ses défenses informationnelles." },
        { label: 'Risque d\'instrumentalisation', pct: 35, text: "Le concept d'ingérence est parfois instrumentalisé pour délégitimer les mouvements sociaux ou la dissidence." },
        { label: 'Éducation d\'abord', pct: 20, text: "La meilleure défense est un citoyen éduqué aux médias, pas des lois censées filtrer la vérité." },
      ],
      consensus: "Accord sur l'échec de la loi anti-fake news (0 condamnation) et sur la priorité de l'éducation aux médias.",
      questions: ["VIGINUM doit-il rendre ses rapports publics ?", "Comment distinguer ingérence et liberté d'expression ?"],
      sources: [{ type: 'Interview', title: "David Colon — La guerre de l'information" }, { type: 'Dossier', title: "Ingérences — Cartographie des menaces" }],
    },
  },
  {
    title: 'Afrique francophone : décoloniser la relation ou perdre le continent ?',
    galaxy: 'souverainete', replies: 38, participants: 21, lastActivity: 'il y a 7h', engagement: 65,
    excerpt: "Le sentiment anti-français s'étend au-delà du Sahel. Quelles réponses ?",
    messages: [
      { author: C.karimS, text: "Le Franc CFA reste le symbole le plus toxique. 14 pays dont la monnaie est imprimée en France, dont les réserves sont déposées au Trésor français. En 2024, c'est indéfendable.", time: 'il y a 24h', likes: 58 },
      { author: C.yasminaH, text: "La réforme ECO de 2019 devait changer ça. 5 ans plus tard, rien n'a bougé. La France a accepté le changement de nom mais pas le changement de substance.", time: 'il y a 22h', likes: 42 },
      { author: C.ericB, text: "Le CFA garantit la stabilité monétaire. Les pays qui en sont sortis (Mauritanie, Guinée) n'ont pas mieux réussi. L'argument souverainiste ignore la réalité économique.", time: 'il y a 19h', likes: 31 },
      { author: C.francoisD, text: "La stabilité au prix de la souveraineté, c'est le deal colonial. Le FMI l'a dit : le CFA bride la croissance en empêchant la dévaluation compétitive.", time: 'il y a 16h', likes: 47 },
      { author: C.amandineR, text: "Au-delà du CFA : les bases militaires. La France a 7 bases permanentes en Afrique. Quel pays européen tolérerait des bases africaines sur son sol ?", time: 'il y a 13h', likes: 53 },
      { author: C.lucasG, text: "La Turquie a une base à Mogadiscio, les EAU à Assab. La présence militaire étrangère en Afrique n'est pas qu'un problème français. La Chine a Djibouti.", time: 'il y a 10h', likes: 28 },
      { author: C.sophieM, text: "La différence c'est l'histoire. La France colonisait ces pays il y a 60 ans. Le ressenti n'est pas le même qu'envers la Turquie ou la Chine.", time: 'il y a 7h', likes: 44 },
    ],
    ai: {
      summary: "Le débat cristallise autour du Franc CFA et de la présence militaire comme symboles d'une relation inégalitaire. Le clivage oppose les partisans d'une réforme rapide aux défenseurs d'un pragmatisme économique.",
      positions: [
        { label: 'Rupture nécessaire', pct: 50, text: "La France doit abandonner le CFA, fermer les bases, et proposer un partenariat d'égal à égal sous peine de perdre toute influence." },
        { label: 'Réforme progressive', pct: 30, text: "Une sortie brutale du CFA déstabiliserait les économies. Il faut une transition sur 10 ans avec transfert de compétences." },
        { label: 'Pragmatisme', pct: 20, text: "Le CFA apporte une stabilité réelle. Les pays qui l'ont quitté n'ont pas connu de miracle économique." },
      ],
      consensus: "Accord sur le fait que le statu quo est intenable politiquement, même si le calendrier de sortie divise.",
      questions: ["Une monnaie ouest-africaine commune est-elle viable ?", "Les bases françaises ont-elles encore une utilité sécuritaire ?"],
      sources: [{ type: 'Interview', title: "Kako Nubukpo — L'urgence africaine" }, { type: 'Article', title: "Franc CFA — Anatomie d'une monnaie coloniale" }],
    },
  },
];

/* ── Debate of the week ── */

const DEBATE = {
  question: 'La dissuasion nucléaire française est-elle encore crédible ?',
  galaxy: 'geopolitique' as const,
  participants: 247,
  pourPct: 62,
  pour: [
    { author: C.marineL, text: 'La force de dissuasion reste le pilier de notre indépendance stratégique. Aucune puissance ne peut ignorer un arsenal de 290 têtes nucléaires.' },
    { author: C.thomasR, text: 'Le programme de renouvellement (M51.3, ASN4G) prouve que la France investit pour maintenir la crédibilité technique.' },
    { author: C.claireD, text: 'Dans un monde multipolaire, seule la dissuasion garantit que la France ne soit jamais un vassal.' },
  ],
  contre: [
    { author: C.julienM, text: 'Face aux menaces cyber et spatiales, la dissuasion nucléaire est un concept du XXe siècle appliqué à des conflits du XXIe.' },
    { author: C.nadiaK, text: "Le coût (6 Md€/an) est-il justifié quand les hôpitaux manquent de lits et l'armée conventionnelle de moyens ?" },
    { author: C.ericB, text: "La prolifération et les doctrines du seuil rendent la dissuasion instable. Un accident est statistiquement inévitable." },
  ],
  ai: {
    summary: "Les partisans soulignent l'indépendance stratégique et la modernisation en cours. Les opposants questionnent la pertinence face aux nouvelles menaces et le coût d'opportunité.",
    consensus: "Point de consensus émergent : la nécessité d'un débat public sur la doctrine, absent depuis 2008.",
    positions: [
      { label: 'Crédibilité maintenue', pct: 62, text: "Arsenal modernisé, triade opérationnelle, indépendance stratégique garantie." },
      { label: 'Crédibilité érodée', pct: 38, text: "Nouvelles menaces (cyber, spatial), coût d'opportunité, risque systémique de prolifération." },
    ],
    questions: ["Faut-il un débat parlementaire sur la doctrine ?", "La dissuasion protège-t-elle contre les menaces hybrides ?"],
    sources: [{ type: 'Interview', title: "Général Bentégeat — Dissuasion au XXIe siècle" }],
  } as ThreadAI,
};

const STATS = [
  { value: '43 271', label: 'Citoyens vérifiés' },
  { value: '89', label: 'Débats actifs' },
  { value: '12', label: "Contributions aujourd'hui" },
];

const POLLS = [
  {
    question: 'Quel dossier Thinkerview devrait traiter en priorité ?',
    galaxy: 'technologie' as const, totalVotes: 1847,
    options: [
      { label: "L'IA dans les armées européennes", pct: 34 },
      { label: 'La privatisation des barrages hydrauliques', pct: 28 },
      { label: 'Les câbles sous-marins et la souveraineté numérique', pct: 25 },
      { label: 'Le lobbying pharmaceutique post-Covid', pct: 13 },
    ],
  },
  {
    question: "Faut-il un référendum sur l'énergie nucléaire ?",
    galaxy: 'energie' as const, totalVotes: 2341,
    options: [
      { label: "Oui, c'est un choix de société", pct: 47 },
      { label: "Non, c'est une question technique", pct: 22 },
      { label: 'Oui, mais après un débat citoyen structuré', pct: 26 },
      { label: 'Sans opinion', pct: 5 },
    ],
  },
];

const CALENDAR = {
  today: [
    { type: 'Live', label: 'Débat : dissuasion nucléaire', time: '21h00' },
    { type: 'AMA', label: 'AMA avec la rédaction', time: '14h00' },
  ],
  week: [
    { type: 'Débat', label: 'Forum ouvert : BRICS et dédollarisation', time: 'Jeudi' },
    { type: 'Atelier', label: 'Atelier OSINT pour citoyens', time: 'Samedi' },
  ],
  month: [
    { type: 'Conférence', label: 'Thinkerview Live — Invité spécial', time: '22 mai' },
    { type: 'Publication', label: 'Dossier : Souveraineté numérique', time: '28 mai' },
  ],
};

const PARTICIPATE = [
  { title: 'Lancer un débat', desc: 'Proposez un sujet, argumentez votre angle, invitez la communauté à réagir.', cta: 'Proposer un sujet', href: '/contact', color: PILLAR_COLORS.geopolitique.accent },
  { title: 'Devenir modérateur', desc: "Rejoignez l'équipe de modération citoyenne. Formation, charte, et responsabilité partagée.", cta: 'Postuler', href: '/rejoindre', color: PILLAR_COLORS.politique.accent },
  { title: 'Inviter un citoyen', desc: "Parrainez un nouveau membre. Chaque citoyen vérifié renforce l'indépendance du débat.", cta: 'Inviter', href: '/inscription', color: PILLAR_COLORS.souverainete.accent },
];

const fade = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' as const } };

/* ── AI Synthesis Component ── */

function AISynthesisBlock({ data, dark }: { data: ThreadAI; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const cls = dark ? s.aiDark : s.aiLight;
  return (
    <div className={`${s.aiBlock} ${cls}`}>
      <button className={s.aiHeader} onClick={() => setOpen(o => !o)}>
        <div className={s.aiHeaderLeft}>
          <Compass size={16} className={s.aiCompass} />
          <span className={s.aiTag}>IA</span>
          <span className={s.aiTitle}>Synthèse du débat</span>
        </div>
        <div className={s.aiHeaderRight}>
          <span className={s.aiUpdated}>Mise à jour il y a 8 min</span>
          <ChevronDown size={14} className={`${s.aiChevron} ${open ? s.aiChevronOpen : ''}`} />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className={s.aiBody}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className={s.aiBodyInner}>
              <p className={s.aiSummary}>{data.summary}</p>

              <div className={s.aiPositions}>
                <span className={s.aiSectionLabel}>Positions identifiées</span>
                {data.positions.map(pos => (
                  <div key={pos.label} className={s.aiPosition}>
                    <div className={s.aiPositionHead}>
                      <span className={s.aiPositionLabel}>{pos.label}</span>
                      <span className={s.aiPositionPct}>{pos.pct}%</span>
                    </div>
                    <div className={s.aiPositionBar}>
                      <div className={s.aiPositionFill} style={{ width: `${pos.pct}%` }} />
                    </div>
                    <p className={s.aiPositionText}>{pos.text}</p>
                  </div>
                ))}
              </div>

              {data.consensus && (
                <div className={s.aiConsensus}>
                  <span className={s.aiSectionLabel}>Point de consensus</span>
                  <p className={s.aiConsensusText}>{data.consensus}</p>
                </div>
              )}

              <div className={s.aiQuestions}>
                <span className={s.aiSectionLabel}>Questions ouvertes</span>
                {data.questions.map((q, i) => (
                  <span key={i} className={s.aiQuestion}>{q}</span>
                ))}
              </div>

              {data.sources.length > 0 && (
                <div className={s.aiSources}>
                  <span className={s.aiSectionLabel}>Sources Thinkerview liées</span>
                  <div className={s.aiSourceList}>
                    {data.sources.map((src, i) => (
                      <span key={i} className={s.aiSource}>
                        <span className={s.aiSourceType}>{src.type}</span>
                        {src.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Auth Gate Modal ── */

function AuthGateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className={s.authOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={onClose}>
          <motion.div className={s.authModal} initial={{ opacity: 0, scale: 0.95, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 12 }} transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }} onClick={e => e.stopPropagation()}>
            <button className={s.authClose} onClick={onClose}><X size={16} /></button>

            <div className={s.authIcon}><Shield size={24} /></div>
            <h3 className={s.authTitle}>Espace réservé aux citoyens vérifiés</h3>
            <p className={s.authDesc}>Pour participer aux débats, voter et répondre, vous devez être connecté et avoir complété la vérification citoyenne.</p>

            <div className={s.authSteps}>
              <div className={s.authStep}>
                <span className={s.authStepNum}>01</span>
                <div>
                  <span className={s.authStepTitle}>Créer un compte</span>
                  <span className={s.authStepDesc}>Email + mot de passe, 30 secondes</span>
                </div>
              </div>
              <div className={s.authStep}>
                <span className={s.authStepNum}>02</span>
                <div>
                  <span className={s.authStepTitle}>Vérification d'identité</span>
                  <span className={s.authStepDesc}>Pièce d'identité + selfie, validé sous 24h</span>
                </div>
              </div>
              <div className={s.authStep}>
                <span className={s.authStepNum}>03</span>
                <div>
                  <span className={s.authStepTitle}>Charte citoyenne</span>
                  <span className={s.authStepDesc}>Accepter les règles du débat constructif</span>
                </div>
              </div>
            </div>

            <div className={s.authActions}>
              <Link to="/inscription" className={s.authPrimary}>Créer mon compte <ArrowRight size={14} /></Link>
              <Link to="/connexion" className={s.authSecondary}>Déjà inscrit ? Se connecter</Link>
            </div>

            <p className={s.authFootnote}>
              <Shield size={10} /> La vérification garantit : zéro bot, zéro troll, zéro manipulation.
              <br />43 271 citoyens vérifiés participent déjà aux débats.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main page ── */

const VISIBLE_COUNT = 6;

function MessageItem({ msg, galaxyColor, onAuthGate }: { msg: Msg; galaxyColor: string; onAuthGate: () => void }) {
  const replyCount = msg.replies || 0;

  return (
    <div className={s.message}>
      <div className={s.messageHead}>
        <div className={s.messageAuthor}>
          <span className={s.messageAvatar} style={{ background: `${galaxyColor}18`, color: galaxyColor }}>{msg.author.name.charAt(0)}</span>
          <span className={s.messageName}>{msg.author.name}</span>
          <Shield size={10} className={s.messageShield} />
          <span className={s.messageSince}>depuis {msg.author.since}</span>
        </div>
        <span className={s.messageTime}>{msg.time}</span>
      </div>
      <p className={s.messageText}>{msg.text}</p>
      <div className={s.messageFoot}>
        <button className={s.messageAction} onClick={onAuthGate}>
          <ThumbsUp size={12} /> {msg.likes}
        </button>
        <button className={s.messageAction} onClick={onAuthGate}>
          <CornerDownRight size={12} /> {replyCount > 0 ? `${replyCount} réponses` : 'Répondre'}
        </button>
      </div>
    </div>
  );
}

export default function ForumPage() {
  const [activeGalaxy, setActiveGalaxy] = useState<string | null>(null);
  const [openThread, setOpenThread] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const threadDetailRef = useRef<HTMLDivElement>(null);

  const requireAuth = useCallback(() => setAuthOpen(true), []);

  const filteredThreads = activeGalaxy ? THREADS.filter(t => t.galaxy === activeGalaxy) : THREADS;
  const visibleThreads = showAll || activeGalaxy ? filteredThreads : filteredThreads.slice(0, VISIBLE_COUNT);
  const hasMore = !activeGalaxy && !showAll && filteredThreads.length > VISIBLE_COUNT;
  const pourPct = DEBATE.pourPct;
  const contrePct = 100 - pourPct;

  const handleOpenThread = useCallback((globalIdx: number) => {
    if (openThread === globalIdx) {
      setOpenThread(null);
    } else {
      setOpenThread(globalIdx);
    }
  }, [openThread]);

  useEffect(() => {
    if (openThread !== null && threadDetailRef.current) {
      setTimeout(() => {
        threadDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [openThread]);
  const debateColors = PILLAR_COLORS[DEBATE.galaxy];

  return (
    <Layout>
      {/* ══════════ HERO ══════════ */}
      <section className={s.hero}>
        <motion.p className={s.kicker} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>FORUM CITOYEN</motion.p>
        <motion.h1 className={s.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
          Penser <em>ensemble</em>
        </motion.h1>
        <motion.div className={s.heroRule} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }} />
        <motion.p className={s.heroDeck} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}>
          Zéro bot, zéro manipulation — un espace de débat entre citoyens vérifiés.
        </motion.p>
        <motion.div className={s.stats} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }}>
          {STATS.map((stat, i) => (
            <div key={stat.label} className={s.statItem}>
              {i > 0 && <span className={s.statSep} />}
              <span className={s.statNum}>{stat.value}</span>
              <span className={s.statLabel}>{stat.label}</span>
            </div>
          ))}
          <div className={s.statItem}>
            <span className={s.statSep} />
            <span className={s.statShield}><Shield size={13} /></span>
            <span className={s.statLabel}>0 manipulation détectée</span>
          </div>
        </motion.div>
      </section>

      {/* ══════════ CH.02 — DÉBAT DE LA SEMAINE ══════════ */}
      <motion.section className={s.debate} {...fade} transition={{ duration: 0.7 }}>
        <div className={s.debateInner}>
          <div className={s.debateHead}>
            <div className={s.chapterMark}><span className={s.chNum}>Ch.02</span><span className={s.chSep}>/</span><span className={s.chLabel}>Débat de la semaine</span></div>
            <span className={s.debateGalaxy} style={{ borderColor: debateColors.accent, color: debateColors.accent }}>
              <span className={s.debateGalaxyDot} style={{ background: debateColors.accent }} />
              {GALAXIES.find(g => g.key === DEBATE.galaxy)?.label}
            </span>
          </div>
          <blockquote className={s.debateQuestion}>«&nbsp;{DEBATE.question}&nbsp;»</blockquote>
          <div className={s.debateMeta}>
            <span><Users size={13} /> {DEBATE.participants} citoyens</span>
            <span><MessageSquare size={13} /> {DEBATE.pour.length + DEBATE.contre.length} arguments</span>
          </div>
          <div className={s.voteBarWrap}>
            <div className={s.voteLabels}>
              <span className={s.voteLabelPour}>POUR · {pourPct}%</span>
              <span className={s.voteLabelContre}>CONTRE · {contrePct}%</span>
            </div>
            <div className={s.voteBar}><div className={s.voteFillPour} style={{ width: `${pourPct}%` }} /></div>
          </div>
          <div className={s.debateSides}>
            <div className={s.debateSide}>
              <h3 className={s.debateSideLabel}>POUR</h3>
              {DEBATE.pour.map((arg, i) => (
                <div key={i} className={s.debateArg}>
                  <p className={s.debateArgText}>{arg.text}</p>
                  <div className={s.debateArgAuthor}><Shield size={10} /><span>{arg.author.name}</span><span className={s.debateArgBadge}>Vérifié·e depuis {arg.author.since}</span></div>
                </div>
              ))}
              <button className={s.voteBtn} onClick={requireAuth}><Shield size={13} /> Voter POUR</button>
            </div>
            <div className={s.debateDivider} />
            <div className={s.debateSide}>
              <h3 className={s.debateSideLabel}>CONTRE</h3>
              {DEBATE.contre.map((arg, i) => (
                <div key={i} className={s.debateArg}>
                  <p className={s.debateArgText}>{arg.text}</p>
                  <div className={s.debateArgAuthor}><Shield size={10} /><span>{arg.author.name}</span><span className={s.debateArgBadge}>Vérifié·e depuis {arg.author.since}</span></div>
                </div>
              ))}
              <button className={s.voteBtn} onClick={requireAuth}><Shield size={13} /> Voter CONTRE</button>
            </div>
          </div>
          <AISynthesisBlock data={DEBATE.ai} dark />
        </div>
      </motion.section>

      {/* ══════════ CH.03 — FILS ACTIFS ══════════ */}
      <motion.section className={s.threads} {...fade} transition={{ duration: 0.6 }}>
        <div className={s.threadsInner}>
          <div className={s.sectionHead}>
            <div className={s.chapterMark}><span className={s.chNum}>Ch.03</span><span className={s.chSep}>/</span><span className={s.chLabel}>Fils actifs</span></div>
            <div className={s.sectionHeadRow}>
              <h2 className={s.sectionTitle}>Discussions en cours</h2>
              <span className={s.threadCount}>{THREADS.length} sujets ouverts</span>
            </div>
          </div>
          <div className={s.threadsTabs}>
            <button className={`${s.threadsTab} ${!activeGalaxy ? s.threadsTabActive : ''}`} onClick={() => { setActiveGalaxy(null); setOpenThread(null); }}>Tous</button>
            {GALAXIES.map(g => {
              const count = THREADS.filter(t => t.galaxy === g.key).length;
              return (
                <button key={g.key} className={`${s.threadsTab} ${activeGalaxy === g.key ? s.threadsTabActive : ''}`}
                  onClick={() => { setActiveGalaxy(g.key); setOpenThread(null); }}
                  style={activeGalaxy === g.key ? { color: PILLAR_COLORS[g.key].accent, borderColor: PILLAR_COLORS[g.key].accent } : undefined}>
                  {g.label} <span className={s.threadsTabCount}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Thread detail panel (above grid when open) */}
          <AnimatePresence mode="wait">
            {openThread !== null && (
              <motion.div ref={threadDetailRef} className={s.threadDetail} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}>
                <div className={s.threadDetailInner}>
                  <div className={s.threadDetailHead}>
                    <div>
                      <div className={s.threadGalaxy}>
                        <span className={s.threadDot} style={{ background: PILLAR_COLORS[THREADS[openThread].galaxy].accent }} />
                        <span style={{ color: PILLAR_COLORS[THREADS[openThread].galaxy].accent }}>{GALAXIES.find(g => g.key === THREADS[openThread].galaxy)?.label}</span>
                      </div>
                      <h3 className={s.threadDetailTitle}>{THREADS[openThread].title}</h3>
                      <div className={s.threadDetailMeta}>
                        <span><Users size={12} /> {THREADS[openThread].participants} citoyens</span>
                        <span><MessageSquare size={12} /> {THREADS[openThread].replies} réponses</span>
                        <span><Clock size={12} /> {THREADS[openThread].lastActivity}</span>
                      </div>
                    </div>
                    <button className={s.threadDetailClose} onClick={() => setOpenThread(null)}><X size={18} /></button>
                  </div>

                  <div className={s.threadMessages}>
                    {THREADS[openThread].messages.map((msg, i) => (
                      <MessageItem key={i} msg={msg} galaxyColor={PILLAR_COLORS[THREADS[openThread].galaxy].accent} onAuthGate={requireAuth} />
                    ))}
                  </div>

                  <button className={s.threadDetailReplyBar} onClick={requireAuth}>
                    <span className={s.threadDetailReplyAvatar}>?</span>
                    <span className={s.threadDetailReplyPlaceholder}>Connectez-vous pour rejoindre la discussion…</span>
                    <span className={s.threadDetailReplyBtn}><Shield size={11} /> Se connecter</span>
                  </button>

                  <AISynthesisBlock data={THREADS[openThread].ai} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={s.threadsGrid}>
            {visibleThreads.map((thread, i) => {
              const colors = PILLAR_COLORS[thread.galaxy];
              const globalIdx = THREADS.indexOf(thread);
              const isHot = thread.engagement >= 85;
              return (
                <button key={globalIdx} className={`${s.threadCard} ${openThread === globalIdx ? s.threadCardActive : ''}`} onClick={() => handleOpenThread(globalIdx)}>
                  <div className={s.threadCardTop}>
                    <div className={s.threadGalaxy}><span className={s.threadDot} style={{ background: colors.accent }} /><span style={{ color: colors.accent }}>{GALAXIES.find(g => g.key === thread.galaxy)?.label}</span></div>
                    {isHot && <span className={s.threadHot}><Flame size={11} /> Actif</span>}
                  </div>
                  <h3 className={s.threadTitle}>{thread.title}</h3>
                  <p className={s.threadExcerpt}>{thread.excerpt}</p>
                  <div className={s.threadMeta}>
                    <span><Users size={11} /> {thread.participants}</span>
                    <span><MessageSquare size={11} /> {thread.replies}</span>
                    <span>{thread.lastActivity}</span>
                  </div>
                  <div className={s.threadBar}><div className={s.threadBarFill} style={{ width: `${thread.engagement}%`, background: colors.accent }} /></div>
                </button>
              );
            })}
          </div>

          {hasMore && (
            <motion.div className={s.showMoreWrap} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <button className={s.showMoreBtn} onClick={() => setShowAll(true)}>
                <span className={s.showMoreLabel}>Voir tous les sujets</span>
                <span className={s.showMoreCount}>{filteredThreads.length - VISIBLE_COUNT} de plus</span>
                <TrendingUp size={14} />
              </button>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* ══════════ CH.04 — SONDAGES ══════════ */}
      <motion.section className={s.polls} {...fade} transition={{ duration: 0.6 }}>
        <div className={s.pollsInner}>
          <div className={s.sectionHead}><div className={s.chapterMark}><span className={s.chNum}>Ch.04</span><span className={s.chSep}>/</span><span className={s.chLabel}>Sondages</span></div><h2 className={s.sectionTitle}>Sondages citoyens</h2></div>
          <div className={s.pollsGrid}>
            {POLLS.map((poll, pi) => {
              const colors = PILLAR_COLORS[poll.galaxy];
              return (
                <div key={pi} className={s.pollCard}>
                  <div className={s.threadGalaxy}><span className={s.threadDot} style={{ background: colors.accent }} /><span style={{ color: colors.accent }}>{GALAXIES.find(g => g.key === poll.galaxy)?.label}</span></div>
                  <h3 className={s.pollQuestion}>{poll.question}</h3>
                  <span className={s.pollVotes}>{poll.totalVotes.toLocaleString('fr-FR')} votes</span>
                  <div className={s.pollOptions}>
                    {poll.options.map((opt, oi) => (
                      <button key={oi} className={s.pollOption} onClick={requireAuth}>
                        <span className={s.pollOptionNum}>{String(oi + 1).padStart(2, '0')}</span>
                        <span className={s.pollOptionLabel}>{opt.label}</span>
                        <ChevronRight size={14} className={s.pollOptionArrow} />
                      </button>
                    ))}
                  </div>
                  <span className={s.pollLocked}><Shield size={10} /> Connectez-vous pour voter</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ══════════ CH.05 — VERBATIM ══════════ */}
      <motion.section className={s.verbatim} {...fade} transition={{ duration: 0.6 }}>
        <div className={s.verbatimInner}>
          <span className={s.verbatimMark}>&laquo;</span>
          <blockquote className={s.verbatimText}>J'ai rejoint Thinkerview parce que je cherchais un espace où les désaccords se règlent par l'argument, pas par l'insulte. Ici, chaque citoyen est vérifié. Chaque débat a des sources. C'est rare.</blockquote>
          <div className={s.verbatimAuthor}><Shield size={11} /><span>Sophie M.</span><span className={s.verbatimBadge}>Citoyenne vérifiée depuis 2023</span></div>
        </div>
      </motion.section>

      {/* ══════════ CH.06 — CALENDRIER ══════════ */}
      <motion.section className={s.calendar} {...fade} transition={{ duration: 0.6 }}>
        <div className={s.calendarInner}>
          <div className={s.sectionHead}><div className={s.chapterMark}><span className={s.chNum}>Ch.06</span><span className={s.chSep}>/</span><span className={s.chLabel}>Calendrier</span></div><h2 className={s.sectionTitle}>Calendrier citoyen</h2></div>
          <div className={s.calendarGrid}>
            {([
              { label: "Aujourd'hui", color: '#5AA352', items: CALENDAR.today },
              { label: 'Cette semaine', color: PILLAR_COLORS.technologie.accent, items: CALENDAR.week },
              { label: 'Ce mois', color: PILLAR_COLORS.economie.accent, items: CALENDAR.month },
            ]).map(col => (
              <div key={col.label} className={s.calendarCol}>
                <div className={s.calendarColHead}><span className={s.calendarColDot} style={{ background: col.color }} /><span className={s.calendarColLabel}>{col.label}</span></div>
                {col.items.map((item, i) => (
                  <div key={i} className={s.calendarItem}><span className={s.calendarItemType}>{item.type}</span><span className={s.calendarItemLabel}>{item.label}</span><span className={s.calendarItemTime}>{item.time}</span></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══════════ CH.07 — PARTICIPER ══════════ */}
      <motion.section className={s.participate} {...fade} transition={{ duration: 0.6 }}>
        <div className={s.participateInner}>
          <div className={s.sectionHead}><div className={s.chapterMark}><span className={s.chNum}>Ch.07</span><span className={s.chSep}>/</span><span className={s.chLabel}>Participer</span></div><h2 className={s.sectionTitle}>Rejoignez le débat</h2></div>
          <div className={s.participateGrid}>
            {PARTICIPATE.map(card => (
              <div key={card.title} className={s.participateCard}>
                <span className={s.participateCardDot} style={{ background: card.color }} />
                <h3 className={s.participateCardTitle}>{card.title}</h3>
                <p className={s.participateCardDesc}>{card.desc}</p>
                <Link to={card.href} className={s.participateCardCta} style={{ color: card.color }}>{card.cta} <ArrowRight size={14} /></Link>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <AuthGateModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </Layout>
  );
}
