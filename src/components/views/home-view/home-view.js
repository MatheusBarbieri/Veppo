import React, { Component } from 'react'

import ParallaxBanner from '../../parallax-banner'
import ServicesSection from '../../services-section'

import './stylesheets/home-view.scss'

import pug from './images/pugg.jpg'
import dogge from './images/dogge.jpg'

const homeServices = [
  {
    title: 'Dogge fofíneo',
    description: 'Foto de um dogge fofo',
    image: dogge,
    slug: 'dogge'
  },
  {
    title: 'Pug fofíneo',
    description: 'Foto de um pug fofo',
    image: pug,
    slug: 'pug'
  }
]

export default class HomeView extends Component {
  render() {
    return (
      <div className='home-container'>
        <ParallaxBanner>
          <div className='banner-content'>
            Venha Viajar Conosco!
          </div>
        </ParallaxBanner>
        <div className='home-content'>
          <ServicesSection services={homeServices} />
        </div>
      </div>
    )
  }
}
