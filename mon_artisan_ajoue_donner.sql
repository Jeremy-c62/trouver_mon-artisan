-- Insertion des artisans
INSERT INTO artisan (nom) VALUES
('Boucherie Dumont'),
('Au pain chaud'),
('Chocolaterie Labbé'),
('Traiteur Truchon'),
('Orville Salmons'),
('Mont Blanc Eléctricité'),
('Boutot & fils'),
('Vallis Bellemare'),
('Claude Quinn'),
('Amitee Lécuyer'),
('Ernest Carignan'),
('Royden Charbonneau'),
('Leala Dennis'),
('C\'est sup\'hair'),
('Le monde des fleurs'),
('Valérie Laderoute'),
('CM Graphisme');



-- Insertion des catégories (branche)
INSERT INTO branche (categorie) VALUES
('Alimentation'),
('Bâtiment'),
('Fabrication'),
('Services');




-- Insertion des métiers (relations entre artisans et catégories)
INSERT INTO metier (artisan_id, branche_id, specialite) VALUES
(1, 1, 'Boucher'),
(2, 1, 'Boulanger'),
(3, 1, 'Chocolatier'),
(4, 1, 'Traiteur'),
(5, 2, 'Chauffagiste'),
(6, 2, 'Electricien'),
(7, 2, 'Menuisier'),
(8, 2, 'Plombier'),
(9, 3, 'Bijoutier'),
(10, 3, 'Couturier'),
(11, 3, 'Ferronier'),
(12, 4, 'Coiffeur'),
(13, 4, 'Coiffeur'),
(14, 4, 'Coiffeur'),
(15, 4, 'Fleuriste'),
(16, 4, 'Toiletteur'),
(17, 4, 'Webdesign');




-- Insertion des informations (note et à propos)
INSERT INTO infos (artisan_id, note, a_propos, image) VALUES
(1, 4.5, 'Boucher avec plus de 15 ans d\'expérience, je vous propose une large gamme de viandes sélectionnées avec soin. Mon savoir-faire artisanal garantit des produits frais et de qualité supérieure. Toujours à l\'écoute de vos besoins, je vous offre un service personnalisé et une viande savoureuse, idéale pour vos repas quotidiens.', 'artisan_1.jpg'),
(2, 4.8, 'Boulanger passionné, je prépare des pains artisanaux avec des ingrédients de qualité et des techniques traditionnelles. Mon expertise garantit une croûte dorée, une mie légère et une variété de pains adaptés à tous les goûts. Chaque jour, je vous propose des viennoiseries fraîches, qui vous offriront une expérience gustative unique.', 'artisan_2.jpg'),
(3, 4.9, 'Chocolatier d\'exception, j\'utilise uniquement les meilleurs cacaos pour créer des chocolats fins aux saveurs riches et subtiles. Ma passion pour le chocolat me pousse à inventer de nouvelles créations qui sauront éveiller vos papilles. Que ce soit pour une occasion spéciale ou simplement pour vous faire plaisir, mes chocolats vous séduiront à chaque bouchée.', 'artisan_3.jpg'),
(4, 4.1, 'Traiteur depuis plus de 10 ans, je vous propose une cuisine raffinée et sur mesure pour tous vos événements. Des buffets savoureux aux plats gastronomiques, chaque création est pensée pour émerveiller vos invités. Fort de mon expérience, je vous offre un service de qualité, alliant professionnalisme et attention aux détails.', 'artisan_4.jpg'),
(5, 5.0, 'Chauffagiste avec plus de 20 ans d\'expérience dans la région, je propose des services d\'installation, d\'entretien et de réparation de systèmes de chauffage. Expert en solutions efficaces et durables, je garantis un service de qualité rapide et fiable. Faites confiance à un professionnel local reconnu pour son savoir-faire et son engagement envers la satisfaction des clients.', 'artisan_5.jpg'),
(6, 4.5, 'Électricien qualifié, je vous accompagne dans tous vos projets électriques, que ce soit pour des installations neuves ou des réparations. Mon expertise garantit la sécurité de vos installations et leur conformité aux normes en vigueur. Je mets un point d\'honneur à vous offrir des solutions efficaces et rapides pour votre confort quotidien.', 'artisan_6.jpg'),
(7, 4.7, 'Menuisier passionné, je crée des meubles sur mesure et réalise des travaux de menuiserie intérieure de haute qualité. Que ce soit pour des escaliers, des fenêtres ou des aménagements personnalisés, je mets tout mon savoir-faire au service de vos projets. Mon objectif est de vous offrir des produits durables, esthétiques et fonctionnels.', 'artisan_7.jpg'),
(8, 4.0, 'Plombier expérimenté, je m\'occupe de l\'installation, de la réparation et de l\'entretien de vos équipements sanitaires et de chauffage. Spécialiste des problèmes de plomberie, je propose des solutions rapides et durables. Pour tous vos travaux, je vous assure un service soigné et respectueux de vos délais.', 'artisan_8.jpg'),
(9, 4.2, 'Bijoutier d\'exception, je vous propose des créations uniques, faites à la main, pour sublimer chaque moment de votre vie. Spécialiste des bijoux personnalisés, j\'allie tradition et modernité pour réaliser des pièces sur mesure, selon vos envies. Mon atelier est dédié à la qualité, à l\'élégance et à l\'originalité.', 'artisan_9.jpg'),
(10, 4.5, 'Couturier et styliste passionnée, je crée des vêtements sur mesure qui allient confort, élégance et modernité. Chaque création est unique, pensée pour s\'adapter à votre silhouette et vos goûts. Que ce soit pour une occasion spéciale ou pour votre quotidien, je vous propose un service personnalisé, mettant en avant votre style.', 'artisan_10.jpg'),
(11, 5.0, 'Ferronnier,depuis 15 ans j\'allie tradition et innovation pour créer des pièces métalliques sur mesure qui allient robustesse et esthétique. De la ferronnerie d\'art à l\'agencement métallique, mon travail est une véritable passion. Je vous propose des créations uniques qui enrichiront l\'esthétique de votre intérieur ou extérieur, tout en garantissant leur longévité.', 'artisan_11.jpg'),
(12, 3.8, 'Coiffeur expert, je vous offre des coupes modernes et des coiffures adaptées à votre style. Avec des années d\'expérience, je suis à même de vous proposer des conseils personnalisés pour sublimer votre visage et mettre en valeur votre personnalité. Mes services sont pensés pour vous offrir une expérience de détente et de beauté.', 'artisan_12.jpg'),
(13, 3.8, 'Coiffeur talentueux, je mets à votre disposition mon savoir-faire pour des coiffures sur mesure, que ce soit pour des coupes tendance ou des coiffures plus classiques. Mon objectif est de vous offrir une coiffure qui vous correspond et qui vous met en valeur, tout en vous offrant un moment de bien-être.', 'artisan_13.jpg'),
(14, 4.1, 'Coiffeur créatif, spécialisé dans les coupes modernes et les couleurs tendances. Je vous propose des prestations sur mesure, adaptées à votre type de cheveux et à votre style personnel. Mon objectif est de vous offrir une coiffure unique qui vous ressemble, avec une attention particulière aux détails pour un résultat impeccable.', 'artisan_14.jpg'),
(15, 4.6, 'Fleuriste, je crée des arrangements floraux pour toutes occasions, en alliant esthétisme et émotion. Chaque bouquet est réalisé avec soin et créativité pour exprimer vos sentiments. Que ce soit pour un mariage, un anniversaire ou simplement pour faire plaisir, je vous propose des compositions florales uniques qui sauront émerveiller vos proches.', 'artisan_15.jpg'),
(16, 4.5, 'Toiletteur professionnel, je prends soin de vos animaux avec douceur et expertise. Spécialisé dans les coupes, les soins et l\'hygiène, je veille à ce que votre compagnon soit bien traité. Mon service est adapté à chaque type d\'animal, avec des produits de qualité pour garantir leur confort et leur bien-être.', 'artisan_16.jpg'),
(17, 4.4, 'Webdesigner, je crée des sites internet modernes et fonctionnels, adaptés à vos besoins professionnels ou personnels. Mon expertise en design web me permet de créer des interfaces attractives et ergonomiques pour offrir une expérience utilisateur optimale. Vous souhaitez un site internet unique et performant ? Je vous accompagne à chaque étape de votre projet.', 'artisan_17.jpg');



