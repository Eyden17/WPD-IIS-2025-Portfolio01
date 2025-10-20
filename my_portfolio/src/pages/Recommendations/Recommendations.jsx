import { useEffect, useMemo, useRef, useState } from "react";
import "./Recommendations.css";
import { db, hasFirebase } from "../../lib/firebaseClient";
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";


const PAGE_SIZE = 6;
const LS_KEY = "recommendations_fallback";

export default function Recommendations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [contactUrl, setContactUrl] = useState("");
  const formRef = useRef(null);

  const readLocal = () => {
    const raw = localStorage.getItem(LS_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return list.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));
  };
  const writeLocal = (entry) => {
    const list = readLocal();
    localStorage.setItem(LS_KEY, JSON.stringify([entry, ...list]));
  };

  useEffect(() => {
    setLoading(true);
    if (hasFirebase && db) {
      const q = query(
        collection(db, "recommendations"),
        where("approved", "==", true),
        orderBy("created_at", "desc")
      );
      const unsub = onSnapshot(
        q,
        (snap) => {
          const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setItems(rows);
          setLoading(false);
        },
        (err) => {
          console.error("[Firestore onSnapshot error]", err?.code, err?.message);
          setLoading(false);
        }
      );
      return () => unsub();
    } else {
      setItems(readLocal());
      setLoading(false);
    }
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      formRef.current?.reportValidity();
      return;
    }

    const entry = {
      id: crypto.randomUUID(),
      name: name.trim(),
      message: message.trim(),
      contact_url: contactUrl.trim() || null,
      approved: true,
      created_at: new Date().toISOString(),
    };

    setSubmitting(true);
    try {
      if (hasFirebase && db) {
        await addDoc(collection(db, "recommendations"), {
          name: entry.name,
          message: entry.message,
          contact_url: entry.contact_url,
          approved: true,
          created_at: serverTimestamp(),
        });
        console.log("[Firestore] addDoc OK");
        setItems((cur) => [entry, ...cur]);
      } else {
        writeLocal(entry);
        setItems((cur) => [entry, ...cur]);
      }
      setName(""); setMessage(""); setContactUrl("");
    } catch (err) {
      console.error(err);
      alert("No se pudo enviar tu recomendación. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const totalPages = useMemo(() =>
    Math.max(1, Math.ceil(items.length / PAGE_SIZE)), [items.length]);
  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, page]);
  useEffect(() => { if (page > totalPages) setPage(1); }, [totalPages, page]);

  return (
    <main className="recs">
      <header className="recs-hero">
        <div>
          <h1>Recomendaciones de Compañeros</h1>
          <p className="muted">
            ¿Qué le pareció el portafolio? ¡Dejá una recomendación breve sobre mi trabajo,
            colaboración o habilidades!
          </p>
        </div>
        <div className="recs-hero-badge">
          {hasFirebase ? "Conectado a Firebase" : "Se cayó Firebase"}
        </div>
      </header>

      <section className="recs-form-card">
        <h2>Dejar una recomendación</h2>
        <form ref={formRef} className="recs-form" onSubmit={handleSubmit}>
          <div className="grid">
            <label className="field">
              <span>Nombre *</span>
              <input
                required maxLength={80}
                value={name} onChange={(e)=>setName(e.target.value)}
                placeholder="Ej. David Mora"
              />
            </label>

            <label className="field">
              <span>Enlace (opcional)</span>
              <input
                type="url" inputMode="url"
                value={contactUrl} onChange={(e)=>setContactUrl(e.target.value)}
                placeholder="LinkedIn / GitHub del autor"
              />
            </label>
          </div>

          <label className="field">
            <span>Comentario *</span>
            <textarea
              required rows={4} maxLength={600}
              value={message} onChange={(e)=>setMessage(e.target.value)}
              placeholder="Ej. Me gustó todo, sale guapo en la foto que escogió."
            />
          </label>

          <div className="actions">
            <button className="btn" disabled={submitting}>
              {submitting ? "Enviando…" : "Enviar recomendación"}
            </button>
          </div>
        </form>
      </section>

      <section className="recs-list">
        <h2>Lo que dicen mis compañeros</h2>

        {loading ? (
          <p className="muted">Cargando…</p>
        ) : items.length === 0 ? (
          <div className="recs-empty">
            <p>No hay nada aún, nadie tiene críticas</p>
          </div>
        ) : (
          <>
            <ul className="cards">
              {paged.map((r) => (
                <li key={r.id} className="card">
                  <header className="card-head">
                    <div className="avatar">{r.name?.[0]?.toUpperCase() ?? "?"}</div>
                    <div className="who">
                      <strong>{r.name}</strong>
                      {r.contact_url && (
                        <a href={r.contact_url} target="_blank" rel="noopener noreferrer" className="link">
                          Ver perfil
                        </a>
                      )}
                    </div>
                  </header>

                  <p className="msg">{r.message}</p>

                  <footer className="card-foot">
                    <time dateTime={r.created_at}>
                      {
                        r.created_at?.seconds
                          ? new Date(r.created_at.seconds * 1000).toLocaleDateString()
                          : new Date(r.created_at).toLocaleDateString()
                      }
                    </time>
                  </footer>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <nav className="pager" aria-label="Paginación">
                <button className="btn ghost" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>
                  Anterior
                </button>
                <span className="muted">Página {page} de {totalPages}</span>
                <button className="btn ghost" onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>
                  Siguiente
                </button>
              </nav>
            )}
          </>
        )}
      </section>
    </main>
  );
}
