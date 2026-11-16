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
