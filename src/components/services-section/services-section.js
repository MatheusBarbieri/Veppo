import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Service from './service'

import './stylesheets/services-section.scss'

export default class ServicesSection extends Component {
  static propTypes = {
    services: PropTypes.array.isRequired
  }

  renderServices() {
    const { services } = this.props
    return services.map((service) => (
      <Service
        title={service.title}
        description={service.description}
        slug={`service_${service.slug}`}
        image={service.image} />
    ))
  }

  render() {
    return (
      <div className='services-container'>
        <div className='service-section-header'>
          Serviços
        </div>
        {this.renderServices()}
      </div>
    )
  }
}
