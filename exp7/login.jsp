<%@ page import="java.sql.*" %>
<%
String u=request.getParameter("username");
String p=request.getParameter("password");

Class.forName("com.mysql.cj.jdbc.Driver");
Connection con=DriverManager.getConnection(
 "jdbc:mysql://localhost:3306/UserDB","root","");

PreparedStatement st=con.prepareStatement(
 "SELECT * FROM users WHERE username=? AND password=?");

st.setString(1,u); 
st.setString(2,p);

ResultSet rs=st.executeQuery();

out.println(rs.next() ? "Login Successful" : "Invalid Login");
%>