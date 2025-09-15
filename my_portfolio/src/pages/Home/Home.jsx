import { useState } from 'react'
import logo from '../../assets/logo_dark.svg'
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook} from "react-icons/fa";
import eyden from '../../assets/images/eyden_su.png'
import './Home.css'

function Home() {

  return (
    <>
    <main className="home">
      <section className="intro-grid" aria-labelledby="intro-heading">
        <article id="intro" tabIndex="0">
          <h2 className="sr-only" id="intro-heading">Sobre mí</h2>
          <p>Bienvenido a mi página</p>
          <h1>
            ¡Hola, soy <strong>Eyden Su</strong>! <br />
            futuro ingeniero
          </h1>
          
          <p>
            Soy estudiante de Ingeniería en Computación en el Instituto Tecnológico de Costa Rica (TEC). 
            Me apasiona lo relacionado con redes y telecomunicaciones, la programación y la resolución de 
            problemas relacionados con la tecnología.
          </p>
          <p>
            Este portafolio tiene como propósito mostrar mi progreso académico en el curso 
            <strong> IC8057 - Introducción al Desarrollo de Páginas Web</strong>, así como 
            recopilar los proyectos, laboratorios y actividades desarrolladas. 
            Además, busca servir como una carta de presentación profesional que refleje 
            mis habilidades, intereses y crecimiento en el área de computación.
          </p>
        </article> 

        <figure className="hero">
          <img
            src={eyden}
            alt="Imagen de Eyden Su Díaz"
          />
          <div className="hero-bg"></div>
        </figure>
      </section>
      
      <section id="links" aria-labelledby="links-heading" tabIndex="0">
        <h2 className="sr-only" id="links-heading">Mis redes sociales</h2>
        <ul>
          <li>
            <a 
              href="https://github.com/Eyden17" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
            >
              <FaGithub aria-hidden="true" /> GitHub
            </a>
          </li>
          <li>
            <a 
              href="https://www.linkedin.com/in/eyden-su-diaz-52713335a" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
            >
              <FaLinkedin aria-hidden="true" /> LinkedIn
            </a>
          </li>
          <li>
            <a 
              href="https://www.instagram.com/eyden_su/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
            >
              <FaInstagram aria-hidden="true" /> Instagram
            </a>
          </li>
          <li>
            <a 
              href="https://www.facebook.com/eyden.su.7" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
            >
              <FaFacebook aria-hidden="true" /> Facebook
            </a>
          </li>
        </ul>
      </section>

    </main>
    </>
  )
}

export default Home
