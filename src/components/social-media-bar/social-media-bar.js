import React, { Component } from 'react'
import uid from 'uniqid'

import facebook from './icons/facebook.svg'
import twitter from './icons/twitter.svg'
import playstore from './icons/playstore.svg'
import applestore from './icons/apple.svg'
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
  },
  {
    title: 'twitter',
    href: 'https://twitter.com/rodoviariapoa',
    alt: 'Twitter da rodoviária',
    src: twitter
  },
  {
    title: 'playstore',
    href: 'https://play.google.com/store/apps/details?id=veppo.mobile&hl=pt_BR',
    alt: 'Download do aplicativo para android',
    src: playstore
  },
  {
    title: 'itunes',
    href: 'https://itunes.apple.com/br/app/veppo-rodoviaria-poa/id1182117922',
    alt: 'Download do aplicativo para iphone',
    src: applestore
  }
]

export default class SocialMediaBar extends Component {
  renderIcons() {
    return socialMediaIcons.map((socialMediaIcon) => (
      <a
        key={uid('social-media-icon')}
        className='social-media-bar__link'
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
