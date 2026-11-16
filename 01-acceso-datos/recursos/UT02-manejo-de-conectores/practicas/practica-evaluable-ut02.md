# Práctica Evaluable - UT02

[← UT02 · Índice de la unidad](../INDICE.md)

> **Unidad:** UT02 · Manejo de conectores  
> **Tipo de recurso:** Práctica evaluable  
> **Fuente:** [Aula virtual](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/assign/view.php?id=219702)

> **Criterio editorial:** contenido del aula sin resumir ni actualizar sus versiones. Se mejora la estructura y se normalizan los espacios de sangría del código; los archivos originales permanecen intactos.

## Índice

- [Enunciado](#enunciado)
- [Indicaciones de entrega · 13/11/2026](#indicaciones-de-entrega-13-11-2026)
- [Indicaciones de corrección oral · 17/09/2026](#indicaciones-de-correccion-oral-17-09-2026)
- [Script SQL adjunto · emp_dept_salgrade_MYSQL.sql](#script-sql-adjunto-empdeptsalgrademysql-sql)
- [Fuentes locales y adjuntos](#fuentes-locales-y-adjuntos)

---

<a id="contenido"></a>
<a id="enunciado"></a>
## Enunciado

**En un nuevo proyecto JDBCMySQL, crea una clase con un método main  que actualice fila a fila, el salario de los empleados de la tabla emp.**

El proyecto debe tener en una carpeta librerias todas los .jar necesarios.

Utiliza un objeto ResultSet para recuperar los datos de los empleados, recorre de manera repetitiva este objeto y en función de las condiciones de abajo actualiza el salario del empleado como corresponda. La actualización de todas las filas debe constituir una única transacción.

A cada empleado sólo se aplica una subida, depende del oficio, departamento y antigüedad. Evalúa las condiciones en el orden siguiente

- Los gerentes ( job = MANAGER)  tienen una subida del 10%
- Los empleados con una antigüedad anterior al 01/09/81 tienen una subida del 15%
- Para el  resto de los empleados:

  - Los  analistas (job= ANALYST) del departamento 20 tienen una subida del 5%.
  - Los Vendedores del 8%.

TEN EN CUENTA EL ORDEN DE EVALUACION DE LAS CONDICIONES  QUE SE PROPONE Y APLICA ÚNICAMENTE UNA SUBIDA DE SALARIO.   
El script de creación de las tablas esta  adjunto.

Como la corrección va a ser oral puedes usar la base de datos que consideres.  

<a id="indicaciones-de-entrega-13-11-2026"></a>
## Indicaciones de entrega · 13/11/2026

Comprime el proyecto que resuelve la tarea, incluidas todas  las clases que se piden, las librerías importadas deberán estar en una carpeta dentro del propio proyecto.   
El envío se realizará a través de la plataforma de la forma establecida para ello, y el archivo se nombrará siguiendo las siguientes pautas:  
apellido1\_apellido2\_nombre\_3J\_Tarea.zip  
Asegúrate que el nombre no contenga la letra ñ, tildes ni caracteres especiales extraños. 

<a id="indicaciones-de-correccion-oral-17-09-2026"></a>
## Indicaciones de corrección oral · 17/09/2026

> **Nota editorial:** la fecha se reproduce tal como figura en el aula.

Ten preparado el entorno y los datos cargados en la base de datos.

- Explica el proceso, las clases y su uso mas relevantes.
- Ten preparado un proceso, sql, sctript o código para recrear la base de datos con los datos iniciales cargados de manera rápida, por que hay que hacer varias pruebas con esos datos.
- Prueba 1: Con los datos originales desde un cliente tendrás que hacer una consulta para ver los datos originales, ejecutarás el código y volveremos a ver con la misma consulta cómo han cambiado los datos.
- Prueba 2: Con los datos originales, prepara el código para abortar la actualización (con una línea descomentada) para abortar la ejecución antes del commit y comprobar que no se actualiza la base de datos.
- Pruebas de gestión de errores: Modificaremos el código para hacer comprobaciones de que se manejan los errores de conexción a BBDD o setencias mal definidas, etc.

- ![emp_dept_salgrade_MYSQL.sql](../img/529e5cee48052511.svg "emp_dept_salgrade_MYSQL.sql") [emp\_dept\_salgrade\_MYSQL.sql](../originales/UT02-manejo-de-conectores/219702-Pr%C3%A1ctica%20Evaluable%20-%20UT02%20Tarea/d737cc6de3-emp_dept_salgrade_MYSQL.sql)

  28 de octubre de 2026, 10:56

<a id="script-sql-adjunto"></a>
<a id="script-sql-adjunto-empdeptsalgrademysql-sql"></a>
## Script SQL adjunto · emp_dept_salgrade_MYSQL.sql

**Fuente del complemento:** [Original](../originales/UT02-manejo-de-conectores/219702-Pr%C3%A1ctica%20Evaluable%20-%20UT02%20Tarea/d737cc6de3-emp_dept_salgrade_MYSQL.sql)

> **Precaución:** el script original comienza con `DROP DATABASE EmpDept`. Se conserva íntegro; no se ha ejecutado.

```sql
drop database EmpDept;
create database EmpDept;
use EmpDept;

create table dept(
  deptno numeric(2,0),
  dname  varchar(14),
  loc    varchar(13),
  constraint pk_dept primary key (deptno)
)engine=innodb ;
 
create table emp(
  empno    numeric(4,0),
  ename    varchar(10),
  job      varchar(9),
  mgr      numeric(4,0),
  hiredate date,
  sal      numeric(7,2),
  comm     numeric(7,2),
  deptno   numeric(2,0),
  constraint pk_emp primary key (empno),
  constraint fk_deptno foreign key (deptno) references dept (deptno)
) engine=innodb ;
 

create table bonus(
  ename varchar(10),
  job   varchar(9),
  sal   numeric(7,2),
  comm  numeric(7,2)
);
 
create table salgrade(
  grade numeric(7,2),
  losal numeric(7,2),
  hisal numeric(7,2)
);

insert into dept
values(10, 'ACCOUNTING', 'NEW YORK');
insert into dept
values(20, 'RESEARCH', 'DALLAS');
insert into dept
values(30, 'SALES', 'CHICAGO');
insert into dept
values(40, 'OPERATIONS', 'BOSTON');
 select * from emp;
insert into emp
values(
 7839, 'KING', 'PRESIDENT', null,
 STR_TO_DATE('17-11-1981','%d-%m-%Y'),
 5000, null, 10
);
insert into emp
values(
 7698, 'BLAKE', 'MANAGER', 7839,
 STR_TO_DATE('1-5-1981','%d-%m-%Y'),
 2850, null, 30
);
insert into emp
values(
 7782, 'CLARK', 'MANAGER', 7839,
 STR_TO_DATE('9-6-1981','%d-%m-%Y'),
 2450, null, 10
);
insert into emp
values(
 7566, 'JONES', 'MANAGER', 7839,
 STR_TO_DATE('2-4-1981','%d-%m-%Y'),
 2975, null, 20
);
insert into emp
values(
 7788, 'SCOTT', 'ANALYST', 7566,
 STR_TO_DATE('13-07-1987','%d-%m-%Y') ,
 3000, null, 20
);
insert into emp
values(
 7902, 'FORD', 'ANALYST', 7566,
 STR_TO_DATE('3-12-1981','%d-%m-%Y'),
 3000, null, 20
);
insert into emp
values(
 7369, 'SMITH', 'CLERK', 7902,
 STR_TO_DATE('17-12-1980','%d-%m-%Y'),
 800, null, 20
);
insert into emp
values(
 7499, 'ALLEN', 'SALESMAN', 7698,
 STR_TO_DATE('20-2-1981','%d-%m-%Y'),
 1600, 300, 30
);
insert into emp
values(
 7521, 'WARD', 'SALESMAN', 7698,
 STR_TO_DATE('22-2-1981','%d-%m-%Y'),
 1250, 500, 30
);
insert into emp
values(
 7654, 'MARTIN', 'SALESMAN', 7698,
 STR_TO_DATE('28-9-1981','%d-%m-%Y'),
 1250, 1400, 30
);
insert into emp
values(
 7844, 'TURNER', 'SALESMAN', 7698,
 STR_TO_DATE('8-9-1981','%d-%m-%Y'),
 1500, 0, 30
);
insert into emp
values(
 7876, 'ADAMS', 'CLERK', 7788,
 STR_TO_DATE('13-07-1987', '%d-%m-%Y'),
 1100, null, 20
);
insert into emp
values(
 7900, 'JAMES', 'CLERK', 7698,
 STR_TO_DATE('3-12-1981','%d-%m-%Y'),
 950, null, 30
);
insert into emp
values(
 7934, 'MILLER', 'CLERK', 7782,
 STR_TO_DATE('23-1-1982','%d-%m-%Y'),
 1300, null, 10
);

insert into salgrade
values (1, 700, 1200);
insert into salgrade
values (2, 1201, 1400);
insert into salgrade
values (3, 1401, 2000);
insert into salgrade
values (4, 2001, 3000);
insert into salgrade
values (5, 3001, 9999);

 
commit;
```

<a id="fuentes-locales-y-adjuntos"></a>
## Fuentes locales y adjuntos

<details>
<summary>Consultar los HTML y archivos originales</summary>

- [contenido.html](../originales/UT02-manejo-de-conectores/219702-Pr%C3%A1ctica%20Evaluable%20-%20UT02%20Tarea/contenido.html)
- [d737cc6de3-emp_dept_salgrade_MYSQL.sql](../originales/UT02-manejo-de-conectores/219702-Pr%C3%A1ctica%20Evaluable%20-%20UT02%20Tarea/d737cc6de3-emp_dept_salgrade_MYSQL.sql)

</details>
