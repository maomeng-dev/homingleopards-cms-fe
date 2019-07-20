import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

import LoginPage from './pages/login/index'
import MainPage from './pages/main/index'
import ErrorPage from './pages/error/index'

import './App.css'

class App extends Component {
  render () {
    return (
        <LocaleProvider locale={zh_CN}>
          <Router>
            <div className="App">
              <Switch>
                <Route exact path="/login" component={LoginPage}/>

                <Route exact path="/" component={MainPage}/>
                <Route exact path="/article/" component={MainPage}/>
                <Route exact path="/article/new/" component={MainPage}/>
                <Route exact path="/user/" component={MainPage}/>
                <Route exact path="/user/new/" component={MainPage}/>
                <Route exact path="/user/view/:id" component={MainPage}/>
                <Route exact path="/user/edit/:id" component={MainPage}/>
                <Route exact path="/about/" component={MainPage}/>

                <Route component={ErrorPage}/>
              </Switch>
            </div>
          </Router>
        </LocaleProvider>
    )
  }
}

export default App
