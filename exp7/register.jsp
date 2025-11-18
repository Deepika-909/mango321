<%@ page import="java.sql.*" %>
<%
String u=request.getParameter("username");
String e=request.getParameter("email");
String p=request.getParameter("password");

Class.forName("com.mysql.cj.jdbc.Driver");
Connection con=DriverManager.getConnection(
 "jdbc:mysql://localhost:3306/UserDB","root","");

PreparedStatement st=con.prepareStatement(
 "INSERT INTO users(username,email,password) VALUES(?,?,?)");

st.setString(1,u); 
st.setString(2,e); 
st.setString(3,p);

int i=st.executeUpdate();
out.println(i>0 ? "Registered Successfully" : "Failed");
%>
<a href="login.html">Go to Login</a>