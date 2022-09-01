USE `CUSTOMER_DB`;
DROP procedure IF EXISTS `Q3`;

USE `CUSTOMER_DB`;
DROP procedure IF EXISTS `CUSTOMER_DB`.`Q3`;
;

DELIMITER $$
USE `CUSTOMER_DB`$$
CREATE PROCEDURE `Q3`()
BEGIN
	select customer.cust_name, customer.grade
    from customer
    where customer.opening_amt+customer.receive_amt>10000;
END$$

DELIMITER ;
;

