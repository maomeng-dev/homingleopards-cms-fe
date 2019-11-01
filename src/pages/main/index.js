import React, { Component } from 'react'
import {
  Route,
  Switch,
  Link
} from 'react-router-dom'

import { Layout, Menu, Icon, Dropdown } from 'antd'

import axios from 'axios'

import MainHomePage from './home'
import ArticleListPage from './article/list'
import ArticleItemPage from './article/item'
import UserListPage from './user/list'
import UserItemPage from './user/item'
import AboutPage from './about'

import API from '../../components/api'
import responsePreprocessing from '../../utils/responsePreprocessing'

import './index.css'

const { Header, Sider, Footer } = Layout

class Logout extends Component {
  onLogoutClick () {
    axios({
      method: 'post',
      url: API.LOGOUT,
      withCredentials: true
    }).then((res) => {
      return responsePreprocessing(res)
    })
      .then((data) => {
        window.location.href = '/login/'
      })
  }

  render () {
    return (
        <span
            className="link-button"
            onClick={this.onLogoutClick.bind(this)}
        >
          注销
        </span>
    )
  }
}

class MainPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: ''
    }
  }

  componentDidMount () {
    axios({
      method: 'get',
      url: API.USER_INFO,
      withCredentials: true
    }).then((res) => {
      return responsePreprocessing(res)
    }).then((data) => {
      this.setState({
        username: data.info.user_name
      })
    })
  }

  render () {
    const loginMenu = (
        <Menu>
          <Menu.Item key="0">
            <Link to="/about/">关于</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Logout/>
          </Menu.Item>
        </Menu>
    )

    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Header className="main-header">
            <div className="main-title f-l">
              <Link to="/"><Icon type="project" theme="filled"/> 带豹回家官网 - 管理系统</Link>
            </div>
            <div className="f-r">
              欢迎访问，
              <Dropdown overlay={loginMenu} trigger={['click']}>
                <span className="ant-dropdown-link main-user">
                  <Icon type="bars"/> {this.state.username} <Icon type="down"/>
                </span>
              </Dropdown>
            </div>
          </Header>

          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                  selectedKeys={(() => {return [window.location.pathname]})()}
                  mode="inline"
                  style={{ height: '100%', borderRight: 0 }}
              >
                <Menu.Item key="/article/"><Link to="/article/"><Icon type="file-text"/>文章管理</Link></Menu.Item>
                <Menu.Item key="/user/"><Link to="/user/"><Icon type="team"/>用户管理</Link></Menu.Item>
              </Menu>
            </Sider>

            <Layout style={{ padding: '0 24px 24px' }}>
              <Switch>
                <Route exact path="/" component={MainHomePage}/>
                <Route exact path="/article/" component={ArticleListPage}/>
                <Route exact path="/article/new/" component={ArticleItemPage}/>
                <Route exact path="/user/" component={UserListPage}/>
                <Route exact path="/user/new/" component={UserItemPage}/>
                <Route exact path="/user/view/:id" component={UserItemPage}/>
                <Route exact path="/user/edit/:id" component={UserItemPage}/>
                <Route exact path="/about/" component={AboutPage}/>
              </Switch>

              <Footer style={{ textAlign: 'center' }}>
                <Icon type="code" theme="twoTone" twoToneColor="#69c0ff"/> with <Icon type="heart" twoToneColor="#ff7875" theme="twoTone"/> by CFCA-Dev-Team &copy; {(new Date()).getFullYear()}.
              </Footer>
            </Layout>
          </Layout>
        </Layout>
    )
  }
}

export default MainPage
