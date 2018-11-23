import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import uid from 'uniqid'

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
      <Link to={slug} className='service'>
        <div
          key={uid(`service_${slug}`)}
          style={{ backgroundImage: `url(${image})` }}
          className='service-image'
          alt={description}>
          {title}
        </div>
      </Link>
    )
  }
}
