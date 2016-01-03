import org.apache.cxf.jaxrs.JAXRSServerFactoryBean;
import org.apache.cxf.jaxrs.lifecycle.SingletonResourceProvider;

import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;

public class Server {
	protected Server() throws Exception {
		JAXRSServerFactoryBean sf = new JAXRSServerFactoryBean();
		sf.setResourceClasses(PrinterService.class);
		sf.setResourceProvider(PrinterService.class, new SingletonResourceProvider(new PrinterService()));
		sf.setProvider(JacksonJsonProvider.class); // enables JAX-RS to read and write JSON
		sf.setAddress("http://localhost:9000/");
		sf.create();
	}

	public static void main(String args[]) throws Exception {
		new Server();
		System.out.println("Server ready...");

		Thread.sleep(5 * 6000 * 1000);
		System.out.println("Server exiting");
		System.exit(0);
	}
}
