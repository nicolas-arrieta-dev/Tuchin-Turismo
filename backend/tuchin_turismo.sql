-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-07-2025 a las 00:21:35
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tuchin_turismo`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`` PROCEDURE `actualizar_contacto` (IN `nuevo_contacto` VARCHAR(255))   BEGIN
    UPDATE admin
    SET contacto = nuevo_contacto
    WHERE id = 1;
END$$

CREATE DEFINER=`` PROCEDURE `Actualizar_orden_excepto_principal` ()   BEGIN
    UPDATE imagenes_galeria
    SET orden = NULL
    WHERE orden IS NOT NULL AND orden <> 'P';
END$$

CREATE DEFINER=`` PROCEDURE `Actualizar_orden_excepto_S` ()   BEGIN
  UPDATE imagenes_galeria
  SET orden = NULL
  WHERE orden IS NOT NULL AND orden != 'S';
END$$

CREATE DEFINER=`` PROCEDURE `Actualizar_orden_galeria` (IN `p_id` INT, IN `p_orden` VARCHAR(100))   BEGIN
    UPDATE imagenes_galeria
    SET orden = p_orden
    WHERE id = p_id;
END$$

CREATE DEFINER=`` PROCEDURE `Actualizar_orden_imagen` (IN `p_id` INT)   BEGIN
    UPDATE imagenes_galeria
    SET orden = NULL
    WHERE id = p_id;
END$$

CREATE DEFINER=`` PROCEDURE `Agregar_Contacto` (IN `p_nombre` VARCHAR(100), IN `p_email` VARCHAR(100), IN `p_celular` VARCHAR(20), IN `p_mensaje` TEXT, IN `p_fecha_hora` VARCHAR(100))   BEGIN
  INSERT INTO  mensajes_contacto (
    nombre,
    email,
    celular,
    mensaje,
    fecha_hora
  ) VALUES (
    p_nombre,
    p_email,
    p_celular,
    p_mensaje,
    p_fecha_hora
  );
END$$

CREATE DEFINER=`` PROCEDURE `Agregar_experiencia_basica` (IN `p_titulo` VARCHAR(255), IN `p_descripcion` TEXT, IN `p_imagen` VARCHAR(255))   BEGIN
    INSERT INTO experiencias (
        titulo,
        descripcion,
        imagen,
        nombre,
        duracion,
        precio,
        tipo_experiencia
    ) VALUES (
        p_titulo,
        p_descripcion,
        p_imagen,
        NULL,
        NULL,
        NULL,
        NULL
    );
END$$

CREATE DEFINER=`` PROCEDURE `agregar_producto_artesanal` (IN `p_artesano_id` VARCHAR(255), IN `p_nombre_producto` VARCHAR(255), IN `p_descripcion` TEXT, IN `p_precio` VARCHAR(225), IN `p_imagen` VARCHAR(255))   BEGIN
    INSERT INTO productos_artesanales (
        artesano_id,
        nombre_producto,
        descripcion,
        precio,
        imagen
    ) VALUES (
        p_artesano_id,
        p_nombre_producto,
        p_descripcion,
        p_precio,
        p_imagen
    );
END$$

CREATE DEFINER=`` PROCEDURE `Buscar_img_por_orden_Principal` ()   BEGIN
    SELECT 
        id,
        seccion,
        titulo,
        ruta_imagen,
        descripcion,
        orden
    FROM imagenes_galeria
    WHERE orden = "P"
    LIMIT 1;
END$$

CREATE DEFINER=`` PROCEDURE `Consultar_img_secundarias` ()   BEGIN
    SELECT * FROM imagenes_galeria
    WHERE orden = 'S'
    ORDER BY id ASC;
END$$

CREATE DEFINER=`` PROCEDURE `contacto` ()   BEGIN
SELECT contacto FROM admin WHERE id = 1;
END$$

CREATE DEFINER=`` PROCEDURE `Eliminar_Evento` (IN `p_id` INT)   BEGIN
    DELETE FROM eventos WHERE id = p_id;
END$$

CREATE DEFINER=`` PROCEDURE `Eliminar_experiencia` (IN `p_id` INT)   BEGIN
    DELETE FROM experiencias
    WHERE id = p_id;
END$$

CREATE DEFINER=`` PROCEDURE `Eliminar_Imagenes_por_Ids` (IN `lista_ids` TEXT)   BEGIN
  SET @query = CONCAT('DELETE FROM imagenes_galeria WHERE FIND_IN_SET(id, ?)');
  PREPARE stmt FROM @query;
  EXECUTE stmt USING lista_ids;
  DEALLOCATE PREPARE stmt;
END$$

CREATE DEFINER=`` PROCEDURE `eliminar_producto_artesanal` (IN `p_id` INT)   BEGIN
  DELETE FROM productos_artesanales
  WHERE id = p_id;
END$$

CREATE DEFINER=`` PROCEDURE `Ingresar_img_principal` (IN `p_imagen` VARCHAR(100), IN `p_orden` VARCHAR(100))   BEGIN
	INSERT INTO imagenes_galeria (
        ruta_imagen , orden
    )
    
    VALUES (p_imagen, p_orden);
END$$

CREATE DEFINER=`` PROCEDURE `Insertar_evento_simple` (IN `p_icono` VARCHAR(10), IN `p_titulo` VARCHAR(100), IN `p_descripcion` VARCHAR(100), IN `p_fecha` VARCHAR(100))   BEGIN
    INSERT INTO eventos (icono, titulo, descripcion, fecha)
    VALUES (p_icono, p_titulo, p_descripcion, p_fecha);
END$$

CREATE DEFINER=`` PROCEDURE `Insertar_Imagen` (IN `p_ruta_imagen` VARCHAR(255))   BEGIN
    INSERT INTO imagenes_galeria (ruta_imagen)
    VALUES (p_ruta_imagen);
END$$

CREATE DEFINER=`` PROCEDURE `Insertar_mensaje_contacto` (IN `p_nombre` VARCHAR(100), IN `p_email` VARCHAR(100), IN `p_celular` VARCHAR(20), IN `p_mensaje` VARCHAR(100), IN `p_seccion_origen` VARCHAR(100), IN `p_fecha_hora` VARCHAR(100))   BEGIN
    INSERT INTO mensajes_contacto (
         nombre, email, celular, mensaje, seccion_origen, fecha_hora
    ) VALUES (
         p_nombre, p_email, p_celular, p_mensaje, p_seccion_origen, p_fecha_hora
    );
END$$

CREATE DEFINER=`` PROCEDURE `insertar_testimonio` (IN `p_nombre` VARCHAR(100), IN `p_origen` VARCHAR(100), IN `p_comentario` TEXT, IN `p_calificacion` VARCHAR(100), IN `p_fecha` VARCHAR(100))   BEGIN
  INSERT INTO testimonios (nombre, origen, comentario, calificacion, fecha)
  VALUES (p_nombre, p_origen, p_comentario, p_calificacion, p_fecha);
END$$

CREATE DEFINER=`` PROCEDURE `mostrar_todo_artesanias` ()   BEGIN
SELECT 
  p.*,
  t.nombre AS nombre_tienda,
  t.telefono
FROM productos_artesanales p
JOIN tiendas t ON p.artesano_id = t.id;
END$$

CREATE DEFINER=`` PROCEDURE `Mostrar_todo_evento` ()   BEGIN
SELECT * FROM eventos;
END$$

CREATE DEFINER=`` PROCEDURE `Mostrar_todo_experiencias` ()   BEGIN
SELECT * FROM experiencias;
END$$

CREATE DEFINER=`` PROCEDURE `Mostrar_todo_galeria` ()   BEGIN
SELECT * from imagenes_galeria;
END$$

CREATE DEFINER=`` PROCEDURE `mostrar_todo_testimonio` ()   BEGIN
SELECT * from testimonios;
END$$

CREATE DEFINER=`` PROCEDURE `mostrar_todo_tiendas` ()   BEGIN
SELECT * FROM tiendas;
END$$

CREATE DEFINER=`` PROCEDURE `Validar_usuario` (IN `p_usuario` VARCHAR(100), IN `p_password` VARCHAR(100))   BEGIN
  SELECT id, usuario, nombre
  FROM admin
  WHERE usuario = p_usuario AND password = p_password
  LIMIT 1;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id` int(100) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `contacto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id`, `usuario`, `password`, `nombre`, `contacto`) VALUES
