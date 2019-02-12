DELIMITER $$
CREATE PROCEDURE `postscompletos`(IN `puserID` INT)
BEGIN

CREATE TEMPORARY TABLE POSTS as (SELECT posts.* from posts WHERE posts.userID = puserID);

CREATE TEMPORARY TABLE REPOSTS as (SELECT posts.* from posts WHERE posts.userID = puserID and posts.esREPOST = 1);

CREATE TEMPORARY TABLE AMBOS AS
(SELECT POSTS.*,  imagenes.url FROM POSTS inner join imagenes on imagenes.userID = POSTS.userID WHERE POSTS.esREPOST = 0);


INSERT INTO AMBOS     
SELECT REPOSTS.id, REPOSTS.userID, REPOSTS.texto, REPOSTS.shares, REPOSTS.likes, posts.fecha, posts.esREPOST, posts.idREPOST, imagenes.url FROM REPOSTS inner join imagenes on imagenes.userID = REPOSTS.userID INNER JOIN posts ON posts.id = REPOSTS.id;


SELECT AMBOS.id, AMBOS.userID, AMBOS.texto, AMBOS.shares, AMBOS.likes, AMBOS.fecha, AMBOS.esREPOST, AMBOS.idREPOST, usuarios.usuario, usuarios.nombre, AMBOS.url as perfil_img FROM AMBOS INNER JOIN usuarios ON usuarios.id = AMBOS.userID ORDER BY fecha desc;

DROP TABLE POSTS;
DROP TABLE REPOSTS;
DROP TABLE AMBOS;
END$$
DELIMITER ;