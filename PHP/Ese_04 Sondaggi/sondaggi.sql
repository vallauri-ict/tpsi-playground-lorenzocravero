-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 28, 2021 alle 13:06
-- Versione del server: 10.4.6-MariaDB
-- Versione PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `4b_sondaggi`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `sondaggi`
--

DROP TABLE IF EXISTS `sondaggi`;
CREATE TABLE `sondaggi` (
  `id` int(11) NOT NULL,
  `titolo` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domanda` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nSi` int(11) NOT NULL,
  `nNo` int(11) NOT NULL,
  `nNs` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `sondaggi`
--

INSERT INTO `sondaggi` (`id`, `titolo`, `domanda`, `img`, `nSi`, `nNo`, `nNs`) VALUES
(1, 'Tecnologia', 'Sei d\'accordo con lo sviluppo della tecnologia?', 'img1.jfif', 0, 0, 0),
(2, 'Medicina', 'Sei d\'accordo con lo sviluppo della medicina?', 'img2.jfif', 0, 0, 0),
(3, 'Scienza', 'Sei d\'accordo con lo sviluppo della scienza?', 'img3.jfif', 0, 0, 0);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `sondaggi`
--
ALTER TABLE `sondaggi`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `sondaggi`
--
ALTER TABLE `sondaggi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
