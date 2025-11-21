import Header from './components/Header/Header.jsx'
import Home from './pages/Home/Home.jsx'
import Projects from './pages/Projects/Projects.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Recommendations from './pages/Recommendations/Recommendations.jsx'
import Hobbies from './pages/Hobbies/Hobbies.jsx'
import Drawings from './pages/Drawings/Drawings.jsx'
import AboutMe from './pages/AboutMe/AboutMe.jsx'
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trabajos" element={<Projects />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/recomendaciones" element={<Recommendations/>}></Route>
        <Route path="/hobbies" element={<Hobbies/>}></Route>
        <Route path="/aboutme" element={<AboutMe/>}></Route>
        <Route path="/drawings" element={<Drawings/>}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
