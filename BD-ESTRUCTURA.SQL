-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-02-2019 a las 20:07:41
-- Versión del servidor: 10.1.36-MariaDB
-- Versión de PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de datos: `preguntame`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generostipo`
--

CREATE TABLE `generostipo` (
  `id` smallint(6) NOT NULL,
  `descripcion` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `generostipo`
--

INSERT INTO `generostipo` (`id`, `descripcion`) VALUES
(0, 'No especificado'),
(1, 'Masculino'),
(2, 'Femenino'),
(3, 'Otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `tipo` int(2) NOT NULL,
  `url` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `userID`, `tipo`, `url`) VALUES
(1, 1, 1, 'perfil.jpg\r\n'),
(4, 14, 1, 'no-user.png'),
(5, 15, 1, 'no-user.png'),
(6, 16, 1, 'no-user.png'),
(7, 17, 1, 'no-user.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenestipo`
--

CREATE TABLE `imagenestipo` (
  `id` int(4) NOT NULL,
  `tipo` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `imagenestipo`
--

INSERT INTO `imagenestipo` (`id`, `tipo`) VALUES
(1, 'perfil');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `texto` mediumtext NOT NULL,
  `shares` int(11) NOT NULL,
  `likes` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `esREPOST` int(1) NOT NULL DEFAULT '0',
  `idREPOST` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id`, `userID`, `texto`, `shares`, `likes`, `fecha`, `esREPOST`, `idREPOST`) VALUES
(1, 1, 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd', 1, 1, '2019-02-11 04:29:01', 0, 0),
(2, 1, 'asdasd', 0, 0, '2019-02-11 04:30:40', 1, 1),
(3, 1, 'asdasd', 0, 0, '2019-02-11 04:30:40', 0, 0),
(4, 1, 'asdasd', 0, 0, '2019-02-11 04:30:40', 0, 0),
(5, 1, 'asfasf', 0, 0, '2019-02-11 00:46:05', 0, 0),
(6, 1, 'asfasf', 0, 0, '2019-02-11 00:46:23', 0, 0),
(7, 1, 'asdasd', 0, 0, '2019-02-11 02:27:48', 0, 0),
(8, 1, 'asdasd', 0, 0, '2019-02-11 03:21:31', 0, 0),
(9, 1, 'asdad', 0, 0, '2019-02-11 03:21:34', 0, 0),
(10, 1, 'asdasdasd', 0, 0, '2019-02-11 03:21:36', 0, 0),
(11, 1, 'adasd', 0, 0, '2019-02-11 05:22:04', 0, 0),
(12, 17, 'Prueba\r\na', 0, 0, '2019-02-11 05:23:25', 0, 0),
(13, 17, 'asdasd', 0, 0, '2019-02-11 06:03:48', 0, 0),
(14, 17, 'asd', 0, 0, '2019-02-11 06:04:57', 0, 0),
(15, 1, 'hola', 0, 0, '2019-02-11 14:58:34', 0, 0),
(16, 1, 'hola', 0, 0, '2019-02-11 15:00:07', 0, 0),
(17, 1, 'hola', 0, 0, '2019-02-11 15:00:40', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `id` int(11) NOT NULL,
  `EmisorID` int(11) NOT NULL,
  `ReceptorID` int(11) NOT NULL,
  `Pregunta` mediumtext NOT NULL,
  `Anonimato` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguimientos`
--

CREATE TABLE `seguimientos` (
  `userID_emisor` int(11) NOT NULL,
  `userID_receptor` int(11) NOT NULL,
  `fecha` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(30) NOT NULL,
  `clave` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `header` varchar(250) NOT NULL,
  `genero` smallint(6) NOT NULL,
  `seguidos` int(11) NOT NULL,
  `seguidores` int(11) NOT NULL,
  `preguntas` int(11) NOT NULL,
  `preguntas_respondidas` int(11) NOT NULL,
  `preguntas_rechazadas` int(11) NOT NULL,
  `preguntas_puntaje` int(11) NOT NULL,
  `posts` int(11) NOT NULL,
  `reposts` int(11) NOT NULL,
  `favoritos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `clave`, `nombre`, `header`, `genero`, `seguidos`, `seguidores`, `preguntas`, `preguntas_respondidas`, `preguntas_rechazadas`, `preguntas_puntaje`, `posts`, `reposts`, `favoritos`) VALUES
(1, 'julian', '123', 'Julian Sodo', ' La comunicación como base del éxito. FullStack Developer. http://jvsdigital.com ', 0, 0, 0, 0, 0, 0, 0, 10, 0, 0),
(14, 'Roberto', '123', 'Roberto', '', 0, 0, 0, 0, 0, 0, 0, 7, 0, 0),
(15, 'Carlos', '5125', 'Carlitos', '', 0, 0, 0, 0, 0, 0, 0, 7, 0, 0),
(16, 'Romeo', '123', 'Romeo', '', 0, 0, 0, 0, 0, 0, 0, 7, 0, 0),
(17, 'chu', '123', 'Chulian', '', 0, 0, 0, 0, 0, 0, 0, 6, 0, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;
