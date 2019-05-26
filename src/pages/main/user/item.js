import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Layout, Row, Col, Button, Form, Input, Icon, Select, Modal, Spin } from 'antd'

import axios from 'axios'

import API from '../../../components/api'
import checkAjax from '../../../utils/checkAjax'

const { Option } = Select

const { Content } = Layout
const { TextArea } = Input

class UserForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      resetPassword: false
    }
  }

  handleSubmit () {
    this.props.form.validateFields((err, values) => {
      if (this.props.mode === 'edit' && !this.state.resetPassword) {
        if (err instanceof Object) {
          delete err.password
          delete err.confirm
          if (Object.keys(err).length === 0) {
            err = null
          }
        }
      }

      if (!err) {
        axios
            .post(API.USER_SAVE, {
              params: {
                ...values
              }
            })
            .then((res) => {
              return checkAjax(res)
            })
            .then((data) => {
              console.log('Received values of form: ', values)
            })
            .catch((err) => {
              Modal.error({
                title: '错误',
                content: err.message || '发生错误…'
              })
            })
      }
    })
  }

  handleDelete () {

  }

  triggerValidatePassword = (rule, value, callback) => {
    this.props.form.validateFields(['confirm'], (err) => {})
    callback()
  }

  validatePassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致')
    } else {
      callback()
    }
  }

  createFormItem (results) {
    return (results[this.props.mode] || '')
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 }
    }

    const userData = this.props.data

    const formItems = {
      'nickname': getFieldDecorator('nickname', {
        rules: [{ required: true, message: '请输入昵称' }],
        initialValue: userData.nickname
      })(
          <Input placeholder="请输入昵称…"/>
      ),
      'username': getFieldDecorator('username', {
        rules: [{ required: true, message: '请输入帐号' }],
        initialValue: userData.user_name
      })(
          <Input placeholder="请输入帐号…" disabled={(this.props.mode === 'new') ? false : true}/>
      ),
      'password': getFieldDecorator('password', {
        rules: [{
          required: true, message: '请输入密码'
        }, {
          validator: this.triggerValidatePassword
        }],
        initialValue: userData.password
      })(
          <Input type="password" placeholder="请输入密码…"/>
      ),
      'confirm': getFieldDecorator('confirm', {
        rules: [{
          required: true, message: '请再次输入确认密码'
        }, {
          validator: this.validatePassword
        }]
      })(
          <Input type="password" placeholder="请再次输入确认密码…"/>
      ),
      'comment': getFieldDecorator('comment', {
        initialValue: userData.comment
      })(
          <TextArea placeholder="请输入备注…" autosize={{ minRows: 2, maxRows: 6 }}/>
      )
    }

    return (
        <Form>
          <Form.Item {...formItemLayout} label="UID">
            {this.createFormItem({
              'view': (<span>{userData.id || '--'}</span>),
              'edit': (<span>{userData.id || '--'}</span>),
              'new': (<span>尚未创建</span>)
            })}
          </Form.Item>

          <Form.Item {...formItemLayout} label="角色">
            {this.createFormItem({
              'view': (<span>{userData.is_super_user ? '管理员' : '编辑'}</span>),
              'edit': (
                  <Select defaultValue={userData.is_super_user ? '1' : '2'} disabled style={{ width: 200 }}><Option value="1">管理员</Option><Option value="2">编辑</Option></Select>),
              'new': (
                  <Select defaultValue={userData.is_super_user ? '1' : '2'} disabled style={{ width: 200 }}><Option value="1">管理员</Option><Option value="2">编辑</Option></Select>)
            })}
          </Form.Item>

          <Form.Item {...formItemLayout} label="帐号">
            {this.createFormItem({
              'view': (<span>{userData.user_name || '--'}</span>),
              'edit': formItems.username,
              'new': formItems.username
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
                        'view': null,
                        'edit': formItems.password,
                        'new': formItems.password
                      })}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="确认密码">
                      {this.createFormItem({
                        'view': null,
                        'edit': formItems.confirm,
                        'new': formItems.confirm
                      })}
                    </Form.Item>
                  </Fragment>
              )
            } else {
              return (
                  <Fragment>
                    <Form.Item {...formItemLayout} label="密码">
                      <Button icon="rest" type="danger" onClick={() => {
                        this.setState({
                          resetPassword: true
                        })
                      }}>
                        重置密码
                      </Button>
                    </Form.Item>
                  </Fragment>
              )
            }
          })()}

          <Form.Item {...formItemLayout} label="昵称">
            {this.createFormItem({
              'view': (<span>{userData.nickname || '--'}</span>),
              'edit': formItems.nickname,
              'new': formItems.nickname
            })}
          </Form.Item>

          <Form.Item {...formItemLayout} label="备注">
            {this.createFormItem({
              'view': (<span>{userData.comment || '--'}</span>),
              'edit': formItems.comment,
              'new': formItems.comment
            })}
          </Form.Item>

          {
            this.props.mode === 'view'
                ? (
                    <Fragment>
                      <Form.Item {...formItemLayout} label="创建时间">
                        {userData.cre_time}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="上次登录时间">
                        {userData.last_login_time}
                      </Form.Item>
                      <Form.Item {...formItemLayout} label="上次登录IP">
                        <a href={`https://www.query-ip.com/?ip=${userData.last_login_ip}`} target="_blank" rel="noopener noreferrer"><Icon type="global"/> {userData.last_login_ip}
                        </a>
                      </Form.Item>
                    </Fragment>
                )
                : null
          }

          {
            this.props.mode !== 'view'
                ? (
                    <Form.Item className="main-form-buttons">
                      <Row>
                        <Col span={12}>
                          {
                            this.props.mode === 'edit'
                                ? (
                                    <Button icon="delete" size="large" type="danger" onClick={this.handleDelete.bind(this)}>
                                      删除
                                    </Button>
                                )
                                : null
                          }
                          <Button icon="cloud-upload" size="large" type="primary" onClick={this.handleSubmit.bind(this)}>
                            提交
                          </Button>
                        </Col>
                      </Row>
                    </Form.Item>
                )
                : (
                    <Form.Item className="main-form-buttons">
                      <Row>
                        <Col span={12}>
                          <Link to="/user/">
                            <Button icon="double-left" size="large" type="primary" onClick={this.handleDelete.bind(this)}>
                              返回列表
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                    </Form.Item>
                )
          }
        </Form>
    )
  }
}

