import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

import MainIndexPage from './index/index'
import UserListPage from './user/list'
import ArticleListPage from './article/list'

class MainPage extends Component {
  render () {
    return (
        <div>
          main page

          <Router>
            <div>
              <Switch>
                <Route exact path="/" component={MainIndexPage}/>
                <Route exact path="/user" component={UserListPage}/>
                <Route exact path="/article" component={ArticleListPage}/>
              </Switch>
            </div>
          </Router>
        </div>
    )
  }
}

export default MainPage