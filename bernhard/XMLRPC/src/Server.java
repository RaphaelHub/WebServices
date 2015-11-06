import org.apache.xmlrpc.*;

public class Server {
	public static void main(String[] args) throws Exception{
		WebServer webServer = new WebServer(8080);
		webServer.addHandler(TemperatureConversion.class.getName(), new TemperatureConversion());
		webServer.start();
	}
}
