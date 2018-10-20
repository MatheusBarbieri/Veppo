import React, { Component } from 'react'

import Header from '../header'

import './stylesheets/app.scss'

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Header />
        {/* Testing Pourposes */}
        <div style={{ background: '#f7efc1', height: '2000px' }} />
      </div>
    )
  }
}
