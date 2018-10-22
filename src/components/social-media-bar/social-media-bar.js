import React, { Component } from 'react'

import facebook from './icons/facebook-square.svg'
import instagram from './icons/instagram.svg'
import './stylesheets/social-media-bar.scss'

const socialMediaIcons = [
  {
    title: 'facebook',
    href: 'https://www.facebook.com/rodoviariapoa/',
    alt: 'Facebook da rodoviária',
    src: facebook
  },
  {
    title: 'instagram',
    href: 'https://www.instagram.com/rodoviariapoa/',
    alt: 'Instagram da rodoviária',
    src: instagram
  }
]

export default class SocialMediaBar extends Component {
  renderIcons() {
    return socialMediaIcons.map((socialMediaIcon) => (
      <a
        key={`item_${socialMediaIcon.title}`}
        href={socialMediaIcon.href}
        alt={socialMediaIcon.alt}>
        <img
          className='social-media-bar__icon'
          src={socialMediaIcon.src}
          alt={socialMediaIcon.alt} />
      </a>
    ))
  }

  render() {
    return (
      <div className='social-media-bar'>
        {this.renderIcons()}
      </div>
    )
  }
}
