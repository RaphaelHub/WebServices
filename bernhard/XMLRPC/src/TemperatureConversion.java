public class TemperatureConversion {
	public double celsiustofahrenheit(double celsius) {
		return (celsius * 9.0 / 5.0) + 32.0;
	}
	
	public double fahrenheittocelsius(double fahrenheit) {
		return (fahrenheit - 32.0) * 5.0 / 9.0;
	}
	
	public double celsiustokelvin(double celsius) {
		return celsius + 273.15;
	}
	
	public double kelvintocelsius(double kelvin) {
		return kelvin - 273.15;
	}
	
	public double fahrenheittokelvin(double fahrenheit) {
		return (fahrenheit - 32.0) * 5.0 / 9.0 + 273.15;
	}
	
	public double kelvintofahrenheit(double kelvin) {
		return (kelvin - 273.15) * 9.0 / 5.0 + 32.0;
	}
	
	public String[] temperatureconversion(String inputUnit, String outputUnit, String input) {
		double inputValue = Double.valueOf(input);
		double outputValue = 0.0;
		if(inputUnit.equals(TemperatureUnit.celsius.toString())) {
			if(outputUnit.equals(TemperatureUnit.fahrenheit.toString())) outputValue = celsiustofahrenheit(inputValue);
			else if(outputUnit.equals(TemperatureUnit.kelvin.toString())) outputValue = celsiustokelvin(inputValue);
			else outputValue = inputValue;
		} else if(inputUnit.equals(TemperatureUnit.fahrenheit.toString())) {
			if(outputUnit.equals(TemperatureUnit.celsius.toString())) outputValue = fahrenheittocelsius(inputValue);
			else if(outputUnit.equals(TemperatureUnit.kelvin.toString())) outputValue = fahrenheittokelvin(inputValue);
			else outputValue = inputValue; 
		} else if(inputUnit.equals(TemperatureUnit.kelvin.toString())) {
			if(outputUnit.equals(TemperatureUnit.celsius.toString())) outputValue = kelvintocelsius(inputValue);
			else if(outputUnit.equals(TemperatureUnit.fahrenheit.toString())) outputValue = kelvintofahrenheit(inputValue);
			else outputValue = inputValue;
		}
		return new String[]{inputUnit, outputUnit, String.valueOf(outputValue)};
	}
}
