DELIMITER $$
CREATE PROCEDURE `seguimientos`(IN `p_userID_Emisor` INT(11), IN `p_userID_Receptor` INT(11))
    NO SQL
BEGIN

IF (SELECT COUNT(*) FROM seguimientos WHERE seguimientos.userID_emisor = p_userID_Emisor AND seguimientos.userID_receptor = p_userID_Receptor) > 0
THEN
	DELETE FROM seguimientos WHERE seguimientos.userID_emisor = 		  		p_userID_Emisor AND seguimientos.userID_receptor = 					       p_userID_Receptor;
	UPDATE usuarios set usuarios.seguidores = usuarios.seguidores -1 WHERE 		usuarios.id = p_userID_Receptor;
    	UPDATE usuarios set usuarios.seguidos = usuarios.seguidos -1 			WHERE 		usuarios.id = p_userID_Emisor;
ELSE
	INSERT INTO seguimientos(userID_emisor,userID_receptor) 			       VALUES(p_userID_Emisor,p_userID_Receptor);
		UPDATE usuarios set usuarios.seguidores = usuarios.seguidores +1 		 WHERE 		usuarios.id = p_userID_Receptor;
    	UPDATE usuarios set usuarios.seguidos = usuarios.seguidos +1 			WHERE 		usuarios.id = p_userID_Emisor;
END IF;

END$$
DELIMITER ;