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
        <img
          key={`service_${slug}`}
          className='service-box'
          src={image}
          alt={description} />
        <div className='box-title'>
          {title}
        </div>
      </div>
    )
  }
}
