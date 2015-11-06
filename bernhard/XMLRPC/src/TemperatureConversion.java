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
	
	public double temperatureconversion(TemperatureUnit inputUnit, TemperatureUnit outputUnit, double inputValue) {
		double outputValue = 0.0;
		if(inputUnit.equals(TemperatureUnit.celsius)) {
			if(outputUnit.equals(TemperatureUnit.fahrenheit)) outputValue = celsiustofahrenheit(inputValue);
			else if(outputUnit.equals(TemperatureUnit.kelvin)) outputValue = celsiustokelvin(inputValue);
			else outputValue = inputValue;
		} else if(inputUnit.equals(TemperatureUnit.fahrenheit)) {
			if(outputUnit.equals(TemperatureUnit.celsius)) outputValue = fahrenheittocelsius(inputValue);
			else if(outputUnit.equals(TemperatureUnit.kelvin)) outputValue = fahrenheittokelvin(inputValue);
			else outputValue = inputValue; 
		} else if(inputUnit.equals(TemperatureUnit.kelvin)) {
			if(outputUnit.equals(TemperatureUnit.celsius)) outputValue = kelvintocelsius(inputValue);
			else if(outputUnit.equals(TemperatureUnit.fahrenheit)) outputValue = kelvintofahrenheit(inputValue);
			else outputValue = inputValue;
		}
		return outputValue;
	}
}