(1, 'admin@admin.com', '123456', 'Nuevo Admin', '3205290685');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `icono` varchar(100) DEFAULT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha` varchar(100) DEFAULT NULL,
  `lugar` varchar(100) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `tipo_evento` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `icono`, `titulo`, `descripcion`, `fecha`, `lugar`, `imagen`, `tipo_evento`) VALUES
(2, '👴', 'Encuentro de Sabedores Ancestrales', 'Diálogos intergeneracionales donde los mayores comparten sus conocimientos sobre técnicas artesanales, medicina tradicional y cosmovisión Zenú.\"', 'Julio de cada año', NULL, NULL, NULL),
(4, '🎩', 'Festival del Sombrero Vueltiao', 'Celebración que rinde homenaje a la pieza artesanal más representativa de la región. Incluye concurs', 'Octubre de cada año', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `experiencias`
--

CREATE TABLE `experiencias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `duracion` varchar(50) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `tipo_experiencia` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `experiencias`
--

INSERT INTO `experiencias` (`id`, `nombre`, `titulo`, `descripcion`, `duracion`, `precio`, `imagen`, `tipo_experiencia`) VALUES
(1, 'Experiencia 1', 'Taller de Tejeduría', 'Participa en talleres vivenciales con maestros artesanos del sombrero vueltiao. Aprende las técnicas ancestrales de tejido en caña flecha.', NULL, NULL, 'weaving-workshop.jpg', NULL),
(2, 'Experiencia 2', 'Ruta del Sombrero Vueltiao', 'Recorre los talleres artesanales y conoce el proceso completo de elaboración del símbolo cultural de Colombia, desde la materia prima hasta el producto final.', NULL, NULL, 'hat-route.jpg', NULL),
(3, 'Experiencia 3', 'Cerro de Tofeme', 'Disfruta de una caminata ecológica por este cerro sagrado para la comunidad Zenú, con impresionantes vistas panorámicas de la región.', NULL, NULL, 'tofeme-hill.jpg', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes_galeria`
--

CREATE TABLE `imagenes_galeria` (
  `id` int(11) NOT NULL,
  `seccion` varchar(50) DEFAULT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `ruta_imagen` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `orden` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `imagenes_galeria`
--

INSERT INTO `imagenes_galeria` (`id`, `seccion`, `titulo`, `ruta_imagen`, `descripcion`, `orden`) VALUES
(1, NULL, NULL, 'hat-route.jpg', NULL, ''),
(2, NULL, NULL, 'tofeme-hill.jpg', NULL, ''),
(3, NULL, NULL, 'weaving-workshop.jpg', NULL, ''),
(45, NULL, NULL, 'tuchin-market.jpg', NULL, 'P'),
(46, NULL, NULL, 'vueltiao-hat.jpg', NULL, 'S'),
(47, NULL, NULL, 'zenu-artisan.jpg', NULL, 'S'),
(59, NULL, NULL, 'Sombrero_Vueltiao.jpg', NULL, ''),
(60, NULL, NULL, 'Mochila_Arhuaca.jpg', NULL, ''),
(61, NULL, NULL, 'Bolsito.jpg', NULL, ''),
(62, NULL, NULL, 'Sombrero_con_la_tricolor.jpg', NULL, ''),
(63, NULL, NULL, 'Sombrero_Vueltiao_rojo.jpg', NULL, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes_contacto`
--

CREATE TABLE `mensajes_contacto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `celular` varchar(100) NOT NULL,
  `mensaje` text NOT NULL,
  `seccion_origen` varchar(50) DEFAULT NULL,
  `fecha_hora` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `mensajes_contacto`
--

INSERT INTO `mensajes_contacto` (`id`, `nombre`, `email`, `celular`, `mensaje`, `seccion_origen`, `fecha_hora`) VALUES
(11, 'NICOLAS ALFONSO ARRIETA BOLAÑO', 'yinaryacosta@gmail.com', '3001234567', 'asdasd', NULL, '2025-07-12 13:16:02.718'),
(12, 'NICOLAS ALFONSO ARRIETA BOLAÑO', 'carlos.garcia@example.com', '1231231231230', 'asdasdasdasd', NULL, '2025-07-15 12:21:43.612'),
(13, 'NICOLAS ALFONSO ARRIETA BOLAÑO', 'carlos.garcia@example.com', '3024146394', 'qweqweq', NULL, '2025-07-15 12:43:12.629'),
(14, 'NICOLAS ALFONSO ARRIETA BOLAÑO', 'carlos.garcia@example.com', '3001234567', 'asdasdasd', NULL, '2025-07-15 12:45:06.379');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_artesanales`
--

CREATE TABLE `productos_artesanales` (
  `id` int(11) NOT NULL,
  `artesano_id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `nombre_producto` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos_artesanales`
--

INSERT INTO `productos_artesanales` (`id`, `artesano_id`, `titulo`, `nombre_producto`, `descripcion`, `precio`, `imagen`) VALUES
(1, 1, '', 'Sombrero Vueltiao', 'Sombrero tradicional Zenú, tejido a mano', 150000.00, 'Sombrero_Vueltiao.jpg'),
(4, 2, '', 'Mochila Arhuaca', 'Mochila tejida con diseños tradicionales', 120000.00, 'Mochila_Arhuaca.jpg'),
(5, 3, '', 'Bolsito', 'Pulseras artesanales con chaquiras multicolores', 45000.00, 'Bolsito.jpg'),
(6, 1, '', 'Sombrero con la Tricolor', 'Canastos y bandejas tejidas en caña flecha', 80000.00, 'Sombrero_con_la_tricolor.jpg'),
(7, 2, '', 'Sombrero Vueltiao rojo', 'Collares y aretes elaborados con tagua', 75000.00, 'Sombrero_Vueltiao_rojo.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `testimonios`
--

CREATE TABLE `testimonios` (
  `id` int(255) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `origen` varchar(100) NOT NULL,
  `comentario` varchar(100) NOT NULL,
  `calificacion` varchar(100) NOT NULL,
  `fecha` varchar(100) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `testimonios`
--

INSERT INTO `testimonios` (`id`, `nombre`, `origen`, `comentario`, `calificacion`, `fecha`, `imagen`) VALUES
(1, 'María González', 'Bogotá, Colombia', 'Las artesanías de Tuchín son auténticas obras de arte. Compré un sombrero vueltiao y la calidad es e', '5', NULL, NULL),
(2, 'Carlos Mendoza', 'Medellín, Colombia', 'La experiencia cultural fue increíble. Los artesanos son muy amables y explican todo el proceso de c', '4', NULL, NULL),
(3, 'Ana Torres', 'Cali, Colombia', 'Visité Tuchín el mes pasado y quedé maravillada con la riqueza cultural. Las mochilas arhuacas que c', '4', NULL, NULL),
(4, 'James Wilson', 'Nueva York, USA', 'Asombrosa cultura indígena preservada. Las artesanías son de alta calidad y los precios justos. Un m', '5', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiendas`
--

CREATE TABLE `tiendas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `ubicacion` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tiendas`
--

INSERT INTO `tiendas` (`id`, `nombre`, `telefono`, `email`, `ubicacion`, `descripcion`, `imagen`) VALUES
(1, 'Tienda La Montaña', '3124567890', 'montana@tiendas.co', 'Calle 45 #10', 'Especializada en productos orgánicos y naturales', NULL),
(2, 'Artesanias donde jorge', '3109876543', 'contacto@electrohogar.com', 'Carrera 22 #5-30', 'Venta de electrodomésticos y tecnología', NULL),
(3, 'Moda Artesana', '3001122334', 'info@modaexpress.co', 'Av. 68 #30-21', 'Ropa y accesorios para toda la familia', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `experiencias`
--
ALTER TABLE `experiencias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `imagenes_galeria`
--
ALTER TABLE `imagenes_galeria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mensajes_contacto`
--
ALTER TABLE `mensajes_contacto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos_artesanales`
--
ALTER TABLE `productos_artesanales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artesano_id` (`artesano_id`);

--
-- Indices de la tabla `testimonios`
--
ALTER TABLE `testimonios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `experiencias`
--
ALTER TABLE `experiencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `imagenes_galeria`
--
ALTER TABLE `imagenes_galeria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT de la tabla `mensajes_contacto`
--
ALTER TABLE `mensajes_contacto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `productos_artesanales`
--
ALTER TABLE `productos_artesanales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `testimonios`
--
ALTER TABLE `testimonios`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos_artesanales`
--
ALTER TABLE `productos_artesanales`
  ADD CONSTRAINT `productos_artesanales_ibfk_1` FOREIGN KEY (`artesano_id`) REFERENCES `tiendas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
