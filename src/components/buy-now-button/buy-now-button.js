import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './stylesheets/buy-now-button.scss'
import tickets from './icons/tickets.svg'

export default class BuyNowButton extends Component {
  render() {
    return (
      <Link to='passagens' className='buy-now-button__link'>
        <div className='buy-now-button'>
          <img
            className='buy-now-button__icon'
            src={tickets}
            alt='Ícon de passagens' />
          <div className='buy-now-button__text'>
              Comprar passagens agora!
          </div>
        </div>
      </Link>
    )
  }
}
