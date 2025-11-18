import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 10, background: "#eee" }}>
      <Link to="/">Login</Link> | 
      <Link to="/register"> Register</Link> | 
      <Link to="/contact"> Contact</Link> | 
      <Link to="/about"> About</Link>
    </nav>
  );
}
