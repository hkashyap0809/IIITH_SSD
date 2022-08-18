select fname,lname,ssn from company.employee where company.employee.ssn in (
select essn from company.works_on group by essn having SUM(hours)<40
 );
