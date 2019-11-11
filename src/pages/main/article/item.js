import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Layout, Row, Col, Button, Icon, Spin, Table, Tooltip, message } from 'antd'

import axios from 'axios'
import moment from 'moment'

import API from '../../../components/api'
import responsePreprocessing from '../../../utils/responsePreprocessing'

const { Content } = Layout

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

  componentWillMount () {}

  componentDidMount () {
    this.getWechatList(this.state.pagination.current)
  }

  onPageChange (target) {
    this.getWechatList(target)
  }

  onSyncArticle (target) {
    this.setState({
      wechatListLoading: true
    })

    const params = {
      media_id: target.media_id
    }

    if (target.article_id !== 0) {
      params.article_id = target.article_id
    }

    axios({
      method: 'post',
      url: API.ARTICLE_IMPORT_WECHAT_ARTICLE,
      data: params,
      withCredentials: true
    })
      .then(res => {
        return responsePreprocessing(res)
      })
      .then(data => {
        message.success(`文章《${data.info.title}》导入成功！`)
        this.getWechatList(this.state.pagination.current)
      })
      .catch((err) => {
        if (err) {
          console.log(err)
        }
        this.setState({
          wechatListLoading: false
        })
      })
  }

  getWechatList (page) {
    this.setState({
      wechatListLoading: true
    })

    axios({
      method: 'get',
      url: API.ARTICLE_WECHAT_LIST,
      params: {
        page: page,
        pageSize: 10
      },
      withCredentials: true
    })
      .then(res => {
        return responsePreprocessing(res)
      })
      .then(data => {
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
      .catch(err => {
        if (err) {
          console.log(err)
        }
        this.setState({
          wechatListLoading: false
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
        width: 400
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
        width: 300,
        render: (text, record) => {
          return (
            <Fragment>
              <div>更新时间：{moment(new Date(record.update_time)).format('YYYY-MM-DD HH:mm:ss')}</div>
              <div>创建时间：{moment(new Date(record.create_time)).format('YYYY-MM-DD HH:mm:ss')}</div>
            </Fragment>
          )
        }
      },
      {
        title: '操作',
        key: 'action',
        width: 100,
        render: (text, record) => {
          return record.article_id === 0 ? (
            <Button type="primary" icon="cloud-download" onClick={this.onSyncArticle.bind(this, record)}>
              导入
            </Button>
          ) : (
            <Button icon="reload" onClick={this.onSyncArticle.bind(this, record)}>
              更新
            </Button>
          )
        }
      }
    ]

    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link to="/">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/article/">文章管理</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>导入文章</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Row>
            <Col span={24}>
              <h2>导入微信文章</h2>
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
