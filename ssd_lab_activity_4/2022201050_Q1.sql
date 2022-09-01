USE `CUSTOMER_DB`;
DROP procedure IF EXISTS `Q1`;

USE `CUSTOMER_DB`;
DROP procedure IF EXISTS `CUSTOMER_DB`.`Q1`;
;

DELIMITER $$
USE `CUSTOMER_DB`$$
CREATE PROCEDURE `Q1`(in a int, in b int, out c int)
BEGIN
	select a+b into c;
END$$

DELIMITER ;
;

