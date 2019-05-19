import React, { Component } from 'react'
import { Card, Row, Col, Input, Divider, Button, Icon, Modal } from 'antd'
import axios from 'axios'

import './index.css'

import imgFoxUser from '../../assets/img/fox-user.png'
import imgFoxPass from '../../assets/img/fox-pass.png'

class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      pass: '',
      foxImg: imgFoxUser,
      userInvalid: false,
      passInvalid: false
    }
  }

  onInputFocus (inputName) {
    let targetFoxImg

    switch (inputName) {
      case 'pass' :
        targetFoxImg = imgFoxPass
        break
      case 'user' :
      default :
        targetFoxImg = imgFoxUser
        break
    }

    this.setState({
      foxImg: targetFoxImg
    })
  }

  onLoginButtonClick () {
    let isInvalid = false
    if (this.state.user.length === 0) {
      isInvalid = true
      this.setState({
        userInvalid: true
      })
    }
    if (this.state.pass.length === 0) {
      isInvalid = true
      this.setState({
        passInvalid: true
      })
    }

    if (!isInvalid) {
      axios
          .post('/api/login', {
            params: {
              user: this.state.user,
              pass: this.state.pass
            }
          })
          .then((response) => {
            window.location.href = '/'
          })
          .catch((error) => {
            Modal.error({
              title: '错误',
              content: error.message || '发生错误…'
            })
          })
    }
  }

  onResetButtonClick () {
    this.setState({
      user: '',
      pass: ''
    })
  }

  render () {
    return (
        <div className="login">
          <Card title="带豹回家官网 - 管理系统 登录" className="login-card">
            <Row>
              <Col span={10}>
                <img src={this.state.foxImg} style={{ width: '185px', height: '160px' }} alt="欢迎狐狸"/>
              </Col>
              <Col span={14}>
                <div className={!this.state.userInvalid ? 'login-input-row' : 'login-input-row has-error'}>
                  <Input
                      value={this.state.user}
                      size="large"
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                      placeholder="请输入用户名…"
                      allowClear
                      onChange={(e) => {
                        this.setState({
                          user: e.target.value,
                          userInvalid: false
                        })
                      }}
                      onFocus={() => {
                        this.onInputFocus('user')
                      }}
                  />
                </div>

                <div className={!this.state.passInvalid ? 'login-input-row' : 'login-input-row has-error'}>
                  <Input.Password
                      value={this.state.pass}
                      size="large"
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                      placeholder="请输入密码…"
                      onChange={(e) => {
                        this.setState({
                          pass: e.target.value,
                          passInvalid: false
                        })
                      }}
                      onFocus={() => {
                        this.onInputFocus('pass')
                      }}
                  />
                </div>
              </Col>
            </Row>
            <Divider dashed/>
            <Row>
              <Col span={12} className="ta-c">
                <Button
                    size="large"
                    type="default"
                    icon="delete"
                    style={{ width: '180px' }}
                    onClick={this.onResetButtonClick.bind(this)}
                > 清空</Button>
              </Col>
              <Col span={12} className="ta-c">
                <Button
                    size="large"
                    type="primary"
                    icon="cloud-upload"
                    style={{ width: '180px' }}
                    onClick={this.onLoginButtonClick.bind(this)}
                > 登录</Button>
              </Col>
            </Row>
          </Card>
        </div>
    )
  }
}

export default LoginPage