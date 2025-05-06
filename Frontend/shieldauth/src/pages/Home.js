import React from 'react'
import MenuBar from '../components/MenuBar'
import Header from '../components/Header'
import "../styles/Home.css"

const Home = () => {
  return (
    <div className="home-page">
        <MenuBar />
        <Header />
    </div>
  )
}

export default Home