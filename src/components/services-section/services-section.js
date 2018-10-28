import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Section from '../section'
import SectionTitle from '../section-title'
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
        slug={`${service.slug}`}
        image={service.image} />
    ))
  }

  render() {
    return (
      <Section>
        <SectionTitle label='Serviços' />
        <div className='services-container'>
          {this.renderServices()}
        </div>
      </Section>
    )
  }
}
