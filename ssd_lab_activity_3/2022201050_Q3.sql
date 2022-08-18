select essn, count(*) from company.works_on where company.works_on.essn in (
select mgr_ssn from company.department where company.department.dnumber in (
select dnum from company.project where pname='productY')
)
group by essn;
