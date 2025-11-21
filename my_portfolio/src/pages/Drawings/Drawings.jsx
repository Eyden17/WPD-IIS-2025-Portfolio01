import { useRef, useState, useEffect } from "react";
import "./Drawings.css";
import CanvasGallery from "../../components/CanvasGallery.jsx";
import { supabase } from "../../lib/supabaseClient.js";
import { toast } from "sonner";

export default function Drawings() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(4);
  const [saving, setSaving] = useState(false);
  const [locked, setLocked] = useState(false);

  /* ========================
     BLOQUEO POR USUARIO
     ======================== */

  useEffect(() => {
    const count = parseInt(localStorage.getItem("canvas_used") || "0");

    if (count >= 3) {
      setLocked(true);
    }
  }, []);

  /* ========================
     INICIALIZAR CANVAS
     ======================== */

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = 400;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = size;

    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = color;
      ctxRef.current.lineWidth = size;
    }
  }, [color, size]);

  /* ========================
     DIBUJAR
     ======================== */

  const startDrawing = (e) => {
    if (locked) return;
    setIsDrawing(true);

    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
  };

  const draw = (e) => {
    if (!isDrawing || locked) return;

    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    ctxRef.current.closePath();
  };

  /* ========================
     LIMPIAR
     ======================== */

  const clearCanvas = () => {
    if (locked) return;

    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  /* ========================
     GUARDAR EN SUPABASE
     ======================== */

  const saveDrawing = async () => {
    if (locked) return;

    try {
      setSaving(true);

      const canvas = canvasRef.current;

      // ==== VALIDAR SI EL CANVAS ESTÁ VACÍO ====
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      const isEmpty = tempCanvas.toDataURL() === canvas.toDataURL();

      if (isEmpty) {
        toast.error("El dibujo está vacío", {
          description: "Debes dibujar algo antes de guardar."
        });
        setSaving(false);
        return;
      }


      const dataURL = canvas.toDataURL("image/png");

      // convertir base64 → blob
      const res = await fetch(dataURL);
      const blob = await res.blob();

      const fileName = crypto.randomUUID() + ".png";

      // subir al bucket
      const { error: uploadError } = await supabase.storage
        .from("drawings")
        .upload(fileName, blob, {
          contentType: "image/png",
        });

      if (uploadError) {
        console.error(uploadError);
        toast.error("Error al subir el dibujo", {
          description: "Revisa tu conexión o inténtalo de nuevo."
        });
        return;
      }

      // obtener URL pública
      const { data: publicURL } = supabase.storage
        .from("drawings")
        .getPublicUrl(fileName);

      // guardar metadata en la base de datos
      await supabase.from("drawings_meta").insert({
        url: publicURL.publicUrl,
        color_used: color,
        size_used: size,
      });

      let count = parseInt(localStorage.getItem("canvas_used") || "0");
      count++;

      localStorage.setItem("canvas_used", count.toString());

      if (count >= 3) {
        setLocked(true);
      }

      toast.success("¡Dibujo guardado correctamente!");
      window.dispatchEvent(new Event("drawing_saved"));
    } catch (err) {
      console.error(err);
      toast.error("Error al subir el dibujo", {
        description: "Revisa tu conexión o inténtalo de nuevo."
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="canvas-page">
      <h1>Lienzo Digital</h1>
      {locked && (
        <div className="locked-box">
          <p>Has alcanzado el límite de 3 dibujos por sesión ✔</p>
          <p className="muted">Gracias por participar</p>
        </div>
      )}


      <section className="canvas-tools">
        <label>
          Color
          <input type="color" disabled={locked} value={color} onChange={(e) => setColor(e.target.value)} />
        </label>

        <label>
          Tamaño
          <input
            type="range"
            min="2"
            max="20"
            disabled={locked}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </label>

        <button onClick={clearCanvas} disabled={locked}>Limpiar</button>
        <button onClick={saveDrawing} disabled={locked || saving}>
          {saving ? "Guardando…" : "Guardar"}
        </button>
      </section>

      <canvas
        ref={canvasRef}
        className={`canvas-board ${locked ? "locked" : ""}`}
        onMouseDown={locked ? undefined : startDrawing}
        onMouseMove={locked ? undefined : draw}
        onMouseUp={stopDrawing}

        onTouchStart={locked ? undefined : startDrawing}
        onTouchMove={locked ? undefined : draw}
        onTouchEnd={stopDrawing}
      />

      <h2>Galería global</h2>
      <CanvasGallery />

    </main>
  );
}
