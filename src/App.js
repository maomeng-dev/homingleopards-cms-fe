import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN';

import LoginPage from './pages/login'
import MainPage from './pages/main'
import ErrorPage from './pages/error'

import './App.css'

class App extends Component {
  render () {
    return (
        <ConfigProvider locale={zhCN}>
          <Router>
            <div className="App">
              <Switch>
                <Route exact path="/login/" component={LoginPage}/>

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
        </ConfigProvider>
    )
  }
}

export default App
