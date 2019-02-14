DELIMITER $$
CREATE PROCEDURE `re_postear`(IN `puserID` INT(11), IN `ppostID` INT(11))
    NO SQL
BEGIN

SET @idusuario_post = (SELECT usuarios.id 
FROM usuarios INNER JOIN posts ON posts.userID = usuarios.id WHERE posts.id = ppostID);


IF (SELECT count(id) 
FROM posts 
WHERE posts.esREPOST = 1 
AND posts.idREPOST = ppostID
AND posts.userID = puserID) > 0

THEN
SET @idpost = (SELECT id 
FROM posts 
WHERE posts.esREPOST = 1 
AND posts.idREPOST = ppostID
AND posts.userID = puserID);

DELETE FROM posts WHERE posts.id = @idpost;
UPDATE posts set posts.shares = posts.shares -1 where posts.id = ppostID;
UPDATE usuarios set usuarios.reposts = usuarios.reposts - 1 where usuarios.id = @idusuario_post;

ELSE
INSERT INTO posts(userID, esREPOST, idREPOST) VALUES (puserID, 1, ppostID);

UPDATE posts set posts.shares = posts.shares +1 where posts.id = ppostID;
UPDATE usuarios set usuarios.reposts = usuarios.reposts + 1 where usuarios.id = @idusuario_post;

END IF;
END$$
DELIMITER ;