import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'

import Header from '../header'
import { HomeView, BusScheduleView, ServicesView } from '../views'
import Footer from '../footer'

export default class App extends Component {
  render() {
    return (
      <ParallaxProvider>
        <Router>
          <div className='app'>
            <Header />

            <Switch>
              <Route path='/home' component={HomeView} />
              <Route path='/horarios' component={BusScheduleView} />
              <Route path='/servicos' component={ServicesView} />
              <Redirect from='*' to='/home' />
            </Switch>

            <Footer />
          </div>
        </Router>
      </ParallaxProvider>
    )
  }
}
