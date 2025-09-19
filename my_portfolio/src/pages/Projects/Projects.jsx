import { useState } from "react";
import { FaHtml5, FaCss3Alt, FaReact, FaCode } from "react-icons/fa";
import { SiVite } from "react-icons/si";
import courses from "../../data/courses.json";
import "./Projects.css";

const courseIcons = {
  "IC8057": <FaHtml5 color="#E34F26" />,
  "IC5701": <FaCode color="#6b46c1" />,
};

function Projects() {
  const [filterType, setFilterType] = useState("Todos");
  const [filterTech, setFilterTech] = useState("Todos");

  const handleTypeChange = (e) => setFilterType(e.target.value);
  const handleTechChange = (e) => setFilterTech(e.target.value);

  return (
    <main className="projects">
      <h1>Trabajos Académicos</h1>

      <section className="filters">
        <label>
          Tipo de evaluación:
          <select value={filterType} onChange={handleTypeChange}>
            <option>Todos</option>
            <option>Proyecto</option>
            <option>Laboratorio</option>
            <option>Tarea</option>
            <option>Investigación</option>
            <option>Examen</option>
          </select>
        </label>

        <label>
          Tecnología:
          <select value={filterTech} onChange={handleTechChange}>
            <option>Todos</option>
            <option>React</option>
            <option>CSS</option>
            <option>HTML</option>
            <option>JavaScript</option>
            <option>Vite</option>
          </select>
        </label>
      </section>

      {courses.map((course) => (
        <details key={course.code} className="course">
          <summary>
            <header className="course-header">
              <h2>
                {courseIcons[course.code] || <FaCode />}{" "}
                {course.code} - {course.name}
              </h2>
              <p><strong>Semestre:</strong> {course.semester}</p>
              <p>{course.description}</p>
            </header>
          </summary>

          <ul className="projects-list">
            {course.projects
              .filter((proj) =>
                (filterType === "Todos" || proj.type === filterType) &&
                (filterTech === "Todos" || proj.technologies.includes(filterTech))
              )
              .map((proj, i) => (
                <li key={i}>
                  <article className="project-card">
                    <h3>{proj.title}</h3>
                    <p><strong>Tipo:</strong> {proj.type}</p>
                    <p>{proj.description}</p>
                    <p><strong>Fecha:</strong> {proj.date}</p>
                    <p><strong>Tecnologías:</strong> {proj.technologies.join(", ")}</p>
                    {proj.repo && (
                      <a href={proj.repo} target="_blank" rel="noopener noreferrer">
                        Repositorio
                      </a>
                    )}
                    {proj.demo && (
                      <a href={proj.demo} target="_blank" rel="noopener noreferrer">
                        Demo
                      </a>
                    )}
                  </article>
                </li>
              ))}
          </ul>
        </details>
      ))}
    </main>
  );
}

export default Projects;
