///////////////////////////- Ingresar mensaje_contacto -///////////////////////////
DELIMITER //

CREATE PROCEDURE Insertar_mensaje_contacto (
    IN p_nombre VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_celular VARCHAR(20),
    IN p_mensaje VARCHAR(100),
    IN p_seccion_origen VARCHAR(100),
    IN p_fecha_hora VARCHAR(100)
)
BEGIN
    INSERT INTO mensajes_contacto (
         nombre, email, celular, mensaje, seccion_origen, fecha_hora
    ) VALUES (
         p_nombre, p_email, p_celular, p_mensaje, p_seccion_origen, p_fecha_hora
    );
END
///////////////////////////- Ingresar imagen principal -///////////////////////////
DELIMITER //
CREATE PROCEDURE Ingresar_img_principal( 
    IN p_imagen VARCHAR(100),
    IN p_orden VARCHAR(100)
)
BEGIN
	INSERT INTO imagenes_galeria (
        ruta_imagen , orden
    )
    
    VALUES (p_imagen, p_orden);
END
///////////////////////////// Buscar orden principal /////////////////////////////
DELIMITER //

CREATE PROCEDURE Buscar_img_por_orden_Principal ()
BEGIN
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
END
//////////////////////////// Actualizar imagen principal /////////////////////////////
DELIMITER //

CREATE PROCEDURE Actualizar_orden_imagen (
    IN p_id INT
)
BEGIN
    UPDATE imagenes_galeria
    SET orden = NULL
    WHERE id = p_id;
END
///////////////////////// Actualizar imagen secundaria ///////////////////////////
DELIMITER //

CREATE PROCEDURE Actualizar_orden_excepto_principal()
BEGIN
    UPDATE imagenes_galeria
    SET orden = NULL
    WHERE orden IS NOT NULL AND orden <> 'P';
END 
///////////////////////////// Buscar imagenes por orden secundaria /////////////////////////////
DELIMITER //

CREATE PROCEDURE Consultar_img_secundarias()
BEGIN
    SELECT * FROM imagenes_galeria
    WHERE orden = 'S'
    ORDER BY id ASC;
END 
////////////////////////// validar usuario ///////////////////////////
DELIMITER //

CREATE PROCEDURE Validar_usuario (
  IN p_usuario VARCHAR(100),
  IN p_password VARCHAR(100)
)
BEGIN
  SELECT id, usuario, nombre
  FROM admin
  WHERE usuario = p_usuario AND password = p_password
  LIMIT 1;
END 
////////////////////////////// Mostrar todo experiencias /////////////////////////////
DELIMITER //
CREATE PROCEDURE Mostrar_todo_experiencias()
BEGIN
SELECT * FROM experiencias;
END
///////////////////////////// ingresar experiencia /////////////////////////////
DELIMITER //

CREATE PROCEDURE Agregar_experiencia_basica (
    IN p_titulo VARCHAR(255),
    IN p_descripcion TEXT,
    IN p_imagen VARCHAR(255)
)
BEGIN
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
END 
///////////////////////// eliminar experiencia ///////////////////////////
DELIMITER //

CREATE PROCEDURE Eliminar_experiencia(
    IN p_id INT
)
BEGIN
    DELETE FROM experiencias
    WHERE id = p_id;
END 
//////////////////////// Mostrar todo eventos ////////////////////////
DELIMITER //
CREATE PROCEDURE Mostrar_todo_evento()
BEGIN
SELECT * FROM eventos;
END
//////////////////////// ingresar evento ////////////////////////
DELIMITER //

CREATE PROCEDURE Insertar_evento_simple (
    IN p_icono VARCHAR(10),
    IN p_titulo VARCHAR(100),
    IN p_descripcion TEXT,
    IN p_fecha VARCHAR(100)
)
BEGIN
    INSERT INTO eventos (icono, titulo, descripcion, fecha)
    VALUES (p_icono, p_titulo, p_descripcion, p_fecha);
END
/////////////////////// eliminar evento ////////////////////////
DELIMITER //

CREATE PROCEDURE Eliminar_Evento (
    IN p_id INT
)
BEGIN
    DELETE FROM eventos WHERE id = p_id;
END
///////////////////// ingresar contacto ////////////////////////
DELIMITER //

