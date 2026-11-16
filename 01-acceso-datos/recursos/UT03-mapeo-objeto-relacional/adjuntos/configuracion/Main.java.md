# Main.java

> **Módulo:** Acceso a Datos — DAM 2
> **Procedencia:** [Archivo extraído](Main.java) · [ZIP original](../../originales/UT03-mapeo-objeto-relacional/222163-Ficheros%20de%20configuraci%C3%B3n%20Carpeta/a1b5d640e5-ficheros%20de%20configuraci%C3%83%C2%B3n%20para%20proyecto.zip)
> **Criterio:** transcripción del material docente, sin resumir ni actualizar sus versiones.

## Índice

- [Contenido íntegro](#contenido-integro)

---

<a id="contenido-integro"></a>
## Contenido íntegro

```java
package programas;

import java.time.LocalDate;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import modelo.Usuario;
import hibernateUtils.HibernateUtils;

public class Main {
	public static void main(String[] args) {

		SessionFactory sesionFactory = HibernateUtils.getSessionFactory();
		Session session = sesionFactory.openSession(); 
		
		// aqui pondremos el codigo necesario 
		
		}catch (HibernateException e) {
			if(session.getTransaction()!=null) {
				session.getTransaction().rollback();
			}
			
		}finally {
		session.close();
		sesionFactory.close();
		}
	}

}
```