-- Insertion des coordonnées (ville, email, site web)
INSERT INTO coordonnees (artisan_id, ville, email, site_web) VALUES
(1, 'Lyon', 'boucherie.dumond@gmail.com', NULL),
(2, 'Montélimar', 'aupainchaud@hotmail.com', NULL),
(3, 'Lyon', 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr'),
(4, 'Lyon', 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr'),
(5, 'Evian', 'o-salmons@live.com', NULL),
(6, 'Chamonix', 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com'),
(7, 'Bourg-en-bresse', 'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com'),
(8, 'Vienne', 'v.bellemare@gmail.com', 'https://plomberie-bellemare.com'),
(9, 'Aix-les-bains', 'claude.quinn@gmail.com', NULL),
(10, 'Annecy', 'a.amitee@hotmail.com', 'https://lecuyer-couture.com'),
(11, 'Le Puy-en-Velay', 'e-carigan@hotmail.com', NULL),
(12, 'Saint-Priest', 'r.charbonneau@gmail.com', NULL),
(13, 'Chambéry', 'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr'),
(14, 'Romans-sur-Isère', 'sup-hair@gmail.com', 'https://sup-hair.fr'),
(15, 'Annonay', 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr'),
(16, 'Valence', 'v-laredoute@gmail.com', NULL),
(17, 'Valence', 'contact@cm-graphisme.com', 'https://cm-graphisme.com');



-- rajoute des boolean dans la tables infos apres oublie. 
ALTER TABLE infos
ADD COLUMN top BOOLEAN DEFAULT FALSE;

UPDATE infos SET top = TRUE WHERE artisan_id = 1;
UPDATE infos SET top = FALSE WHERE artisan_id = 2;
UPDATE infos SET top = TRUE WHERE artisan_id = 3;
UPDATE infos SET top = TRUE WHERE artisan_id = 4;
UPDATE infos SET top = FALSE WHERE artisan_id = 5;
UPDATE infos SET top = TRUE WHERE artisan_id = 6;
UPDATE infos SET top = FALSE WHERE artisan_id = 7;
UPDATE infos SET top = FALSE WHERE artisan_id = 8;
UPDATE infos SET top = FALSE WHERE artisan_id = 9;
UPDATE infos SET top = FALSE WHERE artisan_id = 10;
UPDATE infos SET top = FALSE WHERE artisan_id = 11;
UPDATE infos SET top = FALSE WHERE artisan_id = 12;
UPDATE infos SET top = FALSE WHERE artisan_id = 13;
UPDATE infos SET top = FALSE WHERE artisan_id = 14;
UPDATE infos SET top = FALSE WHERE artisan_id = 15;
UPDATE infos SET top = FALSE WHERE artisan_id = 16;
UPDATE infos SET top = FALSE WHERE artisan_id = 17;