CREATE PROCEDURE Agregar_Contacto(
  IN p_nombre VARCHAR(100),
  IN p_email VARCHAR(100),
  IN p_celular VARCHAR(20),
  IN p_mensaje TEXT,
  IN p_fecha_hora varchar(100)
)
BEGIN
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
END 
//////////////////////// mostrar todo galeria ////////////////////////
DELIMITER //
CREATE PROCEDURE Mostrar_todo_galeria()
BEGIN
SELECT * from imagenes_galeria;
END
/////////////////////// ingresar imagen a la geleria ////////////////////////
DELIMITER //

CREATE PROCEDURE Insertar_Imagen (
    IN p_ruta_imagen VARCHAR(255)
)
BEGIN
    INSERT INTO imagenes_galeria (ruta_imagen)
    VALUES (p_ruta_imagen);
END 
///////////////////// actualizar orden de imagenes en la galeria ////////////////////////
DELIMITER //

CREATE PROCEDURE Actualizar_orden_galeria(
    IN p_id INT,
    IN p_orden VARCHAR(100)
)
BEGIN
    UPDATE imagenes_galeria
    SET orden = p_orden
    WHERE id = p_id;
END 
////////////////////////// actualizar orden de imagenes excepto secundarias ///////////////////////////
DELIMITER //

CREATE PROCEDURE Actualizar_orden_excepto_S()
BEGIN
  UPDATE imagenes_galeria
  SET orden = NULL
  WHERE orden IS NOT NULL AND orden != 'S';
END 
/////////////////////////// eliminar fotos de galeria ///////////////////////////
DELIMITER //

CREATE PROCEDURE Eliminar_Imagenes_por_Ids(IN lista_ids TEXT)
BEGIN
  SET @query = CONCAT('DELETE FROM imagenes_galeria WHERE FIND_IN_SET(id, ?)');
  PREPARE stmt FROM @query;
  EXECUTE stmt USING lista_ids;
  DEALLOCATE PREPARE stmt;
END

////////////////////////////// llamar al contacto /////////////////////////////
DELIMITER //
CREATE PROCEDURE contacto()
BEGIN
SELECT contacto FROM admin WHERE id = 1;
END
////////////////////////// actullizar contacto ///////////////////////////
DELIMITER //

CREATE PROCEDURE actualizar_contacto(IN nuevo_contacto VARCHAR(255))
BEGIN
    UPDATE admin
    SET contacto = nuevo_contacto
    WHERE id = 1;
END
////////////////////// mostrar todo artesanias ////////////////////////
DELIMITER //
CREATE PROCEDURE mostrar_todo_artesanias()
BEGIN
SELECT 
  p.*,
  t.nombre AS nombre_tienda,
  t.telefono
FROM productos_artesanales p
JOIN tiendas t ON p.artesano_id = t.id;
END

////////////////////////////////// mostrar todo tiendas ////////////////////////
DELIMITER //
CREATE PROCEDURE mostrar_todo_tiendas()
BEGIN
SELECT * FROM tiendas;
END

////////////////////////////////// agregar producto artesanal ////////////////////////
DELIMITER //

CREATE PROCEDURE agregar_producto_artesanal(
    IN p_artesano_id varchar(255),
    IN p_nombre_producto VARCHAR(255),
    IN p_descripcion TEXT,
    IN p_precio varchar(225),
    IN p_imagen VARCHAR(255)
)
BEGIN
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
END

///////////////////////////// eliminar producto artesanal ///////////////////////////

DELIMITER //

CREATE PROCEDURE eliminar_producto_artesanal (
  IN p_id INT
)
BEGIN
  DELETE FROM productos_artesanales
  WHERE id = p_id;
END 
////////////////////////////////// ingresar testimonios ////////////////////////
DELIMITER //

CREATE PROCEDURE insertar_testimonio(
  IN p_nombre VARCHAR(100),
  IN p_origen VARCHAR(100),
  IN p_comentario TEXT,
  IN p_calificacion varchar(100),
  In p_fecha Varchar(100)
)
BEGIN
  INSERT INTO testimonios (nombre, origen, comentario, calificacion, fecha)
  VALUES (p_nombre, p_origen, p_comentario, p_calificacion, p_fecha);
END 
////////////////////////// mostando todo testimonios ////////////////
DELIMITER //
CREATE PROCEDURE mostrar_todo_testimonio()
BEGIN
SELECT * from testimonios;
END