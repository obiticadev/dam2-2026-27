# 1 · Relaciones y claves compuestas: solución completa

[Todos los ejemplos](INDICE.md) · [Fundamentos y explicación](../contenidos/4A-mapeo-objeto-relacional.md)

## Enunciado de trabajo

Desarrollar un modelo de referencia que permita practicar:

1. Uno a uno unidireccional y bidireccional.
2. Uno a muchos con Set y con List ordenada.
3. Muchos a muchos con módulos compartidos.
4. Cascadas y eliminación de huérfanos.
5. Identificadores simples y compuestos.
6. Una referencia a dos columnas de una clave compuesta.

Es un desarrollo editorial de los ejemplos de 4A. La solución elige un solo diseño coherente para cada relación, en vez de mezclar fragmentos alternativos del aula.

## Diseño de la solución

| Relación | Implementación |
|---|---|
| Profesor → Perfil | Uno a uno unidireccional con FK única. |
| Profesor ↔ Direccion | Uno a uno bidireccional; Profesor propietario y Direccion con mappedBy. |
| Profesor → Aviso | Uno a muchos sin orden, con Set. |
| Profesor → Correo | Uno a muchos con List y columna de posición. |
| Profesor ↔ Modulo | Muchos a muchos, sin REMOVE sobre el módulo compartido. |
| Company → Employee | Uno a muchos de **entidades Employee**, no de claves EmployeeId. |
| Employee → Company | MapsId conecta la asociación con la parte companyId de la PK. |
| Phone → Employee | ManyToOne con dos JoinColumn. |
| Ciclo → Profesor | Asociación para las consultas HQL del segundo desarrollo. |

Se agrupan las clases como clases estáticas públicas para que el ejemplo sea autocontenido. En una aplicación real pueden separarse en archivos, ajustando su registro en Hibernate. El acceso JPA es por campos; los campos públicos simplifican la demostración, no son una recomendación general de encapsulación.

## Archivo completo

### `src/main/java/modelo/Mapeos.java`

