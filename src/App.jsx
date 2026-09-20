import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Presentation from './components/Presentation'
import Funcionalidades from './components/Funcionalidades'
import Depoimentos from './components/Depoimentos'
import Contact from './components/Contact'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <Presentation/>
      <Funcionalidades/>
      <Depoimentos/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App
