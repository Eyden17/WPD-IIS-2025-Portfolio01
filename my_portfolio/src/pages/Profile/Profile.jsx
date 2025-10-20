import React, { useRef, useCallback, useState } from "react";
import html2pdf from "html2pdf.js";
import "./Profile.css";
import profile from "../../data/profile.json";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const iconsMap = {
  FaGithub: <FaGithub aria-hidden="true" size={24} />,
  FaLinkedin: <FaLinkedin aria-hidden="true" size={24} />
};

function Profile() {
  const cvRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = useCallback(async () => {
    if (!cvRef.current) return;
    try {
      setDownloading(true);

      // Clona el nodo para no afectar tu UI mientras se renderiza
      const node = cvRef.current.cloneNode(true);
      // Remueve elementos marcados para ocultar en PDF (botones, etc.)
      node.querySelectorAll(".pdf-hide").forEach((el) => el.remove());

      await html2pdf()
        .set({
          margin: [10, 10, 12, 10], // mm
          filename: "Curriculum.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: null,
            scrollY: 0
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["css", "legacy"] } // respeta .page-break si la usás
        })
        .from(node)
        .save();
    } finally {
      setDownloading(false);
    }
  }, []);

  return (
    <main className="profile" ref={cvRef}>
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

      {/* === Botón existente, ahora excluido del PDF === */}
      <section className="cv-download pdf-hide">
        <button onClick={handleDownloadPDF} disabled={downloading}>
          {downloading ? "Generando…" : "Descargar CV en PDF"}
        </button>
      </section>
    </main>
  );
}

export default Profile;
