import { useState } from 'react'
import Movies from './components/movies'
import './App.css'
import Navbar from './components/navbar'
import About from './components/aboutus'
import movies from './data/movies.json'
import Hero from './components/hero'
import ebenezer from './assets/Ebenezerr.png'
import { Routes, Route } from 'react-router'
import Admin from './components/Admin'
import Clientes from './components/clientes'
import Productos from './components/productos'
import Login from './components/login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={
          <>
            <Navbar />
            <Hero
              slides={[
                {
                  id: 1,
                  tag: "Estreno destacado",
                  title: "Ebenezer: Los fantasmas de Navidad",
                  synopsis: "Sinopsis breve de la película destacada en dos líneas, con el gancho principal de la historia y su misterioso viaje por el tiempo.",
                  image: ebenezer,
                  buyHref: "/comprar/ebenezer",
                  trailerHref: "/trailer/ebenezer",
                },
              ]}
            />
            <Movies movies={movies}/>
          </>
        }/>
        <Route path="/about" element={<About />}/>
        <Route path="/admin" element={<Admin />}>
          {/* <Route index element={<Dashboard />} /> CREAR COMPONENTE DASHBOARD*/}
          <Route path="clientes" element={<Clientes />} />
          <Route path="productos" element={<Productos />} />
         {/*  <Route path="/comprobante" element={<p>Películas</p>} /> */}
          
        </Route>  
      </Routes>
    </>
  )
}

export default App
