import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Layout, Table, Divider, Tag, Row, Col, Button, Form, Input, Tooltip, Icon, Cascader, Select, Checkbox, AutoComplete, Modal } from 'antd'

import axios from 'axios'

const { Option } = Select
const AutoCompleteOption = AutoComplete.Option

const { Content } = Layout
const { TextArea } = Input

class UserForm extends Component {
  constructor (props) {
    super(props)
  }

  handleSubmit () {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
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

    /**
     UID
     角色
     用户
     帐号
     备注
     */
    const formItems = {
      'title': getFieldDecorator('title', {
        rules: [{ required: true, message: '请输入用户名' }],
        initialValue: userData.title
      })(
          <Input placeholder="请输入用户名…"/>
      ),
      'username': getFieldDecorator('username', {
        rules: [{ required: true, message: '请输入帐号' }],
        initialValue: userData.username
      })(
          <Input placeholder="请输入帐号…"/>
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
              'view': (<span>{userData.uid || '--'}</span>),
              'edit': (<span>{userData.uid || '--'}</span>),
              'new': (<span>尚未创建</span>)
            })}
          </Form.Item>

          <Form.Item {...formItemLayout} label="角色">
            {this.createFormItem({
              'view': (<span>编辑</span>),
              'edit': (<Select defaultValue="1" disabled><Option value="1">编辑</Option></Select>),
              'new': (<Select defaultValue="1" disabled><Option value="1">编辑</Option></Select>)
            })}
          </Form.Item>

          <Form.Item {...formItemLayout} label="用户名">
            {this.createFormItem({
              'view': (<span>{userData.title || '--'}</span>),
              'edit': formItems.title,
              'new': formItems.title
            })}
          </Form.Item>

          <Form.Item {...formItemLayout} label="帐号">
            {this.createFormItem({
              'view': (<span>{userData.username || '--'}</span>),
              'edit': formItems.username,
              'new': formItems.username
            })}
          </Form.Item>

          <Form.Item {...formItemLayout} label="密码">
            {this.createFormItem({
              'view': (<span>{userData.password || '--'}</span>),
              'edit': formItems.password,
              'new': formItems.password
            })}
          </Form.Item>

          <Form.Item {...formItemLayout} label="确认密码">
            {this.createFormItem({
              'view': (<span>{userData.confirm || '--'}</span>),
              'edit': formItems.confirm,
              'new': formItems.confirm
            })}
          </Form.Item>

          <Form.Item {...formItemLayout} label="备注">
            {this.createFormItem({
              'view': (<span>{userData.comment || '--'}</span>),
              'edit': formItems.comment,
              'new': formItems.comment
            })}
          </Form.Item>

          <Form.Item className="main-form-buttons">
            <Row>
              <Col span={12}>
                <Button icon="delete" size="large" type="danger" onClick={this.handleDelete.bind(this)}>
                  删除
                </Button>
                <Button icon="cloud-upload" size="large" type="primary" onClick={this.handleSubmit.bind(this)}>
                  提交
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
    )
  }
}

const PageUserForm = Form.create({ name: 'user' })(UserForm)

class UserItemPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
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
    axios
        .get('/api/user/detail', {
          params: {
            uid: this.state.uid
          }
        })
        .finally((response) => {
          let data = {
            'title': '阿狐狸九',
            'username': 'konrumi',
            'password': '7heCa1<e15a1ie',
            'comment': '是我了了了了'
          }

          this.setState({
            userData: data
          })
        })
        .catch((error) => {
          Modal.error({
            title: '错误',
            content: error.message || '发生错误…'
          })
        })
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
              }
              return result
            })()}
          </Breadcrumb>
          <Content style={{
            background: '#fff', padding: 24, margin: 0, minHeight: 280
          }}
          >
            {this.state.mode}, {this.state.uid}

            <PageUserForm
                mode={this.state.mode}
                data={{
                  ...this.state.userData,
                  uid: this.state.uid
                }}
            />
          </Content>
        </div>
    )
  }
}

export default UserItemPage