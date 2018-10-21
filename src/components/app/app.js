import React, { Component } from 'react'

import Header from '../header'
// import Footer from '../footer'

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Header />
        {/* Testing Pourposes */}
        <div style={{ background: '#ffffff', height: '2000px' }} />
        {/* <Footer /> */}
      </div>
    )
  }
}
