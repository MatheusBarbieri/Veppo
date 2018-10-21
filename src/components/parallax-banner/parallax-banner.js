import React from 'react'
import PropTypes from 'prop-types'

import { Parallax } from 'react-scroll-parallax'

import './stylesheets/parallax-banner.scss'
import bannerImage from './images/banner.jpg'

const parallaxParam = {
  min: '-30%',
  max: '30%'
}

const ParallaxBanner = ({ children }) => (
  <div className='parallax-banner-container'>
    <Parallax offsetYMin={parallaxParam.min} offsetYMax={parallaxParam.max} slowerScrollRate>
      <div
        className='parallax-banner-image'
        style={{ backgroundImage: `url(${bannerImage})` }} />
      {children && <div className='parallax-banner-children'>{children}</div>}
    </Parallax>
  </div>
)

ParallaxBanner.propTypes = {
  children: PropTypes.node
}

ParallaxBanner.defaultProps = {
  children: null
}

export default ParallaxBanner
