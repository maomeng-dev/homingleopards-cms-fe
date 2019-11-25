import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Layout, Row, Col, Button, Form, Input, Icon, Select, Modal, Spin, Table } from 'antd'

import axios from 'axios'
import moment from 'moment'

import API from '../../../components/api'
import responsePreprocessing from '../../../utils/responsePreprocessing'

const { Option } = Select
const { Content } = Layout
const { TextArea } = Input

class UserForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      resetPassword: false,
      logLoading: true,
      userLog: [],

      logPagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    }
  }

  componentDidMount () {
    // get user log
    if (this.props.mode === 'view') {
      this.getLogList(this.state.logPagination.current)
    }
  }

  onLogPageChange (target) {
    this.getLogList(target)
  }

  getLogList (page) {
    this.setState({
      logLoading: true
    })

    axios({
      method: 'get',
      url: API.USER_LOG,
      params: {
        page: page,
        pageSize: 10,
        id: this.state.uid
      },
      withCredentials: true
    })
      .then(res => {
        return responsePreprocessing(res)
      })
      .then(data => {
        data.list.forEach((item, index) => {
          item.index = index + 1
        })

        this.setState({
          logLoading: false,
          userLog: data.list,
          logPagination: {
            current: data.page.current,
            pageSize: data.page.size,
            total: data.page.total
          }
        })
      })
      .catch(err => {
        if (err) {
          console.log(err)
        }
        this.setState({
          logLoading: false
        })
      })
  }

  handleSubmit () {
    this.props.form.validateFields((err, values) => {
      if (this.props.mode === 'edit' && err instanceof Object) {
        // remove username / password error
        delete err.username
        if (!this.state.resetPassword) {
          delete err.password
          delete err.confirm
        }
      }

      if (!err || Object.keys(err).length === 0) {
        const postData = {
          id: this.props.data.id,
          user_name: values.username,
          nickname: values.nickname,
          comment: values.comment
        }
        if (values.password) {
          postData.user_pass = values.password
        }
        if (this.props.mode === 'edit') {
          delete postData.user_name
        }

        axios({
          method: 'post',
          url: API.USER_SAVE,
          data: {
            params: postData
          },
          withCredentials: true
        })
          .then(res => {
            return responsePreprocessing(res)
          })
          .then(data => {
            Modal.success({
              title: '保存成功',
              footer: null,
              closable: false,
              maskClosable: false,
              onOk: () => {
                window.location.href = '/user/'
              }
            })
          })
      }
    })
  }

  handleDelete () {
    Modal.confirm({
      title: '确认删除此用户吗？',
      onOk: () => {
        axios({
          method: 'post',
          url: API.USER_DELETE,
          data: {
            id: this.props.data.id
          },
          withCredentials: true
        })
          .then(res => {
            return responsePreprocessing(res)
          })
          .then(data => {
            Modal.success({
              title: '删除成功',
              footer: null,
              closable: false,
              maskClosable: false,
              onOk: () => {
                window.location.href = '/user/'
              }
            })
          })
      }
    })
  }

  triggerValidatePassword (rule, value, callback) {
    this.props.form.validateFields(['confirm'], { force: true }, err => {
      if (err) {
        console.log(err)
      }
    })
    callback()
  }

  validatePassword (rule, value, callback) {
    const form = this.props.form
    let result
    if (value && value !== form.getFieldValue('password')) {
      result = '两次输入的密码不一致'
    }
    callback(result)
  }

  createFormItem (results) {
    return results[this.props.mode] || ''
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const userData = this.props.data
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 }
    }

    const logColumns = [
      {
        title: '#',
        dataIndex: 'index',
        key: 'index'
      },
      {
        title: '操作类型',
        dataIndex: 'action_explain',
        key: 'action_explain'
      },
      {
        title: '操作描述',
        dataIndex: 'log_content',
        key: 'log_content'
      },
      {
        title: '操作时间',
        dataIndex: 'action_date',
        key: 'action_date',
        render: timeStamp => {
          return <span>{moment(new Date(timeStamp)).format('YYYY-MM-DD HH:mm:ss')}</span>
        }
      },
      {
        title: '操作IP',
        dataIndex: 'ip',
        key: 'ip',
        render: ip => {
          return (
            <a href={`https://www.query-ip.com/?ip=${ip}`} target="_blank" rel="noopener noreferrer">
              <Icon type="global"/> {ip}
            </a>
          )
        }
      }
    ]

    const formItems = {
      nickname: getFieldDecorator('nickname', {
        rules: [{ required: true, message: '请输入昵称' }],
        initialValue: userData.nickname
      })(<Input placeholder="请输入昵称…"/>),
      username: getFieldDecorator('username', {
        rules: [{ required: true, message: '请输入帐号' }],
        initialValue: userData.user_name
      })(<Input placeholder="请输入帐号…" disabled={this.props.mode !== 'new'}/>),
      password: getFieldDecorator('password', {
        rules: [
          {
            required: true,
            message: '请输入密码'
          },
          {
            validator: this.triggerValidatePassword.bind(this)
          }
        ],
        initialValue: userData.password
      })(<Input type="password" placeholder="请输入密码…"/>),
      confirm: getFieldDecorator('confirm', {
        rules: [
          {
            required: true,
            message: '请再次输入确认密码'
          },
          {
            validator: this.validatePassword.bind(this)
          }
        ]
      })(<Input type="password" placeholder="请再次输入确认密码…"/>),
      comment: getFieldDecorator('comment', {
        initialValue: userData.comment
      })(<TextArea placeholder="请输入备注…" autoSize={{ minRows: 2, maxRows: 6 }}/>)
    }

    return (
      <Form>
        <Form.Item {...formItemLayout} label="UID">
          {this.createFormItem({
            view: <span>{userData.id || '--'}</span>,
            edit: <span>{userData.id || '--'}</span>,
            new: <span>尚未创建</span>
          })}
        </Form.Item>

        <Form.Item {...formItemLayout} label="角色">
          {this.createFormItem({
            view: <span>{userData.is_super_user ? '管理员' : '编辑'}</span>,
            edit: (
              <Select defaultValue={userData.is_super_user ? '1' : '2'} disabled style={{ width: 200 }}>
                <Option value="1">管理员</Option>
                <Option value="2">编辑</Option>
              </Select>
            ),
            new: (
              <Select defaultValue={userData.is_super_user ? '1' : '2'} disabled style={{ width: 200 }}>
                <Option value="1">管理员</Option>
                <Option value="2">编辑</Option>
              </Select>
            )
          })}
        </Form.Item>

        <Form.Item {...formItemLayout} label="帐号">
          {this.createFormItem({
            view: <span>{userData.user_name || '--'}</span>,
            edit: formItems.username,
            new: formItems.username
          })}
        </Form.Item>

        {(() => {
          if (this.props.mode === 'view') {
            return null
          } else if ((this.props.mode === 'edit' && this.state.resetPassword) || this.props.mode === 'new') {
            return (
              <Fragment>
                <Form.Item {...formItemLayout} label="密码">
                  {this.createFormItem({
                    view: null,
                    edit: formItems.password,
                    new: formItems.password
                  })}
                </Form.Item>
                <Form.Item {...formItemLayout} label="确认密码">
                  {this.createFormItem({
                    view: null,
                    edit: formItems.confirm,
                    new: formItems.confirm
                  })}
                </Form.Item>
              </Fragment>
            )
          } else {
            return (
              <Fragment>
                <Form.Item {...formItemLayout} label="密码">
                  <Button
                    icon="rest"
                    type="danger"
                    onClick={() => {
                      this.setState({
                        resetPassword: true
                      })
                    }}
                  >
                    修改密码
                  </Button>
                </Form.Item>
              </Fragment>
            )
          }
        })()}

        <Form.Item {...formItemLayout} label="昵称">
          {this.createFormItem({
            view: <span>{userData.nickname || '--'}</span>,
            edit: formItems.nickname,
            new: formItems.nickname
          })}
        </Form.Item>

        <Form.Item {...formItemLayout} label="备注">
          {this.createFormItem({
            view: <span>{userData.comment || '--'}</span>,
            edit: formItems.comment,
            new: formItems.comment
          })}
        </Form.Item>

        {this.props.mode === 'view' ? (
          <Fragment>
            <Form.Item {...formItemLayout} label="创建时间">
              {moment(new Date(userData.cre_time)).format('YYYY-MM-DD HH:mm:ss')}
            </Form.Item>
            <Form.Item {...formItemLayout} label="上次登录时间">
              {moment(new Date(userData.last_login_time)).format('YYYY-MM-DD HH:mm:ss')}
            </Form.Item>
            <Form.Item {...formItemLayout} label="上次登录IP">
              <a
                href={`https://www.query-ip.com/?ip=${userData.last_login_ip}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon type="global"/> {userData.last_login_ip}
              </a>
            </Form.Item>
            <Form.Item {...formItemLayout} label="用户操作日志">
              <Spin
                spinning={this.state.logLoading}
                tip="加载中…"
                indicator={<Icon type="loading" style={{ fontSize: 24 }} spin/>}
              >
                <Table
                  dataSource={this.state.userLog}
                  columns={logColumns}
                  rowKey="index"
                  pagination={{
                    ...this.state.pagination,
                    onChange: this.onLogPageChange.bind(this)
                  }}
                />
              </Spin>
            </Form.Item>
          </Fragment>
        ) : null}

        {this.props.mode !== 'view' ? (
          <Form.Item className="main-form-buttons">
            <Row>
              <Col span={12}>
                {this.props.mode === 'edit' ? (
                  <Button icon="delete" size="large" type="danger" onClick={this.handleDelete.bind(this)}>
                    删除
                  </Button>
                ) : null}
                <Button icon="cloud-upload" size="large" type="primary" onClick={this.handleSubmit.bind(this)}>
                  提交
                </Button>
              </Col>
            </Row>
          </Form.Item>
        ) : (
          <Form.Item className="main-form-buttons">
            <Row>
              <Col span={12}>
                <Link to="/user/">
                  <Button icon="double-left" size="large" type="primary">
                    返回列表
                  </Button>
                </Link>
              </Col>
            </Row>
          </Form.Item>
        )}
      </Form>
    )
  }
}

const PageUserForm = Form.create({ name: 'user' })(UserForm)

class UserItemPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pageLoading: true,
      mode: '',
      uid: '',
      userData: {}
    }
  }

  componentWillMount () {
    this.setState({
      mode: this.props.match.path.split('/')[2] || '',
      uid: this.props.match.params.id || ''
    })
  }

  componentDidMount () {
    // get user data
    if (this.state.mode === 'new') {
      this.setState({
        pageLoading: false,
        logLoading: false,
        userData: {}
      })
    } else {
      axios({
        method: 'get',
        url: API.USER_INFO,
        params: {
          id: this.state.uid
        },
        withCredentials: true
      })
        .then(res => {
          return responsePreprocessing(res)
        })
        .then(data => {
          this.setState({
            pageLoading: false,
            userData: data.info
          })
        })
    }
  }

  render () {
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/user/">用户管理</Link>
          </Breadcrumb.Item>
          {(() => {
            let result = ''
            switch (this.state.mode) {
              case 'view':
                result = <Breadcrumb.Item>查看用户</Breadcrumb.Item>
                break
              case 'new':
                result = <Breadcrumb.Item>创建用户</Breadcrumb.Item>
                break
              case 'edit':
                result = <Breadcrumb.Item>编辑用户</Breadcrumb.Item>
                break
              default:
                result = null
                break
            }
            return result
          })()}
        </Breadcrumb>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Spin tip="加载中…" spinning={this.state.pageLoading}>
            <PageUserForm
              mode={this.state.mode}
              data={{
                ...this.state.userData
              }}
            />
          </Spin>
        </Content>
      </div>
    )
  }
}

export default UserItemPage
