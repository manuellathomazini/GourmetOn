import React from 'react'
import Header from './compopnents/Header'
import Hero from './compopnents/Hero'
import Presentation from './compopnents/Presentation'
import Funcionalidades from './compopnents/Funcionalidades'
import Depoimentos from './compopnents/Depoimentos'
import Contact from './compopnents/Contact'
import Footer from './compopnents/Footer'

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
