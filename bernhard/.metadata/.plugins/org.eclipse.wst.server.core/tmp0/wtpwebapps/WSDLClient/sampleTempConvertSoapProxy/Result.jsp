<%@page contentType="text/html;charset=UTF-8"%>
<% request.setCharacterEncoding("UTF-8"); %>
<HTML>
<HEAD>
<TITLE>Result</TITLE>
</HEAD>
<BODY>
<H1>Result</H1>

<jsp:useBean id="sampleTempConvertSoapProxyid" scope="session" class="com.w3schools.www.xml.TempConvertSoapProxy" />
<%
if (request.getParameter("endpoint") != null && request.getParameter("endpoint").length() > 0)
sampleTempConvertSoapProxyid.setEndpoint(request.getParameter("endpoint"));
%>

<%
String method = request.getParameter("method");
int methodID = 0;
if (method == null) methodID = -1;

if(methodID != -1) methodID = Integer.parseInt(method);
boolean gotMethod = false;

try {
switch (methodID){ 
case 2:
        gotMethod = true;
        java.lang.String getEndpoint2mtemp = sampleTempConvertSoapProxyid.getEndpoint();
if(getEndpoint2mtemp == null){
%>
<%=getEndpoint2mtemp %>
<%
}else{
        String tempResultreturnp3 = org.eclipse.jst.ws.util.JspUtils.markup(String.valueOf(getEndpoint2mtemp));
        %>
        <%= tempResultreturnp3 %>
        <%
}
break;
case 5:
        gotMethod = true;
        String endpoint_0id=  request.getParameter("endpoint8");
            java.lang.String endpoint_0idTemp = null;
        if(!endpoint_0id.equals("")){
         endpoint_0idTemp  = endpoint_0id;
        }
        sampleTempConvertSoapProxyid.setEndpoint(endpoint_0idTemp);
break;
case 10:
        gotMethod = true;
        com.w3schools.www.xml.TempConvertSoap getTempConvertSoap10mtemp = sampleTempConvertSoapProxyid.getTempConvertSoap();
if(getTempConvertSoap10mtemp == null){
%>
<%=getTempConvertSoap10mtemp %>
<%
}else{
        if(getTempConvertSoap10mtemp!= null){
        String tempreturnp11 = getTempConvertSoap10mtemp.toString();
        %>
        <%=tempreturnp11%>
        <%
        }}
break;
case 13:
        gotMethod = true;
        String fahrenheit_1id=  request.getParameter("fahrenheit16");
            java.lang.String fahrenheit_1idTemp = null;
        if(!fahrenheit_1id.equals("")){
         fahrenheit_1idTemp  = fahrenheit_1id;
        }
        java.lang.String fahrenheitToCelsius13mtemp = sampleTempConvertSoapProxyid.fahrenheitToCelsius(fahrenheit_1idTemp);
if(fahrenheitToCelsius13mtemp == null){
%>
<%=fahrenheitToCelsius13mtemp %>
<%
}else{
        String tempResultreturnp14 = org.eclipse.jst.ws.util.JspUtils.markup(String.valueOf(fahrenheitToCelsius13mtemp));
        %>
        <%= tempResultreturnp14 %>
        <%
}
break;
case 18:
        gotMethod = true;
        String celsius_2id=  request.getParameter("celsius21");
            java.lang.String celsius_2idTemp = null;
        if(!celsius_2id.equals("")){
         celsius_2idTemp  = celsius_2id;
        }
        java.lang.String celsiusToFahrenheit18mtemp = sampleTempConvertSoapProxyid.celsiusToFahrenheit(celsius_2idTemp);
if(celsiusToFahrenheit18mtemp == null){
%>
<%=celsiusToFahrenheit18mtemp %>
<%
}else{
        String tempResultreturnp19 = org.eclipse.jst.ws.util.JspUtils.markup(String.valueOf(celsiusToFahrenheit18mtemp));
        %>
        <%= tempResultreturnp19 %>
        <%
}
break;
}
} catch (Exception e) { 
%>
Exception: <%= org.eclipse.jst.ws.util.JspUtils.markup(e.toString()) %>
Message: <%= org.eclipse.jst.ws.util.JspUtils.markup(e.getMessage()) %>
<%
return;
}
if(!gotMethod){
%>
result: N/A
<%
}
%>
</BODY>
</HTML>