const PageUserForm = Form.create({ name: 'user' })(UserForm)

class UserItemPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      mode: '',
      id: '',
      userData: {}
    }
  }

  componentWillMount () {
    this.setState({
      mode: (this.props.match.path).split('/')[2] || '',
      uid: (this.props.match.params).id || ''
    })
  }

  componentDidMount () {
    if (this.state.mode === 'new') {
      this.setState({
        loading: false,
        userData: {}
      })
    } else {
      axios
          .get(API.USER_INFO, {
            params: {
              id: this.state.uid
            }
          })
          .then((res) => {
            return checkAjax(res)
          })
          .then((data) => {
            this.setState({
              loading: false,
              userData: data.info
            })
          })
          .catch((err) => {
            Modal.error({
              title: '错误',
              content: err.message || '发生错误…'
            })
          })
    }
  }

  render () {
    return (
        <div>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/user/">用户管理</Link></Breadcrumb.Item>
            {(() => {
              let result = ''
              switch (this.state.mode) {
                case 'view' :
                  result = (<Breadcrumb.Item>查看用户</Breadcrumb.Item>)
                  break
                case 'new' :
                  result = (<Breadcrumb.Item>创建用户</Breadcrumb.Item>)
                  break
                case 'edit' :
                  result = (<Breadcrumb.Item>编辑用户</Breadcrumb.Item>)
                  break
                default :
                  result = null
                  break
              }
              return result
            })()}
          </Breadcrumb>
          <Content style={{
            background: '#fff', padding: 24, margin: 0, minHeight: 280
          }}
          >
            <Spin tip="加载中…" spinning={this.state.loading}>
              <PageUserForm
                  mode={this.state.mode}
                  data={{
                    ...this.state.userData,
                    uid: this.state.uid
                  }}
              />
            </Spin>
          </Content>
        </div>
    )
  }
}

export default UserItemPage
