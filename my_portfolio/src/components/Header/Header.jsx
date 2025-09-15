import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo_dark.svg";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar container">
        <div className="logo">
          <Link to="/">
            <img src={logo}
              alt="Logo de ESU" 
              width="70"
              tabindex="-1">
            </img>
          </Link>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/trabajos">Cursos</Link></li>
          <li><Link to="/perfil">Perfil</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