```java
package modelo;

import java.io.Serializable;
import java.util.*;
import javax.persistence.*;

public final class Mapeos {
    private Mapeos() {
    }

    @Entity(name = "Profesor")
    @Table(name = "profesores")
    @NamedQueries({
        @NamedQuery(name = "Profesores.findAll", query = "select p from Profesor p")
        ,
                @NamedQuery(name = "Profesores.ByName",
                        query = "select p from Profesor p where p.nombre=:nombre and p.ape1=:ape1 "
                                + "and p.ape2=:ape2")
    })
    public static class Profesor implements Serializable {
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) public Integer id;
        public String nombre;
        public String ape1;
        public String ape2;

        @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
        @JoinColumn(name = "perfil_id", unique = true)
        public Perfil perfil;

        @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
        @JoinColumn(name = "direccion_id", unique = true)
        public Direccion direccion;

        @OneToMany(mappedBy = "profesor", cascade = CascadeType.ALL, orphanRemoval = true)
        public Set<Aviso> avisos = new HashSet<>();

        @OneToMany(mappedBy = "profesor", cascade = CascadeType.ALL, orphanRemoval = true)
        @OrderColumn(name = "posicion")
        public List<Correo> correos = new ArrayList<>();

        @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
        @JoinTable(name = "profesor_modulo", joinColumns = @JoinColumn(name = "profesor_id"),
                inverseJoinColumns = @JoinColumn(name = "modulo_id"))
        public Set<Modulo> modulos = new HashSet<>();

        public Profesor() {
        }
        public Profesor(String nombre, String ape1, String ape2) {
            this.nombre = nombre;
            this.ape1 = ape1;
            this.ape2 = ape2;
        }
        public void setDireccion(Direccion nueva) {
            if (direccion != null) {
                direccion.profesor = null;
            }
            direccion = nueva;
            if (nueva != null) {
                nueva.profesor = this;
            }
        }
        public void addCorreo(String texto) {
            Correo correo = new Correo();
            correo.direccion = texto;
            correo.profesor = this;
            correos.add(correo);
        }
        public void addAviso(String texto) {
            Aviso aviso = new Aviso();
            aviso.texto = texto;
            aviso.profesor = this;
            avisos.add(aviso);
        }
        public void addModulo(Modulo modulo) {
            modulos.add(modulo);
            modulo.profesores.add(this);
        }
        public void removeModulo(Modulo modulo) {
            modulos.remove(modulo);
            modulo.profesores.remove(this);
        }
    }

    @Entity(name = "Perfil")
    public static class Perfil {
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) public Integer id;
        public String descripcion;
        public Perfil() {
        }
    }

    @Entity(name = "Direccion")
    public static class Direccion {
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) public Integer id;
        public String calle;
        @OneToOne(mappedBy = "direccion") public Profesor profesor;
        public Direccion() {
        }
    }

    @Entity(name = "Aviso")
    public static class Aviso {
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) public Integer id;
        public String texto;
        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumn(name = "profesor_id", nullable = false)
        public Profesor profesor;
        public Aviso() {
        }
    }

    @Entity(name = "Correo")
    public static class Correo {
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) public Integer id;
        public String direccion;
        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumn(name = "profesor_id", nullable = false)
        public Profesor profesor;
        public Correo() {
        }
    }

    @Entity(name = "Modulo")
    public static class Modulo {
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) public Integer id;
        public String nombre;
        @ManyToMany(mappedBy = "modulos") public Set<Profesor> profesores = new HashSet<>();
        public Modulo() {
        }
    }

    @Entity(name = "Company")
    public static class Company {
        @Id public Long id;
        public String nombre;
        @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
        public Set<Employee> employees = new HashSet<>();
        public Company() {
        }
        public Company(Long id, String nombre) {
            this.id = id;
            this.nombre = nombre;
        }
        public Long getId() {
            return id;
        }
        public void addEmployee(long numero, String nombre) {
            Employee employee = new Employee();
            employee.id = new EmployeeId(id, numero);
            employee.company = this;
            employee.nombre = nombre;
            employees.add(employee);
        }
    }

    @Embeddable
    public static class EmployeeId implements Serializable {
        private static final long serialVersionUID = 1L;
        @Column(name = "company_id") public Long companyId;
        @Column(name = "employee_number") public Long employeeNumber;
        public EmployeeId() {
        }
        public EmployeeId(Long companyId, Long employeeNumber) {
            this.companyId = companyId;
            this.employeeNumber = employeeNumber;
        }
        @Override
        public boolean equals(Object other) {
            if (this == other) {
                return true;
            }
            if (!(other instanceof EmployeeId)) {
                return false;
            }
            EmployeeId that = (EmployeeId) other;
            return Objects.equals(companyId, that.companyId)
                    && Objects.equals(employeeNumber, that.employeeNumber);
        }
        @Override
        public int hashCode() {
            return Objects.hash(companyId, employeeNumber);
        }
    }

    @Entity(name = "Employee")
    public static class Employee {
        @EmbeddedId public EmployeeId id;
        public String nombre;
        @MapsId("companyId")
        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumn(name = "company_id")
        public Company company;
        public Employee() {
        }
    }

    @Entity(name = "Phone")
    public static class Phone {
        @Id @Column(name = "phone_number") public String numero;
        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumns({
            @JoinColumn(name = "company_id", referencedColumnName = "company_id")
            , @JoinColumn(name = "employee_number", referencedColumnName = "employee_number")
        })
        public Employee employee;
        public Phone() {
        }
    }

    @Entity(name = "Ciclo")
    public static class Ciclo {
        @Id
        @SequenceGenerator(name = "ciclo_seq", sequenceName = "ciclo_seq", allocationSize = 1)
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ciclo_seq")
        public Long id;
        public String nombre;
        public int horas;
        @ManyToOne(fetch = FetchType.LAZY) public Profesor profesor;
        public Ciclo() {
        }
    }

    @Entity(name = "Person")
    public static class Person {
        @Id public Integer id;
        public String nombre;
        public String ape1;
        public String ape2;
        public Person() {
        }
    }
}
```

## Cómo utilizarlo y comprobarlo

Registrar todas las clases que tienen `@Entity` mediante `Configuration.addAnnotatedClass(...)`, como hace la [suite de pruebas](../documentacion/verificacion.md). Si se utiliza XML, el nombre binario de una clase anidada incluye `$`, por ejemplo `modelo.Mapeos$Profesor`.

La suite persiste el grafo y lo recupera en **otra sesión** para comprobar que las relaciones y posiciones realmente quedaron en la base. Después reordena los correos, elimina un huérfano y comprueba la fila borrada. También elimina un profesor sin borrar el módulo que utiliza otro.

> **Proxies diferidos.** No leer directamente `employee.company.id`: un proxy LAZY puede tener el campo público sin inicializar. Utilizar `employee.company.getId()` dentro de la sesión. El getter está incluido y la prueba verifica ese acceso.

La clave EmployeeId debe estar completa antes de persistir y no modificarse después. La variante de PK compartida de los ejemplos originales se sustituye aquí explícitamente por FK única en Profesor/Direccion; no se pretende que ambos diseños sean el mismo.
