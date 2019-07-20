import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Button, Col, Icon, Layout, Modal, Row, Spin, Table } from 'antd'
import axios from 'axios'
import moment from 'moment'

import API from '../../../components/api'
import responsePreprocessing from '../../../utils/responsePreprocessing'

const { Content } = Layout

class ArticleListPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articleList: [],
      loading: true,

      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    }
  }

  componentDidMount () {
    this.getArticleList(this.state.pagination.current)
  }

  onPageChange (target) {
    this.getArticleList(target)
  }

  handleDelete (uid) {
  }

  getArticleList (page) {
    this.setState({
      pageLoading: true
    })

    axios({
      method: 'get',
      url: API.ARTICLE_LIST,
      params: {
        page: page,
        pageSize: 10
      },
      withCredentials: true
    }).then((res) => {
      return responsePreprocessing(res)
    }).then((data) => {
      this.setState({
        articleList: data.list,
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
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 100
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
        title: '作者',
        dataIndex: 'author',
        key: 'author',
        width: 100
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        width: 200,
        render: (timeStamp, record) => {
          return (<span>{moment(new Date(timeStamp)).format('YYYY-MM-DD HH:mm:ss')}</span>)
        }
      },
      {
        title: '操作',
        key: 'action',
        width: 240,
        render: (text, record) => (
            <span className="main-table-actions">
              <Link to={`/user/edit/${record.id}`}><Button icon="reload">更新</Button></Link>
              <Button type="danger" icon="delete" onClick={this.handleDelete.bind(this, record.id)}>删除</Button>
            </span>
        )
      }
    ]

    return (
        <div>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
            <Breadcrumb.Item>文章管理</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{
            background: '#fff', padding: 24, margin: 0, minHeight: 280
          }}
          >
            <Row style={{ marginBottom: 24 }}>
              <Col span={12}>
                <h2>文章列表</h2>
              </Col>
              <Col span={12}>
                <div className="f-r">
                  <Link to="/article/new/"><Button type="primary" icon="plus">添加文章</Button></Link>
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
                      dataSource={this.state.articleList}
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

export default ArticleListPage
