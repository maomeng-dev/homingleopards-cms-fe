import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Layout, Table, Divider, Tag, Row, Col, Button } from 'antd'

const { Content } = Layout

class UserListPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userList: []
    }
  }

  onPageChange (target) {
    this.setState({
      userList: [
        {
          key: '00000',
          id: '00000',
          role: '0',
          title: '猫盟管理员',
          username: 'admin',
          comment: '猫盟管理员帐号'
        },
        {
          key: '10000',
          id: '10000',
          role: '1',
          title: '猫盟小老弟',
          username: 'myname1',
          comment: '实习生小A'
        },
        {
          key: '10001',
          id: '10001',
          role: '1',
          title: '阿狐狸',
          username: 'konru',
          comment: '给狐狸的帐号'
        }
      ]
    })
  }

  render () {
    const columns = [
      {
        title: 'UID',
        dataIndex: 'id',
        key: 'id',
        width: 100
      },
      {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
        width: 100,
        render: (text, record) => {
          let result = ''
          switch (text) {
            case '0' :
              text = '管理员'
              break
            case '1' :
              text = '普通用户'
              break
            default :
              text = '其他角色'
              break
          }
          return result
        }
      },
      {
        title: '用户',
        dataIndex: 'title',
        key: 'title',
        width: 200,
        render: (text, record) => (
            <Link to={`/user/view/${record.id}`}>{text}</Link>
        )
      },
      {
        title: '帐号',
        dataIndex: 'username',
        key: 'username',
        width: 200
      },
      {
        title: '备注',
        key: 'comment',
        dataIndex: 'comment'
      },
      {
        title: '操作',
        key: 'action',
        width: 300,
        render: (text, record) => (
            <span className="main-table-actions">
              <Link to={`/user/edit/${record.id}`}><Button icon="edit">编辑</Button></Link>
              <Button type="danger" icon="delete">删除</Button>
            </span>
        )
      }
    ]

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
            <Row style={{ marginBottom: 24 }}>
              <Col span={12}>
                <h2>用户列表</h2>
              </Col>
              <Col span={12}>
                <div className="f-r">
                  <Link to="/user/new/"><Button type="primary" icon="plus">添加用户</Button></Link>
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Table
                    className="main-table"
                    columns={columns}
                    dataSource={this.state.userList}
                    pagination={{
                      defaultCurrent: 1,
                      pageSize: 10,
                      total: 100,
                      onChange: this.onPageChange.bind(this)
                    }}
                />
              </Col>
            </Row>
          </Content>
        </div>
    )
  }
}

export default UserListPage