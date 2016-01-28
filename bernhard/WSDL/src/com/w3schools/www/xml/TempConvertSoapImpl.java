/**
 * TempConvertSoapImpl.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.w3schools.www.xml;

public class TempConvertSoapImpl implements com.w3schools.www.xml.TempConvertSoap{
    public java.lang.String fahrenheitToCelsius(java.lang.String fahrenheit) throws java.rmi.RemoteException {
    	return new Double((Double.parseDouble(fahrenheit) - 32.0) * 5.0 / 9.0).toString();
    }

    public java.lang.String celsiusToFahrenheit(java.lang.String celsius) throws java.rmi.RemoteException {
    	return new Double((Double.parseDouble(celsius) * 9.0 / 5.0) + 32.0).toString();
    }

}
