import { useState } from 'react'
import logo from '../../assets/logo_dark.svg'
import './Home.css'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
        <section id="intro" tabindex="0">
          <h2>¡Hola, soy Eyden Su!</h2>
          <p>
              Soy estudiante de Ingeniería en Computación en el Instituto Tecnológico de Costa Rica (TEC). 
              Me apasiona lo relacionado con redes y telecomunicaciones, la programación y la resolución de 
              problemas relacionados con la tecnología.
          </p>
          <p>
              Este portafolio tiene como propósito mostrar mi progreso académico en el curso 
              <strong> IC8057 - Introducción al Desarrollo de Páginas Web</strong>, así como 
              recopilar los proyectos, laboratorios y actividades desarrolladas. 
              Además, busca servir como una carta de presentación profesional que refleje 
              mis habilidades, intereses y crecimiento en el área de computación.
          </p>
        </section>
    </>
  )
}

export default Home
