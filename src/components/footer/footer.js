import React, { Component } from 'react'

import SocialMediaBar from '../social-media-bar'

import './stylesheets/footer.scss'

export default class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <div className='footer__social-media'>
          <SocialMediaBar />
        </div>
        <div className='footer__text'>
          (51) 3210-0101 | veppo@rodoviaria-poa.com.br
        </div>
        <div className='footer__text'>
          ©2018 - Rodoviária de Porto Alegre
        </div>
      </div>
    )
  }
}
