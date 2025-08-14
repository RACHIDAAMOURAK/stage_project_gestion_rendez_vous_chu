-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 14 août 2025 à 21:46
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `rdv_hopital_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `date_prise_fonction` date NOT NULL,
  `niveau_acces` enum('ADMIN_SIMPLE','SUPER_ADMIN') NOT NULL,
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`date_prise_fonction`, `niveau_acces`, `id`) VALUES
('2024-01-15', 'SUPER_ADMIN', 3),
('2024-03-01', 'ADMIN_SIMPLE', 5),
('2024-04-20', 'SUPER_ADMIN', 91),
('2024-04-30', 'SUPER_ADMIN', 101),
('2024-05-10', 'SUPER_ADMIN', 111),
('2024-05-20', 'SUPER_ADMIN', 121),
('2024-05-30', 'SUPER_ADMIN', 131),
('2024-06-09', 'SUPER_ADMIN', 141),
('2024-06-19', 'SUPER_ADMIN', 151),
('2024-06-29', 'SUPER_ADMIN', 161);

-- --------------------------------------------------------

--
-- Structure de la table `disponibilites`
--

CREATE TABLE `disponibilites` (
  `id` bigint(20) NOT NULL,
  `active` bit(1) NOT NULL,
  `duree_creneau_minutes` int(11) NOT NULL,
  `heure_debut` time(6) NOT NULL,
  `heure_fin` time(6) NOT NULL,
  `jour_semaine` enum('FRIDAY','MONDAY','SATURDAY','SUNDAY','THURSDAY','TUESDAY','WEDNESDAY') NOT NULL,
  `medecin_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `disponibilites`
--

INSERT INTO `disponibilites` (`id`, `active`, `duree_creneau_minutes`, `heure_debut`, `heure_fin`, `jour_semaine`, `medecin_id`) VALUES
(3, b'0', 60, '18:00:00.000000', '18:30:00.000000', 'MONDAY', 2),
(4, b'1', 45, '08:00:00.000000', '16:00:00.000000', 'WEDNESDAY', 8),
(5, b'1', 30, '10:00:00.000000', '18:00:00.000000', 'FRIDAY', 2),
(6, b'1', 60, '10:00:00.000000', '18:00:00.000000', 'TUESDAY', 2),
(7, b'1', 30, '14:00:00.000000', '20:00:00.000000', 'THURSDAY', 17),
(8, b'1', 45, '09:00:00.000000', '13:00:00.000000', 'SATURDAY', 17),
(9, b'1', 60, '18:30:00.000000', '19:30:00.000000', 'WEDNESDAY', 2),
(10, b'1', 30, '13:00:00.000000', '13:30:00.000000', 'THURSDAY', 2),
(11, b'1', 30, '19:12:00.000000', '18:14:00.000000', 'TUESDAY', 2),
(12, b'1', 60, '14:58:00.000000', '15:58:00.000000', 'FRIDAY', 2),
(14, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 78),
(15, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 83),
(16, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 85),
(17, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 87),
(18, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 89),
(19, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 93),
(20, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 95),
(21, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 97),
(22, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 99),
(23, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 103),
(24, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 105),
(25, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 107),
(26, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 109),
(27, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 113),
(28, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 115),
(29, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 117),
(30, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 119),
(31, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 123),
(32, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 125),
(33, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 127),
(34, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 129),
(35, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 133),
(36, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 135),
(37, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 137),
(38, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 139),
(39, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 143),
(40, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 145),
(41, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 147),
(42, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 149),
(43, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 153),
(44, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 155),
(45, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 157),
(46, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 159),
(47, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 2),
(48, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 8),
(49, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 17),
(50, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 70),
(51, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 72),
(52, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 76),
(53, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 77),
(54, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 73),
(55, b'0', 60, '08:00:00.000000', '16:00:00.000000', 'THURSDAY', 81),
(56, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 78),
(57, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 83),
(58, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 85),
(59, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 87),
(60, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 89),
(61, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 93),
(62, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 95),
(63, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 97),
(64, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 99),
(65, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 103),
(66, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 105),
(67, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 107),
(68, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 109),
(69, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 113),
(70, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 115),
(71, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 117),
(72, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 119),
(73, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 123),
(74, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 125),
(75, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 127),
(76, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 129),
(77, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 133),
(78, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 135),
(79, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 137),
(80, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 139),
(81, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 143),
(82, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 145),
(83, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 147),
(84, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 149),
(85, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 153),
(86, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 155),
(87, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 157),
(88, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 159),
(89, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 2),
(90, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 8),
(91, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 17),
(92, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 70),
(93, b'1', 30, '08:00:00.000000', '16:00:00.000000', 'FRIDAY', 72),
(94, b'1', 60, '10:39:00.000000', '11:39:00.000000', 'MONDAY', 2);

-- --------------------------------------------------------

--
-- Structure de la table `medecins`
--

