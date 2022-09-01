USE `CUSTOMER_DB`;
DROP procedure IF EXISTS `Q4`;

USE `CUSTOMER_DB`;
DROP procedure IF EXISTS `CUSTOMER_DB`.`Q4`;
;

DELIMITER $$
USE `CUSTOMER_DB`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Q4`()
BEGIN
declare name varchar(50);
declare city varchar(50);
declare country varchar(50);
declare grade varchar(50);
declare v_finished int default 0;

declare cur cursor for select customer.cust_name, customer.cust_city, customer.cust_country, customer.grade from customer where customer.agent_code like 'A00%';
declare continue handler for not found set v_finished=1;
drop table if exists agenta00;
create table AGENTA00 (
	name varchar(50),
	city varchar(50),
	country varchar(50),
	grade varchar(50)
);
open cur;
get_cust:loop 
fetch cur into name,city,country,grade;
select name,city,country,grade;
if v_finished=1 then 
leave get_cust;
end if;
insert into AGENTA00 values(name,city,country,grade);
end loop get_cust;
select * from AGENTA00;
close cur;
END$$

DELIMITER ;
;

