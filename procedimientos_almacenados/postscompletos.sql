DELIMITER $$
CREATE PROCEDURE `postscompletos`(IN `puserID` INT)
BEGIN
CREATE TEMPORARY TABLE tmp_POSTS as (SELECT posts.* from posts  WHERE posts.userID = puserID AND posts.esREPOST = 0);

CREATE TEMPORARY TABLE tmp_REPOSTS as (SELECT posts.* from posts  WHERE posts.userID = puserID AND posts.esREPOST = 1);

CREATE TEMPORARY TABLE tmp_AMBOS as (
SELECT tmp_POSTS.id, tmp_POSTS.userID, tmp_POSTS.texto, tmp_POSTS.shares, tmp_POSTS.likes, tmp_POSTS.fecha ,tmp_POSTS.esREPOST, tmp_POSTS.idREPOST, usuarios.usuario, usuarios.nombre, imagenes.url as perfil_img FROM tmp_POSTS  INNER JOIN usuarios ON usuarios.id = tmp_POSTS.userID INNER JOIN imagenes ON imagenes.userID = tmp_POSTS.userID);

INSERT INTO tmp_AMBOS(
SELECT tmp_REPOSTS.id, tmp_REPOSTS.userID, posts.texto, posts.shares, posts.likes, tmp_REPOSTS.fecha,1,0,usuarios.usuario, usuarios.nombre, imagenes.url as perfil_img FROM tmp_REPOSTS INNER JOIN posts ON posts.id = tmp_REPOSTS.idREPOST INNER JOIN usuarios ON usuarios.id = posts.userID INNER JOIN imagenes ON imagenes.userID = posts.userID);

SELECT * FROM tmp_AMBOS order by fecha desc;


DROP TABLE tmp_POSTS;
DROP TABLE tmp_REPOSTS;
DROP TABLE tmp_AMBOS;
END$$
DELIMITER ;