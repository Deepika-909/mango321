import java.sql.*;

public class CRUDExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/UserDB";
        String user = "root";       // or whatever your MySQL username is
        String pass = "";           // enter password if set

        try (Connection con = DriverManager.getConnection(url, user, pass);
             Statement st = con.createStatement()) {

            // 1. CREATE
            st.executeUpdate("INSERT INTO employees(name,salary) VALUES('Alice',50000)");

            // 2. READ
            ResultSet rs = st.executeQuery("SELECT * FROM employees");
            while (rs.next())
                System.out.println(rs.getInt("id")+"  "+rs.getString("name")+"  "+rs.getInt("salary"));

            // 3. UPDATE
            st.executeUpdate("UPDATE employees SET salary=55000 WHERE name='Alice'");

            // 4. DELETE
            st.executeUpdate("DELETE FROM employees WHERE name='Alice'");

            System.out.println("CRUD operations completed.");
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
}
