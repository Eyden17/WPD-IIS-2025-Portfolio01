import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import "./CanvasGallery.css";

export default function CanvasGallery() {
  const [gallery, setGallery] = useState([]);

  const loadGallery = async () => {
    const { data, error } = await supabase
      .from("drawings_meta")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setGallery(data || []);
  };

  useEffect(() => {
    loadGallery();

    const handler = () => loadGallery();
    window.addEventListener("drawing_saved", handler);

    return () => window.removeEventListener("drawing_saved", handler);
  }, []);


  return (
    <div className="carousel-container">
      {gallery.length === 0 && <p>No hay dibujos aún.</p>}

      <div className="carousel-track">
        {gallery.map((g) => (
          <div key={g.id} className="carousel-item">
            <img src={g.url} alt="Dibujo guardado" />
          </div>
        ))}
      </div>
    </div>
  );
}
