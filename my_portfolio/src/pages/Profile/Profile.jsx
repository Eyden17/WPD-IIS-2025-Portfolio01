import "./Profile.css";
import profile from "../../data/profile.json";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const iconsMap = {
  FaGithub: <FaGithub aria-hidden="true" size={24} />,
  FaLinkedin: <FaLinkedin aria-hidden="true" size={24} />
};


function Profile() {
  return (
    <main className="profile">
      <section className="bio">
        <figure>
          <img src={profile.photo} alt={`Fotografía profesional de ${profile.name}`} />
        </figure>
        <article>
          <h1>{profile.name}</h1>
          <p>{profile.bio}</p>
        </article>
      </section>

      <section className="skills">
        <h2>Habilidades Técnicas</h2>
        <ul>
          {Object.entries(profile.skills).map(([category, items]) => (
            <li key={category}>
              <strong>{category}:</strong> {items.join(", ")}
            </li>
          ))}
        </ul>
      </section>

      <section className="certifications">
        <h2>Certificaciones</h2>
        <ul>
          {profile.certifications.map((cert, i) => (
            <li key={i}>
              <a href={cert.file} download>
                {cert.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="networks">
        <h2>Redes Profesionales</h2>
        <ul>
          {profile.networks.map((net, i) => (
            <li key={i}>
              <a
                href={net.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={net.name}
              >
                {iconsMap[net.icon]} {net.name}
              </a>
            </li>
          ))}
        </ul>
      </section>


      <section className="extra">
        <h2>Información Adicional Relevante</h2>
        <ul>
          {profile.extra.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="cv-download">
        <button onClick={() => window.print()}>Descargar CV en PDF</button>
      </section>
    </main>
  );
}

export default Profile;
