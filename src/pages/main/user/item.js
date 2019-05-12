import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Layout, Table, Divider, Tag, Row, Col, Button, Form, Input, Tooltip, Icon, Cascader, Select, Checkbox, AutoComplete } from 'antd'

const { Option } = Select
const AutoCompleteOption = AutoComplete.Option

const { Content } = Layout
const { TextArea } = Input

class UserForm extends Component {
  handleSubmit () {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  handleDelete () {

  }

  validateToNextPassword = (rule, value, callback) => {
    this.props.form.validateFields(['confirm'], (err) => {})
    callback()
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致')
    } else {
      callback()
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 10 }
    }

    /**
     UID
     角色
     用户
     帐号
     备注
     */

    return (
        <Form>
          <Form.Item {...formItemLayout} label="UID">
            123
          </Form.Item>

          <Form.Item {...formItemLayout} label="角色">
            普通用户
          </Form.Item>

          <Form.Item {...formItemLayout} label="用户名">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入用户名' }]
            })(
                <Input placeholder="请输入用户名…"/>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="帐号">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入帐号' }]
            })(
                <Input placeholder="请输入帐号…"/>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="密码">
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码'
              }, {
                validator: this.validateToNextPassword
              }]
            })(
                <Input type="password" placeholder="请输入密码…"/>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="确认密码">
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请再次输入确认密码'
              }, {
                validator: this.compareToFirstPassword
              }]
            })(
                <Input type="password" placeholder="请再次输入确认密码…"/>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="备注">
            {getFieldDecorator('comment')(
                <TextArea placeholder="请输入备注…"/>
            )}
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
      id: ''
    }
  }

  componentWillMount () {
    this.setState({
      mode: (this.props.match.path).split('/')[2] || '',
      id: (this.props.match.params).id || ''
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
            {this.state.mode}, {this.state.id}

            <PageUserForm/>
          </Content>
        </div>
    )
  }
}

export default UserItemPage