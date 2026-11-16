Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=221730&chapterid=36537

### 9. Trabajando con objetos

#### 9.1. Contextos de persistencia

Persistiendo un objeto

Las objetos recién instanciadas de una clase persistente, Hibernate las considera comotransitorias. Podemos hacer una instancia transitoriapersistente asociándola con una sesión:

Company c1 = new Company(1, "Almacenes Lamarca");

Set<Employee> lis1 = new HashSet<>();

lis1.add(new Employee(new EmployeeId(1, 1), "Lopez", null));

c1.setLisEmployees(lis1);

*//Aquí, c1 es una entidad transitoria porque no está vinculada al contexto de persistencia.*

*...*

session.save(c1);*// Ahora c1 es persistente.*

session.evict(c1); *// Ahora c1 está desvinculado.*

Si company tiene un identificador generado, el identificador es generado y asignado al c1cuando se llama asave(). Si Companytiene un identificadorassigned, o una clave compuesta, el identificador debe ser asignado a la instancia de companyantes de llamar asave(). También puede utilizarpersist() en vez desave()

* persist() hace que una instancia transitoria sea persistente. Sin embargo, no garantiza que el valor identificador sea asignado a la instancia persistente inmediatamente.

  persist() también garantiza que no ejecutará una declaraciónINSERT si se llama por fuera de los límites de una transacción. Esto es útil en conversaciones largas con un contexto extendido sesión/persistencia.
* save() sí garantiza el retorno de un identificador. Si se tiene que ejecutar un INSERT para obtener el identificador ( por ejemplo, generador "identidad", no "secuencia"), este INSERT tiene lugar inmediatamente sin importar si se encuentra dentro o fuera de una transacción. Esto es problemático en una conversación larga con un contexto extendido sesión/persistencia.

#### 

#### Borrando un objeto

```
1: Session session = sessionFactory.openSession();  
2: Profesor profesor =(Profesor) session.get(Profesor.class,1001);  
3: session.delete(profesor);
```

#### Cargando un objeto

#### Los métodos load() de Session le proporcionan una forma de recuperar una instancia persistente si ya conoce su identificador. load() toma un objeto clase y carga el estado dentro de una instancia recién instanciada de esa clase, en un estado persistente, pero tienen diferencias importantes:

###### Load()

Retorna una instancia proxy de la entidad. Hibernate carga los datos solo cuando son necesarios.

Lanza una excepción irrecuperable si no hay una fila correspondiente en la ba. 

```
1: Session session = sessionFactory.openSession();  
2: Profesor profesor =(Profesor)session.get(Profesor.class,1001);
```

Si no tenemos la certeza de que existe una fila correspondiente, debemos utilizar el método get(), que llama a la base de datos inmediatamente y devuelve nulo si no existe una fila correspondiente.

```
1: Session session = sessionFactory.openSession();  
2: Profesor profesor =(Profesor)session.get(Profesor.class,1001);
```

 

#### Otros Métodos de Session

En el tema Cascade ya se habló de varios métodos que tiene la clase  [org.hibernate.Session](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Session.html). Pasemos ahora a explicarlos desde el punto de vista de los estados internos de Hibernate.

Session.evict(Object objeto)

