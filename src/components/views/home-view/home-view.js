import React, { Component } from 'react'

import ParallaxBanner from '../../parallax-banner'

import './stylesheets/home-view.scss'

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
          <h1>Placeholding content</h1>
        </div>
      </div>
    )
  }
}
