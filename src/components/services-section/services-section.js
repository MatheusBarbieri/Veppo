import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

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

    return _.flatten(_.chunk(services, 2).map((pairOfServices) => (
      <div className='service-row'>
        {
          pairOfServices.map((service) => (
            <Service
              title={service.title}
              description={service.description}
              slug={`${service.slug}`}
              image={service.image} />
          ))
        }
      </div>
    )))
  }

  render() {
    return (
      <Section className='services-container'>
        <SectionTitle>
          Serviços
        </SectionTitle>
        {this.renderServices()}
      </Section>
    )
  }
}
