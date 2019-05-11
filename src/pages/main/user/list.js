import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Layout } from 'antd'

const { Content } = Layout

class UserListPage extends Component {
  render () {
    return (
        <div>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{
            background: '#fff', padding: 24, margin: 0, minHeight: 280
          }}
          >
            User List
          </Content>
        </div>
    )
  }
}
export default UserListPage