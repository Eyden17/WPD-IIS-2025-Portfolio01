import { useState, useMemo } from "react";
import { FaHtml5, FaCode } from "react-icons/fa";
import courses from "../../data/courses.json";
import "./Projects.css";

const courseIcons = {
  IC8057: <FaHtml5 color="#E34F26" />,
  IC5701: <FaCode color="#6b46c1"/>,
};

function Projects() {
  const [filterType, setFilterType] = useState("Todos");
  const [filterTech, setFilterTech] = useState("Todos");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const resetFilters = () => {
    setFilterType("Todos");
    setFilterTech("Todos");
    setDateFrom("");
    setDateTo("");
  };

  const filteredCourses = useMemo(() => {
    const toMs = (s) => (s ? new Date(s).getTime() : null);

    const filtered = courses.map((course) => {
      const projects = course.projects.filter((proj) => {
        const matchType = filterType === "Todos" || proj.type === filterType;
        const matchTech =
          filterTech === "Todos" || proj.technologies?.includes(filterTech);

        const p = toMs(proj.date);
        const from = toMs(dateFrom);
        const to = toMs(dateTo);
        const matchFrom = !from || (p && p >= from);
        const matchTo = !to || (p && p <= to);

        return matchType && matchTech && matchFrom && matchTo;
      });

      return { ...course, projects };
    });

    return filtered.filter((c) => c.projects.length > 0);
  }, [filterType, filterTech, dateFrom, dateTo]);

  return (
    <main className="projects">
      <h1>Trabajos Académicos</h1>

      <section className="filters" aria-label="Filtros de proyectos">
        <div className="filters-grid">
          <label className="field">
            <span>Tipo de evaluación</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              aria-label="Filtrar por tipo de evaluación"
            >
              <option>Todos</option>
              <option>Proyecto</option>
              <option>Laboratorio</option>
              <option>Tarea</option>
              <option>Investigación</option>
              <option>Examen</option>
            </select>
          </label>

          <label className="field">
            <span>Tecnología</span>
            <select
              value={filterTech}
              onChange={(e) => setFilterTech(e.target.value)}
              aria-label="Filtrar por tecnología"
            >
              <option>Todos</option>
              <option>React</option>
              <option>CSS</option>
              <option>HTML</option>
              <option>JavaScript</option>
              <option>Vite</option>
            </select>
          </label>

          <label className="field">
            <span>Desde</span>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              aria-label="Fecha desde"
            />
          </label>

          <label className="field">
            <span>Hasta</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              aria-label="Fecha hasta"
            />
          </label>
        </div>

        <div className="filters-actions">
          {(filterType !== "Todos" ||
            filterTech !== "Todos" ||
            dateFrom ||
            dateTo) && (
            <div className="active-badges" role="status" aria-live="polite">
              {filterType !== "Todos" && (
                <span className="badge">
                  Tipo: {filterType}
                  <button
                    className="chip-x"
                    onClick={() => setFilterType("Todos")}
                    aria-label="Quitar filtro de tipo"
                    title="Quitar filtro de tipo"
                  >
                    ×
                  </button>
                </span>
              )}
              {filterTech !== "Todos" && (
                <span className="badge">
                  Tec: {filterTech}
                  <button
                    className="chip-x"
                    onClick={() => setFilterTech("Todos")}
                    aria-label="Quitar filtro de tecnología"
                    title="Quitar filtro de tecnología"
                  >
                    ×
                  </button>
                </span>
              )}
              {dateFrom && (
                <span className="badge">
                  Desde: {dateFrom}
                  <button
                    className="chip-x"
                    onClick={() => setDateFrom("")}
                    aria-label="Quitar filtro fecha desde"
                    title="Quitar filtro fecha desde"
                  >
                    ×
                  </button>
                </span>
              )}
              {dateTo && (
                <span className="badge">
                  Hasta: {dateTo}
                  <button
                    className="chip-x"
                    onClick={() => setDateTo("")}
                    aria-label="Quitar filtro fecha hasta"
                    title="Quitar filtro fecha hasta"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}

          <button className="btn-reset" onClick={resetFilters}>
            Limpiar filtros
          </button>
        </div>
      </section>

      {filteredCourses.map((course) => (
        <details key={course.code} className="course">
          <summary>
            <header className="course-header">
              <h2>
                {courseIcons[course.code] || <FaCode />} {course.code} -{" "}
                {course.name}
              </h2>
              <p>
                <strong>Semestre:</strong> {course.semester}
              </p>
              <p>{course.description}</p>
            </header>
          </summary>

          <ul className="projects-list">
            {course.projects.map((proj, i) => (
              <li key={i}>
                <article className="project-card">
                  <header className="card-head">
                    <h3>{proj.title}</h3>
                    <span className="pill">{proj.type}</span>
                  </header>

                  <p className="muted">{proj.description}</p>

                  <div className="meta">
                    <p>
                      <strong>Fecha:</strong> {proj.date}
                    </p>
                    <p>
                      <strong>Tecnologías:</strong>{" "}
                      {proj.technologies?.join(", ")}
                    </p>
                  </div>

                  <div className="links">
                    {proj.repo && (
                      <a
                        href={proj.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Repositorio
                      </a>
                    )}
                    {proj.demo && (
                      <a
                        href={proj.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Demo
                      </a>
                    )}
                  </div>
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