El método [Session.evict(Object objeto)](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Session.html#evict(java.lang.Object)) hace que un objeto en estado Persistido pase al estado Despegado y lo borre de su cache.

```
1: Session session = sessionFactory.openSession();  
2: Profesor profesor =(Profesor)session.get(Profesor.class,1001);  
3: session.evict(profesor);  
4: session.close();
```

  

Session.merge(Object objeto)

El método  [Session.merge(Object objeto)](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Session.html#merge(java.lang.Object)) hace que cualquier objeto pase a estar en el estado Persistido. En caso de que el objeto está en la base de datos , lo leerá de ella. Si el objeto es nuevo , lo marcará como pendiente de guardar en la base de datos.

Este método se suele usar cuando tenemos un objeto que no estaba  controlado por Hibernate para que vuelva a estar bajo su control.

Es importante destacar que el objeto que le pasamos como parámetro no tendrá el estado Persistido sino que es el objeto que nos devuelve el que estará en estado Persistido.

```
1: Session session = sessionFactory.openSession();  
 2: Profesor profesor = new Profesor(1001,"LLUIS", "GOMIS", "MARTINEZ");  
 3:  
 4: Profesor profesor2 = (Profesor) session.merge(profesor);  
 5: System.out.println("¿Son iguales los objeto profesor y profesor2? " + (profesor == profesor2));  
 6:  
 7: Profesor profesor3 = (Profesor) session.merge(profesor2);  
 8: System.out.println("¿Son iguales los objeto profesor2 y profesor3? " + (profesor2 == profesor3));  
 9:  
10: session.close();
```

  
 

* En la línea 2 creamos el objeto  profesor en estado Transitorio, aunque dicho profesor sí que existe en la base de datos.
* La línea 4 hace que se retorne una nueva referencia a un objeto de la clase Profesor cuyo Id=1001 y cuyo estado será Persistido.
* La línea 5 muestra si son iguales los objetos profesor y profesor2 siendo el resultado false, ya que profesor era desconocido para Hibernate, 

  por lo que ha tenido que crear un nuevo objeto y leerlo de la base de datos.
* En la línea 7 volvemos a hacer un merge del objeto profesor3 que ya se encuentra en estado Persistido.
* El resultado de la línea 8 ahora es true ya que si hacemos un 

  merge de un objeto que ya está en estado Persistido se retorna el mismo objeto.

Session.refresh(Object objeto)

El método [Session.refresh(Object objeto)](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Session.html#refresh(java.lang.Object)) es similar a [Session.merge(Object objeto)](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Session.html#merge(java.lang.Object)) pero sólo se puede usar si el objeto ya existe en la base de datos.

Se suele usar para recargar el estado del objeto porque ha sido modificado en la base de datos por algún trigger o similar.

```
1: Session session = sessionFactory.openSession();  
2: Profesor profesor = new Profesor(1001,"LLUIS", "GOMIS", "MARTINEZ");  
3: session.refresh(profesor);  
4: session.close();
```

  

Si el objeto no existe en la base de datos se producirá la excepción

org.hibernate.UnresolvableObjectException: No row with the given identifier exists: [ejemplo01.Profesor#-1]

LockRequest.lock(Object objeto)

El método [LockRequest.lock(Object objeto)](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Session.LockRequest.html#lock(java.lang.Object)) no modifica el estado interno del objeto pero sí que permite hacer un SELECT ... FOR UPDATE contra la base de datos.

Veamos un ejemplo.

 

```
1: Session session = sessionFactory.openSession();  
2: Profesor profesor =(Profesor)session.get(Profesor.class,1001);  
3: session.buildLockRequest(LockOptions.UPGRADE).lock(profesor);  
4: session.close();
```

  

* En la línea 2 leemos el objeto
* En la línea 3 lo bloqueamos en la base de datos.

Las SQL que se generan son las siguientes:

select profesor0\_.Id as Id3\_1\_, profesor0\_.nombre as nombre3\_1\_, profesor0\_.ape1 as ape3\_3\_1\_, profesor0\_.ape2 as ape4\_3\_1\_, direccion1\_.Id as Id1\_0\_, direccion1\_.calle as calle1\_0\_, direccion1\_.numero as numero1\_0\_, direccion1\_.idMunicipio as idMunici4\_1\_0\_, direccion1\_.provincia as provincia1\_0\_ from Profesor profesor0\_ left outer join Direccion direccion1\_ on profesor0\_.Id=direccion1\_.Id where profesor0\_.Id=? 

select Id from Profesor where Id =? for update

Vemos la segunda 

SQL que es un SELECT ... FOR UPDATE.

Cuando se dice que un método como load() en Hibernate retorna una instancia proxy de la entidad, significa que Hibernate no carga inmediatamente los datos reales de la entidad desde la base de datos. En cambio:

Proxy: Hibernate genera una clase dinámica que actúa como un "sustituto" (proxy) de la entidad real. Esta clase proxy se comporta como si fuera la entidad, pero no contiene los datos reales hasta que se accede a uno de sus campos o métodos.  
Carga diferida (Lazy Loading): El proxy permite diferir la consulta a la base de datos hasta que realmente se necesite la información. Por ejemplo:

Si accedes a una propiedad de la entidad proxy, Hibernate ejecutará automáticamente una consulta SQL para recuperar los datos desde la base de datos.  
Si nunca accedes a las propiedades, Hibernate nunca ejecutará esa consulta.  
Optimización: Este comportamiento ayuda a mejorar el rendimiento y reducir la carga sobre la base de datos cuando no necesitas todos los datos de inmediato.  
   
Ejemplo práctico de proxy en Hibernate  
Supongamos que tienes una clase Profesor y llamas a load() para obtener un objeto Profesor con id = 1001:

java  
Copiar código  
Session session = sessionFactory.openSession();  
Profesor profesor = session.load(Profesor.class, 1001);

Hibernate no ejecutará una consulta inmediata para traer los datos de la base de datos. En cambio, retornará un proxy del objeto Profesor.  
El proxy tiene el identificador (id = 1001) almacenado y sabe cómo recuperar los datos del objeto real si es necesario.  
Si accedes a una propiedad del objeto, como profesor.getNombre(), Hibernate ejecutará una consulta SQL en ese momento para recuperar los datos desde la base de datos.

Beneficio del proxy  
El principal beneficio del proxy es que permite diferir las operaciones de base de datos hasta el último momento posible. Esto puede ser útil cuando:

No necesitas todos los datos de una entidad de inmediato.  
Tienes relaciones complejas y solo deseas cargar partes específicas de los datos.  
   
Limitaciones del proxy  
Acceso fuera del contexto de sesión: Si cierras la sesión de Hibernate antes de acceder a las propiedades del proxy, obtendrás una excepción LazyInitializationException porque Hibernate ya no puede cargar los datos de la base de datos.  
Uso con datos críticos: Si necesitas los datos reales inmediatamente (no solo el identificador), es mejor usar get() en lugar de load(). get() carga todos los datos de la entidad directamente.  
   
Resumen  
Un proxy es un objeto "falso" que representa la entidad real, pero no contiene sus datos reales hasta que son solicitados.  
Hibernate usa proxies para implementar la carga diferida (Lazy Loading), ayudando a optimizar el rendimiento.  
Utiliza load() si deseas aprovechar esta carga diferida, pero asegúrate de que el contexto de sesión esté abierto mientras trabajas con el proxy.