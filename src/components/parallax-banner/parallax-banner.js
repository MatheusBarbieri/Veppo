import React from 'react'
import PropTypes from 'prop-types'

import { Parallax } from 'react-scroll-parallax'

import './stylesheets/parallax-banner.scss'
import bannerImage from './images/banner.jpg'

const parallaxParam = {
  min: '-100%',
  max: '100%'
}

const ParallaxBanner = ({ children }) => (
  <div className='parallax-banner-container'>
    <Parallax offsetYMin={parallaxParam.min} offsetYMax={parallaxParam.max} slowerScrollRate>
      <div
        className='parallax-banner-image'
        style={{ backgroundImage: `url(${bannerImage})` }} />
    </Parallax>
    {children
       && (
       <div className='parallax-banner-content'>
         <div className='parallax-banner-children'>
           {children}
         </div>
       </div>
       )
     }
  </div>
)

ParallaxBanner.propTypes = {
  children: PropTypes.node
}

ParallaxBanner.defaultProps = {
  children: null
}

export default ParallaxBanner
