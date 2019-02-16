DELIMITER $$
CREATE  PROCEDURE `perfiles_recomendados`(IN `puserID` INT(11))
    NO SQL
BEGIN
SELECT usuarios.id, usuarios.usuario, usuarios.nombre, usuarios.id, imagenes.url as perfil_img FROM usuarios INNER JOIN seguimientos ON seguimientos.userID_emisor = puserID INNER JOIN imagenes ON imagenes.userID = usuarios.id WHERE usuarios.id <> puserID  ORDER BY RAND() LIMIT 3;
END$$
DELIMITER ;