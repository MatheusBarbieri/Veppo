import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'

import Header from '../header'
import { HomeView, BusScheduleView } from '../views'
// import Footer from '../footer'

export default class App extends Component {
  render() {
    return (
      <ParallaxProvider>
        <Router>
          <div className='app'>
            <Header />

            <Route path='/' exact component={HomeView} />
            <Route path='/horarios' component={BusScheduleView} />

            {/* <Footer /> */}
          </div>
        </Router>
      </ParallaxProvider>
    )
  }
}
