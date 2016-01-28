/**
 * TempConvertSoapSkeleton.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.w3schools.www.xml;

public class TempConvertSoapSkeleton implements com.w3schools.www.xml.TempConvertSoap, org.apache.axis.wsdl.Skeleton {
    private com.w3schools.www.xml.TempConvertSoap impl;
    private static java.util.Map _myOperations = new java.util.Hashtable();
    private static java.util.Collection _myOperationsList = new java.util.ArrayList();

    /**
    * Returns List of OperationDesc objects with this name
    */
    public static java.util.List getOperationDescByName(java.lang.String methodName) {
        return (java.util.List)_myOperations.get(methodName);
    }

    /**
    * Returns Collection of OperationDescs
    */
    public static java.util.Collection getOperationDescs() {
        return _myOperationsList;
    }

    static {
        org.apache.axis.description.OperationDesc _oper;
        org.apache.axis.description.FaultDesc _fault;
        org.apache.axis.description.ParameterDesc [] _params;
        _params = new org.apache.axis.description.ParameterDesc [] {
            new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("http://www.w3schools.com/xml/", "Fahrenheit"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false), 
        };
        _oper = new org.apache.axis.description.OperationDesc("fahrenheitToCelsius", _params, new javax.xml.namespace.QName("http://www.w3schools.com/xml/", "FahrenheitToCelsiusResult"));
        _oper.setReturnType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        _oper.setElementQName(new javax.xml.namespace.QName("http://www.w3schools.com/xml/", "FahrenheitToCelsius"));
        _oper.setSoapAction("http://www.w3schools.com/xml/FahrenheitToCelsius");
        _myOperationsList.add(_oper);
        if (_myOperations.get("fahrenheitToCelsius") == null) {
            _myOperations.put("fahrenheitToCelsius", new java.util.ArrayList());
        }
        ((java.util.List)_myOperations.get("fahrenheitToCelsius")).add(_oper);
        _params = new org.apache.axis.description.ParameterDesc [] {
            new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("http://www.w3schools.com/xml/", "Celsius"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false), 
        };
        _oper = new org.apache.axis.description.OperationDesc("celsiusToFahrenheit", _params, new javax.xml.namespace.QName("http://www.w3schools.com/xml/", "CelsiusToFahrenheitResult"));
        _oper.setReturnType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        _oper.setElementQName(new javax.xml.namespace.QName("http://www.w3schools.com/xml/", "CelsiusToFahrenheit"));
        _oper.setSoapAction("http://www.w3schools.com/xml/CelsiusToFahrenheit");
        _myOperationsList.add(_oper);
        if (_myOperations.get("celsiusToFahrenheit") == null) {
            _myOperations.put("celsiusToFahrenheit", new java.util.ArrayList());
        }
        ((java.util.List)_myOperations.get("celsiusToFahrenheit")).add(_oper);
    }

    public TempConvertSoapSkeleton() {
        this.impl = new com.w3schools.www.xml.TempConvertSoapImpl();
    }

    public TempConvertSoapSkeleton(com.w3schools.www.xml.TempConvertSoap impl) {
        this.impl = impl;
    }
    public java.lang.String fahrenheitToCelsius(java.lang.String fahrenheit) throws java.rmi.RemoteException
    {
        java.lang.String ret = impl.fahrenheitToCelsius(fahrenheit);
        return ret;
    }

    public java.lang.String celsiusToFahrenheit(java.lang.String celsius) throws java.rmi.RemoteException
    {
        java.lang.String ret = impl.celsiusToFahrenheit(celsius);
        return ret;
    }

}
