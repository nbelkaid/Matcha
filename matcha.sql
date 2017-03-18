-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Sam 18 Mars 2017 à 08:30
-- Version du serveur :  5.7.16
-- Version de PHP :  7.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `matcha`
--

-- --------------------------------------------------------

--
-- Structure de la table `photo`
--

CREATE TABLE `photo` (
  `id_photo` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `is_profil` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `photo`
--

INSERT INTO `photo` (`id_photo`, `id_user`, `path`, `is_profil`) VALUES
(31, 1, '/images/str_H1/photo_1', 1),
(32, 1, '/images/str_H1/photo_2', 0),
(33, 1, '/images/str_H1/photo_3', 0),
(34, 1, '/images/str_H1/photo_4', 0),
(39, 9, '/images/bis_H1/photo_1', 1),
(40, 9, '/images/bis_H1/photo_2', 0),
(41, 9, '/images/bis_H1/photo_3', 0),
(42, 9, '/images/bis_H1/photo_4', 0);

-- --------------------------------------------------------

--
-- Structure de la table `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `tag`
--

INSERT INTO `tag` (`id`, `name`) VALUES
(1, 'q'),
(2, 'w'),
(3, 'a'),
(4, 's'),
(6, 'hihi'),
(7, 'huu'),
(8, 'hoho'),
(10, 'huhu'),
(11, 'p'),
(12, 'o'),
(13, 'i'),
(14, 'u'),
(17, 'e'),
(18, 'r'),
(19, 't'),
(20, 'hoo'),
(21, 'hiii'),
(22, 'haa'),
(23, 'hii'),
(26, 'haha'),
(27, 'h'),
(29, 'hoh'),
(30, 'afaƒf'),
(31, 'gsrg'),
(32, 'st'),
(33, 'rs');

-- --------------------------------------------------------

--
-- Structure de la table `tag-user`
--

CREATE TABLE `tag-user` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_tag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `tag-user`
--

INSERT INTO `tag-user` (`id`, `id_user`, `id_tag`) VALUES
(121, 3, 1),
(122, 3, 2),
(123, 3, 18),
(131, 1, 30),
(132, 1, 31),
(133, 1, 32),
(138, 9, 10),
(139, 9, 8),
(140, 9, 26);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `eemail` varchar(255) DEFAULT NULL,
  `passwd` varchar(255) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `last_n` varchar(255) DEFAULT NULL,
  `first_n` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `phone` bigint(11) DEFAULT NULL,
  `kind` int(1) DEFAULT NULL,
  `looking_for` int(1) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `birth` date NOT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zip` int(11) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `eemail`, `passwd`, `login`, `last_n`, `first_n`, `age`, `phone`, `kind`, `looking_for`, `bio`, `birth`, `lat`, `lng`, `city`, `zip`, `country`) VALUES
(1, 'str_h1@gmail.com', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'str_H1', 'Mehdi', 'Belaid Mehdi', 24, 1234567890, 0, 2, '12212121212', '0000-00-00', 48.8833, 2.2667, 'Neuilly-sur-Seine', 92200, 'FR'),
(2, 'str_h2@gmail.com', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'str_H2', 'HUHU', 'huhu', 23, 2345678901, 0, 0, 'bio bio bio', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(3, 'str_f1@gmail.com', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'str_F1', 'HUHU', 'huhu', 22, 3456789012, 1, 0, 'bio bio bio', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(4, 'str_f2@gmail.com', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'str_F2', 'HUHU', 'huhu', 24, 4567890123, 1, 0, 'bio bio bio', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(5, 'gay_h1@gmail.com', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'gay_H1', 'HUHU', 'huhu', 21, 5678901234, 0, 1, 'bio bio bio', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(6, 'gay_h2@gmail.com', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'gay_H2', 'HUHU', 'huhu', 22, 6789012345, 0, 1, 'bio bio bio', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(7, 'gay_f1@gmail.com', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'gay_F1', 'HUHU', 'huhu', 20, 7890123456, 1, 1, 'bio bio bio', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(8, 'gay_f2@gmail.com', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'gay_F2', 'HUHU', 'huhu', 24, 8901234567, 1, 1, 'bio bio bio', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(9, 'bis_h1@gmail.com', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'bis_H1', 'HUHU', 'huhu', 21, 9012345678, 0, 1, 'bio bio bio', '0000-00-00', 48.8833, 2.2667, 'Neuilly-sur-Seine', 92200, 'FR'),
(10, 'bis_f1@gmail.com', '$2a$08$DS1FnCLErXNSVIfRwJweee5Ssx0NqHUGgXskBILR0xhp3y0Ft3/Kq', 'bis_F1', 'HUHU', 'huhu', 22, 123456789, 1, 2, 'bio bio bio', '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(28, 'huhu@huhu.fr', '$2a$08$ir6BNEf.M17ipjBmvnw12.vETifKpqbJzrjBgGHU1FCSlnCeKqQhi', 'str_H3', 'HUHU', 'huhu', NULL, 12343212, 0, 2, NULL, '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(29, 'str_f3@gmail.com', '$2a$08$Fb7bJCwrw12LbYgBd6eZmOGmyeb5ibY3R00UJ0HxaJcNRGHLxEvL6', 'str_F3', 'HUHU', 'huhu', NULL, 1234565432, 1, 2, NULL, '0000-00-00', NULL, NULL, NULL, NULL, NULL),
(30, 'qwert42@qwert.mdp', '$2a$08$HpDttmXI/cibsukeToGZoeCPFEPRI4fN35fWMbcS9ac65idY1y0je', 'qwert', 'qwert', 'qwert', 24, 123435678, 0, 2, 'La la la ', '1992-11-26', 48.8833, 2.2667, 'Neuilly-sur-Seine', 92200, 'FR'),
(31, 'qwerty@qwerty', '$2a$08$3sXjPmeEUm9H3/FZe23QzeGTfvIzS5x1OwpgyQZIO6nkD/OQ2RWPq', 'qwerty', 'qwerty', 'qwerty', 24, 123451221, 0, 2, 'nouvelle bio ', '1992-11-26', NULL, NULL, NULL, NULL, NULL);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`id_photo`),
  ADD UNIQUE KEY `id_photo` (`id_photo`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_photo_2` (`id_photo`);

--
-- Index pour la table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

--
-- Index pour la table `tag-user`
--
ALTER TABLE `tag-user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_user_2` (`id_user`),
  ADD KEY `id_tag` (`id_tag`),
  ADD KEY `id` (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_5` (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `id_2` (`id`),
  ADD KEY `id_3` (`id`),
  ADD KEY `id_4` (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `photo`
--
ALTER TABLE `photo`
  MODIFY `id_photo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT pour la table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT pour la table `tag-user`
--
ALTER TABLE `tag-user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `photo_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `tag-user`
--
ALTER TABLE `tag-user`
  ADD CONSTRAINT `tag-user_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tag-user_ibfk_2` FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