CREATE TABLE `medecins` (
  `description` varchar(1000) DEFAULT NULL,
  `numerorpps` varchar(255) NOT NULL,
  `specialite` varchar(255) NOT NULL,
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `medecins`
--

INSERT INTO `medecins` (`description`, `numerorpps`, `specialite`, `id`) VALUES
('Spécialiste en cardiologie avec 15 ans d\'expérience', 'RPPS123456', 'Cardiologie', 2),
('Dermatologue spécialisé en chirurgie esthétique', 'RPPS789012', 'Dermatologie', 8),
('Dermatologue spécialisé en chirurgie esthétique', 'RPPS789092', 'Dermatologie', 17),
('Description 7', 'RTYU655555', 'Orthopédie', 70),
('Description 3', 'TREZ123456', 'Ophtalmologie', 72),
('Description 1', 'YTRE436578', 'Cardiologie', 73),
('Description 8', 'TRTY546789', 'Cardiologie', 76),
('Description 9', 'YTRE432345', 'Pneumologie', 77),
('12 ans de spécialités ', 'ETYH345678', 'Gastro-entérologie', 78),
('Description5', 'YTRE543256', 'ORL', 81),
('Description 102', 'RPPS10102', 'Cardiologie', 83),
('Description 104', 'RPPS10104', 'Gynécologie', 85),
('Description 106', 'RPPS10106', 'Pédiatrie', 87),
('Description 108', 'RPPS10108', 'Specialite3', 89),
('Description 112', 'RPPS10112', 'Neurologie', 93),
('Description 114', 'RPPS10114', 'Orthopédie', 95),
('Description 116', 'RPPS10116', 'Ophtalmologie', 97),
('Description 118', 'RPPS10118', 'ORL', 99),
('Description 122', 'RPPS10122', 'Gastro-entérologie', 103),
('Description 124', 'RPPS10124', 'Pneumologie', 105),
('Description 126', 'RPPS10126', 'Cardiologie', 107),
('Description 128', 'RPPS10128', 'Dermatologie', 109),
('Description 132', 'RPPS10132', 'Gynécologie', 113),
('Description 134', 'RPPS10134', 'Pédiatrie', 115),
('Description 136', 'RPPS10136', 'Neurologie', 117),
('Description 138', 'RPPS10138', 'Specialite3', 119),
('Description 142', 'RPPS10142', 'Specialite2', 123),
('Description 144', 'RPPS10144', 'Specialite4', 125),
('Description 146', 'RPPS10146', 'Specialite1', 127),
('Description 148', 'RPPS10148', 'Specialite3', 129),
('Description 152', 'RPPS10152', 'Specialite2', 133),
('Description 154', 'RPPS10154', 'Specialite4', 135),
('Description 156', 'RPPS10156', 'Specialite1', 137),
('Description 158', 'RPPS10158', 'Specialite3', 139),
('Description 162', 'RPPS10162', 'Specialite2', 143),
('Description 164', 'RPPS10164', 'Specialite4', 145),
('Description 166', 'RPPS10166', 'Specialite1', 147),
('Description 168', 'RPPS10168', 'Specialite3', 149),
('Description 172', 'RPPS10172', 'Specialite2', 153),
('Description 174', 'RPPS10174', 'Specialite4', 155),
('Description 176', 'RPPS10176', 'Specialite1', 157),
('Description 178', 'RPPS10178', 'Specialite3', 159);

-- --------------------------------------------------------

--
-- Structure de la table `patients`
--

CREATE TABLE `patients` (
  `adresse` varchar(255) NOT NULL,
  `antecedents` varchar(1000) DEFAULT NULL,
  `date_naissance` date NOT NULL,
  `numero_secu` varchar(255) NOT NULL,
  `sexe` enum('FEMME','HOMME') DEFAULT NULL,
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `patients`
--

INSERT INTO `patients` (`adresse`, `antecedents`, `date_naissance`, `numero_secu`, `sexe`, `id`) VALUES
('123 rue de Paris', 'aucun', '1990-05-15', 'SECU100101', 'HOMME', 1),
('456 avenue des Fleurs', 'Allergie aux pénicillines', '1985-08-22', 'SECU100102', 'FEMME', 15),
('rue rassif', 'aucun', '2001-05-04', 'SECU100100', 'FEMME', 66),
('Adresse 4', 'aucun', '2009-08-08', 'SECU100108', 'FEMME', 67),
('T', 'dfghj', '2001-07-07', 'TYHY234556', 'HOMME', 69),
('Adresse 3', 'aucun ', '2009-07-06', 'SECU100136', 'FEMME', 71),
('Adresse 1', 'aucun', '1997-06-04', 'SECU100138', 'FEMME', 79),
('Adresse 1', 'aucun', '2001-01-11', 'SECU100106', 'FEMME', 80),
('Adresse 101', 'Antecedents 101', '1980-04-11', 'SECU100140', 'FEMME', 82),
('Adresse 103', 'Antecedents 103', '1980-04-13', 'SECU100103', 'FEMME', 84),
('Adresse 105', 'Antecedents 105', '1980-04-15', 'SECU100105', 'FEMME', 86),
('Adresse 107', 'Antecedents 107', '1980-04-17', 'SECU100107', 'FEMME', 88),
('Adresse 109', 'Antecedents 109', '1980-04-19', 'SECU100109', 'FEMME', 90),
('Adresse 111', 'Antecedents 111', '1980-04-21', 'SECU100111', 'FEMME', 92),
('Adresse 113', 'Antecedents 113', '1980-04-23', 'SECU100113', 'FEMME', 94),
('Adresse 115', 'Antecedents 115', '1980-04-25', 'SECU100115', 'FEMME', 96),
('Adresse 117', 'Antecedents 117', '1980-04-27', 'SECU100117', 'FEMME', 98),
('Adresse 119', 'Antecedents 119', '1980-04-29', 'SECU100119', 'FEMME', 100),
('Adresse 121', 'Antecedents 121', '1980-05-01', 'SECU100121', 'FEMME', 102),
('Adresse 123', 'Antecedents 123', '1980-05-03', 'SECU100123', 'FEMME', 104),
('Adresse 125', 'Antecedents 125', '1980-05-05', 'SECU100125', 'FEMME', 106),
('Adresse 127', 'Antecedents 127', '1980-05-07', 'SECU100127', 'FEMME', 108),
('Adresse 129', 'Antecedents 129', '1980-05-09', 'SECU100129', 'FEMME', 110),
('Adresse 131', 'Antecedents 131', '1980-05-11', 'SECU100131', 'FEMME', 112),
('Adresse 133', 'Antecedents 133', '1980-05-13', 'SECU100133', 'FEMME', 114),
('Adresse 135', 'Antecedents 135', '1980-05-15', 'SECU100135', 'FEMME', 116),
('Adresse 137', 'Antecedents 137', '1980-05-17', 'SECU100137', 'FEMME', 118),
('Adresse 139', 'Antecedents 139', '1980-05-19', 'SECU100139', 'FEMME', 120),
('Adresse 141', 'Antecedents 141', '1980-05-21', 'SECU100141', 'FEMME', 122),
('Adresse 143', 'Antecedents 143', '1980-05-23', 'SECU100143', 'FEMME', 124),
('Adresse 145', 'Antecedents 145', '1980-05-25', 'SECU100145', 'FEMME', 126),
('Adresse 147', 'Antecedents 147', '1980-05-27', 'SECU100147', 'FEMME', 128),
('Adresse 149', 'Antecedents 149', '1980-05-29', 'SECU100149', 'FEMME', 130),
('Adresse 151', 'Antecedents 151', '1980-05-31', 'SECU100151', 'FEMME', 132),
('Adresse 153', 'Antecedents 153', '1980-06-02', 'SECU100153', 'FEMME', 134),
('Adresse 155', 'Antecedents 155', '1980-06-04', 'SECU100155', 'FEMME', 136),
('Adresse 157', 'Antecedents 157', '1980-06-06', 'SECU100157', 'FEMME', 138),
('Adresse 159', 'Antecedents 159', '1980-06-08', 'SECU100159', 'FEMME', 140),
('Adresse 161', 'Antecedents 161', '1980-06-10', 'SECU100161', 'FEMME', 142),
('Adresse 163', 'Antecedents 163', '1980-06-12', 'SECU100163', 'FEMME', 144),
('Adresse 165', 'Antecedents 165', '1980-06-14', 'SECU100165', 'FEMME', 146),
('Adresse 167', 'Antecedents 167', '1980-06-16', 'SECU100167', 'FEMME', 148),
('Adresse 169', 'Antecedents 169', '1980-06-18', 'SECU100169', 'FEMME', 150),
('Adresse 171', 'Antecedents 171', '1980-06-20', 'SECU100171', 'FEMME', 152),
('Adresse 173', 'Antecedents 173', '1980-06-22', 'SECU100173', 'FEMME', 154),
('Adresse 175', 'Antecedents 175', '1980-06-24', 'SECU100175', 'FEMME', 156),
('Adresse 177', 'Antecedents 177', '1980-06-26', 'SECU100177', 'FEMME', 158),
('Adresse 179', 'Antecedents 179', '1980-06-28', 'SECU100179', 'FEMME', 160);

-- --------------------------------------------------------

--
-- Structure de la table `rendez_vous`
--

CREATE TABLE `rendez_vous` (
  `id` bigint(20) NOT NULL,
  `date_creation` datetime(6) NOT NULL,
  `date_heure` datetime(6) NOT NULL,
  `date_modification` datetime(6) DEFAULT NULL,
  `duree_minutes` int(11) NOT NULL,
  `motif` varchar(1000) DEFAULT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `statut` enum('ANNULE','CONFIRME','EN_ATTENTE','TERMINE') NOT NULL,
  `medecin_id` bigint(20) NOT NULL,
  `patient_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rendez_vous`
--

INSERT INTO `rendez_vous` (`id`, `date_creation`, `date_heure`, `date_modification`, `duree_minutes`, `motif`, `notes`, `statut`, `medecin_id`, `patient_id`) VALUES
(1, '2025-07-31 16:08:40.000000', '2028-08-05 08:00:00.000000', '2025-08-08 15:56:33.000000', 30, 'Consultation de routine', 'Patient en bonne santé', 'CONFIRME', 2, 1),
(2, '2025-07-31 16:46:06.000000', '2024-08-12 13:30:00.000000', '2025-08-07 18:59:28.000000', 45, 'Consultation spécialisée', 'Nouveau patient, première consultation', 'ANNULE', 2, 1),
(3, '2025-07-31 16:48:08.000000', '2024-08-15 10:00:00.000000', NULL, 30, 'Consultation annulée', 'Patient indisponible', 'ANNULE', 8, 15),
(4, '2025-07-31 16:49:09.000000', '2024-08-20 15:00:00.000000', NULL, 60, 'Suivi traitement', 'Contrôle après 3 semaines', 'CONFIRME', 8, 1),
(5, '2025-08-03 21:18:27.000000', '2026-08-04 08:00:00.000000', '2025-08-06 17:18:28.000000', 30, 'consultation', 'n', 'CONFIRME', 2, 1),
(6, '2025-08-04 21:44:56.000000', '2025-08-29 09:00:00.000000', '2025-08-06 17:53:16.000000', 30, 'première consultation', 're', 'CONFIRME', 17, 1),
(7, '2025-08-06 17:20:51.000000', '2025-08-08 10:00:00.000000', '2025-08-06 17:21:26.000000', 30, 'b', 'g', 'ANNULE', 2, 1),
(8, '2025-08-06 18:31:26.000000', '2025-08-19 10:30:00.000000', '2025-08-08 15:07:11.000000', 30, 'l', 'm', 'CONFIRME', 2, 1),
(9, '2025-08-06 20:00:50.000000', '2025-08-13 08:30:00.000000', '2025-08-07 18:59:33.000000', 30, 'gfd', 'première consultation', 'CONFIRME', 2, 1),
(10, '2025-08-07 17:14:45.000000', '2025-08-29 10:00:00.000000', '2025-08-08 15:07:07.000000', 30, 'f', 'k', 'CONFIRME', 2, 1),
(11, '2025-08-07 17:15:51.000000', '2025-08-28 10:30:00.000000', NULL, 30, 's', 'ss', 'EN_ATTENTE', 2, 1),
(12, '2025-08-07 18:05:12.000000', '2025-08-28 08:30:00.000000', '2025-08-07 18:59:48.000000', 30, 'f', 'f', 'CONFIRME', 2, 66),
(13, '2025-08-07 18:06:09.000000', '2025-08-19 10:00:00.000000', NULL, 30, 't', 't', 'EN_ATTENTE', 2, 1),
(14, '2025-08-07 18:25:26.000000', '2025-08-07 08:00:00.000000', '2025-08-07 18:27:56.000000', 30, 'z', 'z', 'ANNULE', 2, 66),
(15, '2025-08-07 22:24:14.000000', '2025-08-07 10:00:00.000000', NULL, 30, 'za', 'z', 'EN_ATTENTE', 73, 66),
(16, '2025-08-08 13:55:01.000000', '2025-08-21 08:00:00.000000', '2025-08-08 13:56:45.000000', 30, 'consultation', 'première consultation', 'CONFIRME', 17, 66),
(17, '2025-08-09 13:18:25.000000', '2025-08-05 13:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 101', 'Notes 101', 'CONFIRME', 85, 120),
(18, '2025-08-09 13:18:25.000000', '2025-08-05 14:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 102', 'Notes 102', 'EN_ATTENTE', 145, 112),
(19, '2025-08-09 13:18:25.000000', '2025-08-05 15:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 103', 'Notes 103', 'TERMINE', 78, 102),
(20, '2025-08-09 13:18:25.000000', '2025-08-05 16:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 104', 'Notes 104', 'ANNULE', 81, 110),
(21, '2025-08-09 13:18:25.000000', '2025-08-05 17:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 105', 'Notes 105', 'CONFIRME', 153, 160),
(22, '2025-08-09 13:18:25.000000', '2025-08-05 18:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 106', 'Notes 106', 'EN_ATTENTE', 149, 160),
(23, '2025-08-09 13:18:25.000000', '2025-08-05 19:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 107', 'Notes 107', 'TERMINE', 76, 144),
(24, '2025-08-09 13:18:25.000000', '2025-08-05 20:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 108', 'Notes 108', 'ANNULE', 109, 122),
(25, '2025-08-09 13:18:25.000000', '2025-08-05 21:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 109', 'Notes 109', 'CONFIRME', 93, 146),
(26, '2025-08-09 13:18:25.000000', '2025-08-05 22:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 110', 'Notes 110', 'EN_ATTENTE', 70, 94),
(27, '2025-08-09 13:18:25.000000', '2025-08-05 23:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 111', 'Notes 111', 'TERMINE', 17, 126),
(28, '2025-08-09 13:18:25.000000', '2025-08-06 00:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 112', 'Notes 112', 'ANNULE', 149, 120),
(29, '2025-08-09 13:18:25.000000', '2025-08-06 01:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 113', 'Notes 113', 'CONFIRME', 76, 108),
(30, '2025-08-09 13:18:25.000000', '2025-08-06 02:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 114', 'Notes 114', 'EN_ATTENTE', 127, 69),
(31, '2025-08-09 13:18:25.000000', '2025-08-06 03:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 115', 'Notes 115', 'TERMINE', 149, 132),
(32, '2025-08-09 13:18:25.000000', '2025-08-06 04:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 116', 'Notes 116', 'ANNULE', 125, 1),
(33, '2025-08-09 13:18:25.000000', '2025-08-06 05:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 117', 'Notes 117', 'CONFIRME', 17, 86),
(34, '2025-08-09 13:18:25.000000', '2025-08-06 06:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 118', 'Notes 118', 'EN_ATTENTE', 83, 148),
(35, '2025-08-09 13:18:25.000000', '2025-08-06 07:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 119', 'Notes 119', 'TERMINE', 115, 126),
(36, '2025-08-09 13:18:25.000000', '2025-08-06 08:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 120', 'Notes 120', 'ANNULE', 125, 156),
(37, '2025-08-09 13:18:25.000000', '2025-08-06 09:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 121', 'Notes 121', 'CONFIRME', 78, 69),
(38, '2025-08-09 13:18:25.000000', '2025-08-06 10:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 122', 'Notes 122', 'EN_ATTENTE', 127, 124),
(39, '2025-08-09 13:18:25.000000', '2025-08-06 11:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 123', 'Notes 123', 'TERMINE', 139, 134),
(40, '2025-08-09 13:18:25.000000', '2025-08-06 12:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 124', 'Notes 124', 'ANNULE', 81, 110),
(41, '2025-08-09 13:18:25.000000', '2025-08-06 13:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 125', 'Notes 125', 'CONFIRME', 155, 98),
(42, '2025-08-09 13:18:25.000000', '2025-08-06 14:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 126', 'Notes 126', 'EN_ATTENTE', 105, 1),
(43, '2025-08-09 13:18:25.000000', '2025-08-06 15:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 127', 'Notes 127', 'TERMINE', 81, 144),
(44, '2025-08-09 13:18:25.000000', '2025-08-06 16:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 128', 'Notes 128', 'ANNULE', 109, 120),
(45, '2025-08-09 13:18:25.000000', '2025-08-06 17:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 129', 'Notes 129', 'CONFIRME', 2, 1),
(46, '2025-08-09 13:18:25.000000', '2025-08-06 18:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 130', 'Notes 130', 'EN_ATTENTE', 127, 69),
(47, '2025-08-09 13:18:25.000000', '2025-08-06 19:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 131', 'Notes 131', 'TERMINE', 72, 15),
(48, '2025-08-09 13:18:25.000000', '2025-08-06 20:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 132', 'Notes 132', 'ANNULE', 78, 146),
(49, '2025-08-09 13:18:25.000000', '2025-08-06 21:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 133', 'Notes 133', 'CONFIRME', 70, 100),
(50, '2025-08-09 13:18:25.000000', '2025-08-06 22:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 134', 'Notes 134', 'EN_ATTENTE', 17, 126),
(51, '2025-08-09 13:18:25.000000', '2025-08-06 23:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 135', 'Notes 135', 'TERMINE', 85, 124),
(52, '2025-08-09 13:18:25.000000', '2025-08-07 00:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 136', 'Notes 136', 'ANNULE', 157, 140),
(53, '2025-08-09 13:18:25.000000', '2025-08-07 01:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 137', 'Notes 137', 'CONFIRME', 72, 110),
(54, '2025-08-09 13:18:25.000000', '2025-08-07 02:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 138', 'Notes 138', 'EN_ATTENTE', 72, 160),
(55, '2025-08-09 13:18:25.000000', '2025-08-07 03:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 139', 'Notes 139', 'TERMINE', 2, 132),
(56, '2025-08-09 13:18:25.000000', '2025-08-07 04:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 140', 'Notes 140', 'ANNULE', 81, 118),
(57, '2025-08-09 13:18:25.000000', '2025-08-07 05:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 141', 'Notes 141', 'CONFIRME', 117, 140),
(58, '2025-08-09 13:18:25.000000', '2025-08-07 06:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 142', 'Notes 142', 'EN_ATTENTE', 99, 71),
(59, '2025-08-09 13:18:25.000000', '2025-08-07 07:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 143', 'Notes 143', 'TERMINE', 99, 138),
(60, '2025-08-09 13:18:25.000000', '2025-08-07 08:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 144', 'Notes 144', 'ANNULE', 72, 15),
(61, '2025-08-09 13:18:25.000000', '2025-08-07 09:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 145', 'Notes 145', 'CONFIRME', 129, 134),
(62, '2025-08-09 13:18:25.000000', '2025-08-07 10:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 146', 'Notes 146', 'EN_ATTENTE', 107, 156),
(63, '2025-08-09 13:18:25.000000', '2025-08-07 11:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 147', 'Notes 147', 'TERMINE', 97, 138),
(64, '2025-08-09 13:18:25.000000', '2025-08-07 12:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 148', 'Notes 148', 'ANNULE', 85, 86),
(65, '2025-08-09 13:18:25.000000', '2025-08-07 13:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 149', 'Notes 149', 'CONFIRME', 97, 138),
(66, '2025-08-09 13:18:25.000000', '2025-08-07 14:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 150', 'Notes 150', 'EN_ATTENTE', 81, 112),
(67, '2025-08-09 13:18:25.000000', '2025-08-07 15:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 151', 'Notes 151', 'TERMINE', 76, 15),
(68, '2025-08-09 13:18:25.000000', '2025-08-07 16:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 152', 'Notes 152', 'ANNULE', 123, 102),
(69, '2025-08-09 13:18:25.000000', '2025-08-07 17:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 153', 'Notes 153', 'CONFIRME', 135, 152),
(70, '2025-08-09 13:18:25.000000', '2025-08-07 18:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 154', 'Notes 154', 'EN_ATTENTE', 93, 114),
(71, '2025-08-09 13:18:25.000000', '2025-08-07 19:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 155', 'Notes 155', 'TERMINE', 105, 156),
(72, '2025-08-09 13:18:25.000000', '2025-08-07 20:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 156', 'Notes 156', 'ANNULE', 83, 118),
(73, '2025-08-09 13:18:25.000000', '2025-08-07 21:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 157', 'Notes 157', 'CONFIRME', 157, 148),
(74, '2025-08-09 13:18:25.000000', '2025-08-07 22:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 158', 'Notes 158', 'EN_ATTENTE', 137, 152),
(75, '2025-08-09 13:18:25.000000', '2025-08-07 23:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 159', 'Notes 159', 'TERMINE', 85, 146),
(76, '2025-08-09 13:18:25.000000', '2025-08-08 00:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 160', 'Notes 160', 'ANNULE', 77, 118),
(77, '2025-08-09 13:18:25.000000', '2025-08-08 01:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 161', 'Notes 161', 'CONFIRME', 73, 102),
(78, '2025-08-09 13:18:25.000000', '2025-08-08 02:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 162', 'Notes 162', 'EN_ATTENTE', 97, 132),
(79, '2025-08-09 13:18:25.000000', '2025-08-08 03:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 163', 'Notes 163', 'TERMINE', 115, 84),
(80, '2025-08-09 13:18:25.000000', '2025-08-08 04:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 164', 'Notes 164', 'ANNULE', 107, 120),
(81, '2025-08-09 13:18:25.000000', '2025-08-08 05:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 165', 'Notes 165', 'CONFIRME', 77, 88),
(82, '2025-08-09 13:18:25.000000', '2025-08-08 06:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 166', 'Notes 166', 'EN_ATTENTE', 103, 158),
(83, '2025-08-09 13:18:25.000000', '2025-08-08 07:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 167', 'Notes 167', 'TERMINE', 123, 69),
(84, '2025-08-09 13:18:25.000000', '2025-08-08 08:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 168', 'Notes 168', 'ANNULE', 139, 100),
(85, '2025-08-09 13:18:25.000000', '2025-08-08 09:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 169', 'Notes 169', 'CONFIRME', 107, 116),
(86, '2025-08-09 13:18:25.000000', '2025-08-08 10:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 170', 'Notes 170', 'EN_ATTENTE', 87, 106),
(87, '2025-08-09 13:18:25.000000', '2025-08-08 11:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 171', 'Notes 171', 'TERMINE', 2, 71),
(88, '2025-08-09 13:18:25.000000', '2025-08-08 12:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 172', 'Notes 172', 'ANNULE', 77, 82),
(89, '2025-08-09 13:18:25.000000', '2025-08-08 13:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 173', 'Notes 173', 'CONFIRME', 87, 67),
(90, '2025-08-09 13:18:25.000000', '2025-08-08 14:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 174', 'Notes 174', 'EN_ATTENTE', 97, 66),
(91, '2025-08-09 13:18:25.000000', '2025-08-08 15:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 175', 'Notes 175', 'TERMINE', 2, 80),
(92, '2025-08-09 13:18:25.000000', '2025-08-08 16:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 176', 'Notes 176', 'ANNULE', 2, 128),
(93, '2025-08-09 13:18:25.000000', '2025-08-08 17:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 177', 'Notes 177', 'CONFIRME', 143, 106),
(94, '2025-08-09 13:18:25.000000', '2025-08-08 18:00:00.000000', '2025-08-09 13:18:25.000000', 45, 'Motif 178', 'Notes 178', 'EN_ATTENTE', 70, 86),
(95, '2025-08-09 13:18:25.000000', '2025-08-08 19:00:00.000000', '2025-08-09 13:18:25.000000', 60, 'Motif 179', 'Notes 179', 'TERMINE', 157, 144),
(96, '2025-08-09 13:18:25.000000', '2025-08-08 20:00:00.000000', '2025-08-09 13:18:25.000000', 30, 'Motif 180', 'Notes 180', 'ANNULE', 87, 15),
(97, '2025-08-14 16:39:04.000000', '2025-08-14 10:00:00.000000', NULL, 30, 'sdfgh', ',ghjk', 'EN_ATTENTE', 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `specialites`
--

CREATE TABLE `specialites` (
  `id` bigint(20) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `specialites`
--

INSERT INTO `specialites` (`id`, `nom`, `description`) VALUES
(1, 'Cardiologie', NULL),
(2, 'Dermatologie', NULL),
(3, 'Gynécologie', NULL),
(4, 'Pédiatrie', NULL),
(5, 'Neurologie', NULL),
(6, 'Orthopédie', NULL),
(7, 'Ophtalmologie', NULL),
(8, 'ORL', NULL),
(9, 'Gastro-entérologie', NULL),
(10, 'Pneumologie', NULL),
(11, 'Rhumatologie', NULL),
(13, 'Néphrologie', NULL),
(14, 'Hématologie', NULL),
(15, 'Endocrinologie', NULL),
(16, 'Oncologie', NULL),
(17, 'Médecine interne', NULL),
(18, 'Chirurgie générale', NULL),
(19, 'Chirurgie vasculaire', NULL),
(20, 'Anesthésie-Réanimation', NULL),
(21, 'Urologie', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `role` enum('ADMIN','MEDECIN','PATIENT','SECRETAIRE') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `email`, `mot_de_passe`, `nom`, `prenom`, `role`) VALUES
(1, 'amourakrachi@email.com', 'test1234', 'Amourak', 'Rachida', 'PATIENT'),
(2, 'sophie.martin@email.com', 'medecin123', 'Martin', 'Sophiee', 'MEDECIN'),
(3, 'admin@hopital.com', 'motpassadmin', 'Admin', 'Super', 'ADMIN'),
(5, 'marie.secretaire@hopital.com', 'secretaire789', 'Secrétaire', 'Marie', 'ADMIN'),
(8, 'pierre.duboi@email.com', 'dubois456', 'Duboi', 'Pierre', 'MEDECIN'),
(15, 'marie.bernard@email.com', 'marie123', 'Bernard', 'Marie', 'PATIENT'),
(17, 'rachida.amour@email.com', 'dubois4l6', 'Amourak', 'Rachida', 'MEDECIN'),
(18, 'rachidaamourak6@gmail.com', 'FRDV5678', 'Amourak', 'Rachida', 'PATIENT'),
(25, 'aminnada@gmail.com', 'amin_3456', 'nada', 'amin', 'PATIENT'),
(28, 'radia@gmail.com', '2007_rania', 'choubi', 'radia', 'MEDECIN'),
(31, 'rachidaamourak67@gmail.com', '2007_rania5', 'rachida', 'amira', 'PATIENT'),
(66, 'fethzher4@email.com', 'fatiha2009', 'makhchan', 'fathzher', 'PATIENT'),
(67, 'i@email.com', '123456798e', 'nom1', 'prenom1', 'PATIENT'),
(69, 'ht@gmail.com', 'janatr0', 'nom2', 'prenom2', 'PATIENT'),
(70, 'sss@gmail.com', 'janat700', 'nom3', 'prenom3', 'MEDECIN'),
(71, 'hg8@email.com', 'fatiha20097', 'nom4', 'prenom4', 'PATIENT'),
(72, 'hytr7@gmail.com', '2007_rania000', 'nom5', 'prenom5', 'MEDECIN'),
(73, 'nadaamourak3@gmail.com', '65GRDTEZ', 'nom6', 'prenom6', 'MEDECIN'),
(76, 'racfdg@gmail.com', 'dsercvv_eea', 'nom7', 'prenom7', 'MEDECIN'),
(77, 'b@hopital.com', 'RDFGH34567', 'nom8', 'prenom8', 'MEDECIN'),
(78, 'alae@hopital.com', '0000_98765', 'nom9', 'prenom9', 'MEDECIN'),
(79, 'ayou@hopital.com', 'IUHD34567', 'nom10', 'prenom10', 'PATIENT'),
(80, 'sop.k@email.com', 'medecin120', 'nom11', 'prenom11', 'PATIENT'),
(81, 'k@hopital.com', 'ERRFGHD456', 'nom12', 'prenom12', 'MEDECIN'),
(82, 'user101@chu.ma', 'mdp101', 'Nom101', 'Prenom101', 'PATIENT'),
(83, 'user102@chu.ma', 'mdp102', 'Nom102', 'Prenom102', 'MEDECIN'),
(84, 'user103@chu.ma', 'mdp103', 'Nom103', 'Prenom103', 'PATIENT'),
(85, 'user104@chu.ma', 'mdp104', 'Nom104', 'Prenom104', 'MEDECIN'),
(86, 'user105@chu.ma', 'mdp105', 'Nom105', 'Prenom105', 'PATIENT'),
(87, 'user106@chu.ma', 'mdp106', 'Nom106', 'Prenom106', 'MEDECIN'),
(88, 'user107@chu.ma', 'mdp107', 'Nom107', 'Prenom107', 'PATIENT'),
(89, 'user108@chu.ma', 'mdp108', 'Nom108', 'Prenom108', 'MEDECIN'),
(90, 'user109@chu.ma', 'mdp109', 'Nom109', 'Prenom109', 'PATIENT'),
(91, 'user110@chu.ma', 'mdp110', 'Nom110', 'Prenom110', 'ADMIN'),
(92, 'user111@chu.ma', 'mdp111', 'Nom111', 'Prenom111', 'PATIENT'),
(93, 'user112@chu.ma', 'mdp112', 'Nom112', 'Prenom112', 'MEDECIN'),
(94, 'user113@chu.ma', 'mdp113', 'Nom113', 'Prenom113', 'PATIENT'),
(95, 'user114@chu.ma', 'mdp114', 'Nom114', 'Prenom114', 'MEDECIN'),
(96, 'user115@chu.ma', 'mdp115', 'Nom115', 'Prenom115', 'PATIENT'),
(97, 'user116@chu.ma', 'mdp116', 'Nom116', 'Prenom116', 'MEDECIN'),
(98, 'user117@chu.ma', 'mdp117', 'Nom117', 'Prenom117', 'PATIENT'),
(99, 'user118@chu.ma', 'mdp118', 'Nom118', 'Prenom118', 'MEDECIN'),
(100, 'user119@chu.ma', 'mdp119', 'Nom119', 'Prenom119', 'PATIENT'),
(101, 'user120@chu.ma', 'mdp120', 'Nom120', 'Prenom120', 'ADMIN'),
(102, 'user121@chu.ma', 'mdp121', 'Nom121', 'Prenom121', 'PATIENT'),
(103, 'user122@chu.ma', 'mdp122', 'Nom122', 'Prenom122', 'MEDECIN'),
(104, 'user123@chu.ma', 'mdp123', 'Nom123', 'Prenom123', 'PATIENT'),
(105, 'user124@chu.ma', 'mdp124', 'Nom124', 'Prenom124', 'MEDECIN'),
(106, 'user125@chu.ma', 'mdp125', 'Nom125', 'Prenom125', 'PATIENT'),
(107, 'user126@chu.ma', 'mdp126', 'Nom126', 'Prenom126', 'MEDECIN'),
(108, 'user127@chu.ma', 'mdp127', 'Nom127', 'Prenom127', 'PATIENT'),
(109, 'user128@chu.ma', 'mdp128', 'Nom128', 'Prenom128', 'MEDECIN'),
(110, 'user129@chu.ma', 'mdp129', 'Nom129', 'Prenom129', 'PATIENT'),
(111, 'user130@chu.ma', 'mdp130', 'Nom130', 'Prenom130', 'ADMIN'),
(112, 'user131@chu.ma', 'mdp131', 'Nom131', 'Prenom131', 'PATIENT'),
(113, 'user132@chu.ma', 'mdp132', 'Nom132', 'Prenom132', 'MEDECIN'),
(114, 'user133@chu.ma', 'mdp133', 'Nom133', 'Prenom133', 'PATIENT'),
(115, 'user134@chu.ma', 'mdp134', 'Nom134', 'Prenom134', 'MEDECIN'),
(116, 'user135@chu.ma', 'mdp135', 'Nom135', 'Prenom135', 'PATIENT'),
(117, 'user136@chu.ma', 'mdp136', 'Nom136', 'Prenom136', 'MEDECIN'),
(118, 'user137@chu.ma', 'mdp137', 'Nom137', 'Prenom137', 'PATIENT'),
(119, 'user138@chu.ma', 'mdp138', 'Nom138', 'Prenom138', 'MEDECIN'),
(120, 'user139@chu.ma', 'mdp139', 'Nom139', 'Prenom139', 'PATIENT'),
(121, 'user140@chu.ma', 'mdp140', 'Nom140', 'Prenom140', 'ADMIN'),
(122, 'user141@chu.ma', 'mdp141', 'Nom141', 'Prenom141', 'PATIENT'),
(123, 'user142@chu.ma', 'mdp142', 'Nom142', 'Prenom142', 'MEDECIN'),
(124, 'user143@chu.ma', 'mdp143', 'Nom143', 'Prenom143', 'PATIENT'),
(125, 'user144@chu.ma', 'mdp144', 'Nom144', 'Prenom144', 'MEDECIN'),
(126, 'user145@chu.ma', 'mdp145', 'Nom145', 'Prenom145', 'PATIENT'),
(127, 'user146@chu.ma', 'mdp146', 'Nom146', 'Prenom146', 'MEDECIN'),
(128, 'user147@chu.ma', 'mdp147', 'Nom147', 'Prenom147', 'PATIENT'),
(129, 'user148@chu.ma', 'mdp148', 'Nom148', 'Prenom148', 'MEDECIN'),
(130, 'user149@chu.ma', 'mdp149', 'Nom149', 'Prenom149', 'PATIENT'),
(131, 'user150@chu.ma', 'mdp150', 'Nom150', 'Prenom150', 'ADMIN'),
(132, 'user151@chu.ma', 'mdp151', 'Nom151', 'Prenom151', 'PATIENT'),
(133, 'user152@chu.ma', 'mdp152', 'Nom152', 'Prenom152', 'MEDECIN'),
(134, 'user153@chu.ma', 'mdp153', 'Nom153', 'Prenom153', 'PATIENT'),
(135, 'user154@chu.ma', 'mdp154', 'Nom154', 'Prenom154', 'MEDECIN'),
(136, 'user155@chu.ma', 'mdp155', 'Nom155', 'Prenom155', 'PATIENT'),
(137, 'user156@chu.ma', 'mdp156', 'Nom156', 'Prenom156', 'MEDECIN'),
(138, 'user157@chu.ma', 'mdp157', 'Nom157', 'Prenom157', 'PATIENT'),
(139, 'user158@chu.ma', 'mdp158', 'Nom158', 'Prenom158', 'MEDECIN'),
(140, 'user159@chu.ma', 'mdp159', 'Nom159', 'Prenom159', 'PATIENT'),
(141, 'user160@chu.ma', 'mdp160', 'Nom160', 'Prenom160', 'ADMIN'),
(142, 'user161@chu.ma', 'mdp161', 'Nom161', 'Prenom161', 'PATIENT'),
(143, 'user162@chu.ma', 'mdp162', 'Nom162', 'Prenom162', 'MEDECIN'),
(144, 'user163@chu.ma', 'mdp163', 'Nom163', 'Prenom163', 'PATIENT'),
(145, 'user164@chu.ma', 'mdp164', 'Nom164', 'Prenom164', 'MEDECIN'),
(146, 'user165@chu.ma', 'mdp165', 'Nom165', 'Prenom165', 'PATIENT'),
(147, 'user166@chu.ma', 'mdp166', 'Nom166', 'Prenom166', 'MEDECIN'),
(148, 'user167@chu.ma', 'mdp167', 'Nom167', 'Prenom167', 'PATIENT'),
(149, 'user168@chu.ma', 'mdp168', 'Nom168', 'Prenom168', 'MEDECIN'),
(150, 'user169@chu.ma', 'mdp169', 'Nom169', 'Prenom169', 'PATIENT'),
(151, 'user170@chu.ma', 'mdp170', 'Nom170', 'Prenom170', 'ADMIN'),
(152, 'user171@chu.ma', 'mdp171', 'Nom171', 'Prenom171', 'PATIENT'),
(153, 'user172@chu.ma', 'mdp172', 'Nom172', 'Prenom172', 'MEDECIN'),
(154, 'user173@chu.ma', 'mdp173', 'Nom173', 'Prenom173', 'PATIENT'),
(155, 'user174@chu.ma', 'mdp174', 'Nom174', 'Prenom174', 'MEDECIN'),
(156, 'user175@chu.ma', 'mdp175', 'Nom175', 'Prenom175', 'PATIENT'),
(157, 'user176@chu.ma', 'mdp176', 'Nom176', 'Prenom176', 'MEDECIN'),
(158, 'user177@chu.ma', 'mdp177', 'Nom177', 'Prenom177', 'PATIENT'),
(159, 'user178@chu.ma', 'mdp178', 'Nom178', 'Prenom178', 'MEDECIN'),
(160, 'user179@chu.ma', 'mdp179', 'Nom179', 'Prenom179', 'PATIENT'),
(161, 'user180@chu.ma', 'mdp180', 'Nom180', 'Prenom180', 'ADMIN');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `disponibilites`
--
ALTER TABLE `disponibilites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKqoc1t15o6r3c5o7je3pabtbmi` (`medecin_id`);

--
-- Index pour la table `medecins`
--
ALTER TABLE `medecins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK2k73cdgp9q9cki6rric013tru` (`numerorpps`);

--
-- Index pour la table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKoa7u91bb1wl5i7buquini6kxy` (`numero_secu`);

--
-- Index pour la table `rendez_vous`
--
ALTER TABLE `rendez_vous`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKc1mshq5ib0t3tndf5d6fr1qak` (`medecin_id`),
  ADD KEY `FKcyws9jnfdbx7t2cedqi2r71id` (`patient_id`);

--
-- Index pour la table `specialites`
--
ALTER TABLE `specialites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nom` (`nom`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK6ldvumu3hqvnmmxy1b6lsxwqy` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `disponibilites`
--
ALTER TABLE `disponibilites`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT pour la table `rendez_vous`
--
ALTER TABLE `rendez_vous`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT pour la table `specialites`
--
ALTER TABLE `specialites`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=164;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `FKryy5uqya668cermkbky8yjkqc` FOREIGN KEY (`id`) REFERENCES `utilisateurs` (`id`);

--
-- Contraintes pour la table `disponibilites`
--
ALTER TABLE `disponibilites`
  ADD CONSTRAINT `FKqoc1t15o6r3c5o7je3pabtbmi` FOREIGN KEY (`medecin_id`) REFERENCES `medecins` (`id`);

--
-- Contraintes pour la table `medecins`
--
ALTER TABLE `medecins`
  ADD CONSTRAINT `FKkjhmopx1y66139mt1efa1iprk` FOREIGN KEY (`id`) REFERENCES `utilisateurs` (`id`);

--
-- Contraintes pour la table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `FKahmxi7dapt9pwfqvrqjdmpuhc` FOREIGN KEY (`id`) REFERENCES `utilisateurs` (`id`);

--
-- Contraintes pour la table `rendez_vous`
--
ALTER TABLE `rendez_vous`
  ADD CONSTRAINT `FKc1mshq5ib0t3tndf5d6fr1qak` FOREIGN KEY (`medecin_id`) REFERENCES `medecins` (`id`),
  ADD CONSTRAINT `FKcyws9jnfdbx7t2cedqi2r71id` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
