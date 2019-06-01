import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Layout, Table, Row, Col, Button, Spin, Icon, Modal } from 'antd'
import axios from 'axios'
import API from '../../../components/api'
import responsePreprocessing from '../../../utils/responsePreprocessing'

const { Content } = Layout

class UserListPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userList: [],
      loading: true,

      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    }
  }

  componentDidMount () {
    this.getUserList(this.state.pagination.current)
  }

  onPageChange (target) {
    this.getUserList(target)
  }

  handleDelete (uid) {
    Modal.confirm({
      title: '确认删除此用户吗？',
      onOk: () => {
        axios
            .post(API.USER_DELETE, {
              id: uid
            })
            .then((res) => {
              return responsePreprocessing(res)
            })
            .then((data) => {
              Modal.success({
                title: '删除成功',
                footer: null,
                closable: false,
                maskClosable: false,
                onOk: () => {
                  this.setState({
                    userList: []
                  })
                  this.getUserList(this.state.pagination.current)
                }
              })
            })
      }
    })
  }

  getUserList (page) {
    this.setState({
      pageLoading: true
    })

    axios
        .get(API.USER_LIST, {
          params: {
            page: page,
            pageSize: 10
          }
        })
        .then((res) => {
          return responsePreprocessing(res)
        })
        .then((data) => {
          this.setState({
            userList: data.list,
            pageLoading: false,

            pagination: {
              current: data.page.current,
              pageSize: data.page.size,
              total: data.page.total
            }
          })
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
        dataIndex: 'is_super_user',
        key: 'is_super_user',
        width: 100,
        render: (text, record) => {
          let result = ''
          if (record.is_super_user) {
            result = '管理员'
          } else {
            result = '编辑'
          }
          return result
        }
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
        width: 200,
        render: (text, record) => (
            <Link to={`/user/view/${record.id}`}>{text}</Link>
        )
      },
      {
        title: '帐号',
        dataIndex: 'user_name',
        key: 'user_name',
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
              <Button type="danger" icon="delete" onClick={this.handleDelete.bind(this, record.id)}>删除</Button>
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
                <Spin
                    spinning={this.state.pageLoading}
                    tip="加载中…"
                    indicator={<Icon type="loading" style={{ fontSize: 24 }} spin/>}
                >
                  <Table
                      className="main-table"
                      columns={columns}
                      rowKey="id"
                      dataSource={this.state.userList}
                      pagination={{
                        ...this.state.pagination,
                        onChange: this.onPageChange.bind(this)
                      }}
                  />
                </Spin>
              </Col>
            </Row>
          </Content>
        </div>
    )
  }
}

export default UserListPage
