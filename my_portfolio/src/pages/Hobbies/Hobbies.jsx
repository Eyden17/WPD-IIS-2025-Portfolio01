import { useMemo } from "react";
import "./Hobbies.css";

const CHANNEL_URL = "https://www.youtube.com/@zepgi";

// Tus videos
const RAW_VIDEO_URLS = [
  "https://www.youtube.com/watch?v=kj30aP3Y8Hw",
  "https://www.youtube.com/watch?v=Q-omZqYMCzo",
];

function getVideoId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.searchParams.get("v")) return u.searchParams.get("v");
  } catch {}
  return null;
}

export default function Hobbies() {
  const videos = useMemo(
    () =>
      RAW_VIDEO_URLS.map((u) => ({
        url: u,
        id: getVideoId(u),
      })).filter((v) => v.id),
    []
  );

  return (
    <main className="hobbies-page">
      <header className="hobbies-hero">
        <div>
          <h1>Hobbies & Intereses</h1>
          <p className="muted">
            Además del desarrollo, me gusta crear contenido y editar videos. Tambien me gusta compartir lo que voy
            aprendiendo . Aquí dejo un par de videos y el enlace a mi canal.
          </p>
        </div>

        <div className="hobbies-cta">
          <a
            className="btn-accent"
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visitar mi canal
          </a>
        </div>
      </header>

      <section className="hobbies-videos">
        <h2>Videos destacados</h2>

        <ul className="video-grid">
          {videos.map((v) => (
            <li key={v.id} className="video-card">
              <div className="video-ratio">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                  title={`YouTube video ${v.id}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="video-meta">
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  Ver en YouTube
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="hobbies-channel">
        <h2>Mi canal de YouTube</h2>
        <p className="muted">
          Subo clips de gameplay, proyectos y pequeños tutoriales. ¡Pasen a verlo y
          suscribite para apoyar el contenido!
        </p>

        <div className="channel-card">
          <div className="channel-info">
            <strong>@Zepgi</strong>
            <span>Contenido: gameplay • dev</span>
          </div>
          <a
            className="btn ghost"
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ir al canal
          </a>
        </div>
      </section>
    </main>
  );
}
