USE `CUSTOMER_DB`;
DROP procedure IF EXISTS `Q2`;

USE `CUSTOMER_DB`;
DROP procedure IF EXISTS `CUSTOMER_DB`.`Q2`;
;

DELIMITER $$
USE `CUSTOMER_DB`$$
CREATE PROCEDURE `Q2`(in city varchar(30))
BEGIN
	select customer.cust_name 
    from customer
    where customer.working_area=city;
END$$

DELIMITER ;
;

