import java.util.Vector;

import org.apache.xmlrpc.XmlRpcClient;

public class Client {
	public static void main(String[] args) throws Exception{
		XmlRpcClient client = new XmlRpcClient("http://localhost:8080");
		Vector<Double> params = new Vector<Double>();
		params.addElement(20.0);
        System.out.println(client.execute("TemperatureConversion.celsiustofahrenheit", params));
	}
}
