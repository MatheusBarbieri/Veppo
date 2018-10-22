import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './stylesheets/service.scss'

export default class Service extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
  }

  render() {
    const {
      image,
      title,
      description,
      slug
    } = this.props

    return (
      <div className='service-row'>
        <div
          key={`service_${slug}`}
          style={{ backgroundImage: `url(${image})` }}
          className='default-box image-box'
          alt={description} />
        <div className='default-box description-box'>
          {title}
        </div>
      </div>
    )
  }
}
