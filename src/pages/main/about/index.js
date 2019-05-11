import React, { Component } from 'react'
import { Breadcrumb, Layout } from 'antd'
import { Link } from 'react-router-dom'

const { Content } = Layout

class AboutPage extends Component {
  render () {
    return (
        <div>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
            <Breadcrumb.Item>关于</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{
            background: '#fff', padding: 24, margin: 0, minHeight: 280
          }}
          >
            About
          </Content>
        </div>
    )
  }
}

export default AboutPage