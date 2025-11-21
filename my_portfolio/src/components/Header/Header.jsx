import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo_dark.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="navbar container">
        <div className="logo">
          <Link to="/">
            <img src={logo}
              alt="Logo de ESU" 
              width="70"
              tabIndex="-1">
            </img>
          </Link>
        </div>

        {/* Boton hamburguesa */}
        <button 
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Menu de navegación */}
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
          <li><Link to="/trabajos" onClick={closeMenu}>Cursos</Link></li>
          <li><Link to="/perfil" onClick={closeMenu}>Perfil</Link></li>
          <li><Link to="/recomendaciones" onClick={closeMenu}>Recomendaciones</Link></li>
          <li><Link to="/hobbies" onClick={closeMenu}>Hobbies</Link></li>
          <li><Link to="/aboutme" onClick={closeMenu}>Sobre mí</Link></li>
          <li><Link to="/drawings" onClick={closeMenu}>Dibujos</Link></li>
        </ul>

        {/* Overlay para cerrar el menu al hacer click fuera */}
        {menuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
      </nav>
    </header>
  );
};

export default Header;
