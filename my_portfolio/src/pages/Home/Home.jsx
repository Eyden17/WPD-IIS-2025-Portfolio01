import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import eyden from '../../assets/images/eyden_su.png';
import homeData from '../../data/home.json';
import './Home.css';

const iconsMap = {
  FaGithub: <FaGithub aria-hidden="true" />,
  FaLinkedin: <FaLinkedin aria-hidden="true" />,
  FaInstagram: <FaInstagram aria-hidden="true" />,
  FaFacebook: <FaFacebook aria-hidden="true" />
};

function Home() {
  return (
    <main className="home">
      <section className="intro-grid" aria-labelledby="intro-heading">
        <article id="intro" tabIndex="0">
          <h1 className="sr-only" id="intro-heading">Sobre mí</h1>
          <p className="sub">{homeData.intro.welcome}</p>
          <h1>
            {homeData.intro.headline} <br />
            {homeData.intro.subheadline}
          </h1>

          {homeData.intro.paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
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
        <h2 className="sub" id="links-heading">Mis redes sociales</h2>
        <ul>
          {homeData.links.map((link, i) => (
            <li key={i}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
              >
                {iconsMap[link.icon]} {link.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Home;
