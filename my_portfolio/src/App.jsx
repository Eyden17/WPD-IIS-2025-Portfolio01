import Header from './components/Header/Header.jsx'
import Home from './pages/Home/Home.jsx'
import Projects from './pages/Projects/Projects.jsx'
import Profile from './pages/Profile/Profile.jsx'
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trabajos" element={<Projects />} />
        <Route path="/perfil" element={<Profile />} />
      </Routes>
    </>
  )
}
