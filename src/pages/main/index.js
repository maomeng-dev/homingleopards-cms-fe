import React, { Component } from 'react'
import {
  Route,
  Switch,
  Link
} from 'react-router-dom'

import {
  Layout, Menu, Icon, Dropdown
} from 'antd'

import MainIndexPage from './index/index'
import ArticleListPage from './article/list'
import UserListPage from './user/list'
import AboutPage from './about/index'

import './index.css'

const { Header, Sider, Footer } = Layout

class MainPage extends Component {
  render () {
    const loginMenu = (
        <Menu>
          <Menu.Item key="0">
            <Link to="/about/">关于</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="/login/">登出</a>
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
                  <Icon type="bars" /> 用户名 <Icon type="down"/>
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
                <Route exact path="/" component={MainIndexPage}/>
                <Route exact path="/article/" component={ArticleListPage}/>
                <Route exact path="/user/" component={UserListPage}/>
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