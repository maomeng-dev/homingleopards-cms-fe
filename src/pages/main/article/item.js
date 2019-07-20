import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Layout, Row, Col, Button, Form, Input, Icon, Select, Modal, Spin, Table, Tooltip } from 'antd'

import axios from 'axios'
import moment from 'moment'

import API from '../../../components/api'
import responsePreprocessing from '../../../utils/responsePreprocessing'

const { Option } = Select
const { Content } = Layout
const { TextArea } = Input

class ArticleItemPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      wechatListLoading: true,

      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    }
  }

  componentWillMount () {
  }

  componentDidMount () {
    this.getWechatList(this.state.pagination.current)
  }

  onPageChange (target) {
    this.getWechatList(target)
  }

  getWechatList (page) {
    this.setState({
      wechatListLoading: true,

      wechatList: []
    })

    axios({
      method: 'get',
      url: API.ARTICLE_WECHAT_LIST,
      params: {
        page: page,
        pageSize: 10
      },
      withCredentials: true
    }).then((res) => {
      return responsePreprocessing(res)
    }).then((data) => {
      console.log(data)
      this.setState({
        wechatList: data.list,
        wechatListLoading: false,

        pagination: {
          current: data.page.current,
          pageSize: data.page.size,
          total: data.page.total
        }
      })
    })
  }

  render () {
    const wechatListColumn = [
      {
        title: 'Media ID',
        dataIndex: 'media_id',
        key: 'media_id',
        align: 'center',
        width: 100,
        render: (text, record) => {
          return (
              <Tooltip title={text}>
                <Icon type="barcode"/>
              </Tooltip>
          )
        }
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width: 400,
        render: (text, record) => {
          return <a>{text}</a>
        }
      },
      {
        title: '摘要',
        dataIndex: 'digest',
        key: 'digest'
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        width: 200,
        render: (text, record) => {
          console.log(record)
          return '123'
        }
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        render: (text, record) => {
          return (
              <Button type="primary" icon="check" disabled={record.article_id !== 0}>
                选择导入
              </Button>
          )
        }
      }
    ]

    return (
        <div>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/user/">文章管理</Link></Breadcrumb.Item>
            <Breadcrumb.Item>导入文章</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{
            background: '#fff', padding: 24, margin: 0, minHeight: 280
          }}
          >
            <Row>
              <Col span={24}>
                <h3>微信文章列表</h3>
              </Col>
            </Row>
            <Spin tip="加载中…" spinning={this.state.wechatListLoading}>
              <Table
                  className="main-table"
                  columns={wechatListColumn}
                  rowKey="media_id"
                  dataSource={this.state.wechatList}
                  pagination={{
                    ...this.state.pagination,
                    onChange: this.onPageChange.bind(this)
                  }}
              />
            </Spin>
          </Content>
        </div>
    )
  }
}

export default ArticleItemPage
