import img1 from '../../assets/images/about_me_1.jpg';
import img2 from '../../assets/images/about_me_2.jpg';
import img3 from '../../assets/images/about_me_3.jpg';
import data from "../../data/aboutme.json";

import "./AboutMe.css";

export default function AboutMe() {
  return (
    <main className="sobre-page">
      <h1 className="sobre-title">{data.title}</h1>
      <p className="sobre-subtitle">{data.subtitle}</p>

      <section className="sobre-content">
        <div className="sobre-text">
          {data.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <div className="sobre-photos">
            <img 
              src={img3}
              alt="Foto sobre hermanos que he hecho en el camino"
            />
          </div>
        </div>

        <div className="sobre-photos">
          <img 
            src={img1}
            alt="Foto sobre mi camino cristiano"
          />
          <img 
            src={img2}
            alt="Foto liderando jóvenes"
          />
        </div>
      </section>
    </main>
  );
}
