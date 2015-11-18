import java.util.Vector;

import org.apache.xmlrpc.XmlRpcClient;

public class Client {
	public static void main(String[] args) throws Exception{
		XmlRpcClient client = new XmlRpcClient("http://localhost:8081");
		/*Vector<Double> params = new Vector<Double>();
		params.addElement(68.0);
        System.out.println(client.execute("TemperatureConversion.fahrenheittokelvin", params));*/
		Vector<String> params = new Vector<String>();
		params.addElement("fahrenheit");
		params.addElement("kelvin");
		params.addElement("68.0");
		System.out.println(client.execute("TemperatureConversion.temperatureconversion", params));
	}
}
