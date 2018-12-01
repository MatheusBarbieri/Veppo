import React, { Component } from 'react'
import { veppoApiHost } from '../config.js'

const withCities = (EnhancedComponent) => class WithCities extends Component {
    state = {
      cities: null
    }

    componentDidMount() {
      const host = `${veppoApiHost}/cities`
      fetch(host)
        .then((res) => res.json())
        .then((cities) => this.setState({ cities }))
        .catch((err) => console.error(err))
    }

    render() {
      const { cities } = this.state
      return <EnhancedComponent {...this.props} cities={cities} />
    }
}

export default withCities
