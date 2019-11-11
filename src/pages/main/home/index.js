import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Layout, Card, Row, Col, Icon } from 'antd'

const { Content } = Layout

class MainHomePage extends Component {
  render () {
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Row gutter={64}>
            <Col span={12}>
              <Link to="/article/">
                <Card title="文章管理">
                  <Row>
                    <Col span={4}>
                      <Icon type="file-text" style={{ fontSize: '60px' }}/>
                    </Col>
                    <Col span={20}>从微信公众号后台抓取新文章，或管理现有文章。</Col>
                  </Row>
                </Card>
              </Link>
            </Col>
            <Col span={12}>
              <Link to="/user/">
                <Card title="用户管理">
                  <Row>
                    <Col span={4}>
                      <Icon type="team" style={{ fontSize: '60px' }}/>
                    </Col>
                    <Col span={20}>创建新用户，或管理现有用户。</Col>
                  </Row>
                </Card>
              </Link>
            </Col>
          </Row>
        </Content>
      </div>
    )
  }
}

export default MainHomePage
