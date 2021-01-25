import React from 'react'
import { Col, Form } from 'react-bootstrap'
import { LoadingButton } from '../../components'
import { postData } from '../../services/request';
import './BuildPreviewPage.css';

export default class BuildPreviewPage extends React.Component {
  pagePath = 'pages/index/index'
  searchQuery = ''

  state = {
    isLoading: false,
    previewCodeImg: '',
    selectPages: [],
    scenes: [],
    envs: [],
  }
  componentDidMount() {
    this.fetchAllPages()
  }
  fetchAllPages = () => {
    postData('/api/build/getAppInfo').then(res => {
      const { pages, scenes, envs } = res.data
      this.setState({
        selectPages: pages,
        scenes,
        envs,
      })
    })
  }
  buildPreviewCode = () => {
    this.setState({ isLoading: true })

    // 请求生成预览码接口
    postData('/api/build/preview', {
      method: 'POST',
      params: {
        pagePath: this.pagePath,
        searchQuery: this.searchQuery,
      }
    }).then(res => {
      const { previewImg } = res.data
      this.setState({
        isLoading: false,
        previewCodeImg: previewImg,
      })
    })
  }
  onPagePathChange = (e) => {
    const value = e.target.value
    this.pagePath = value
  }
  onQueryChange = (e) => {
    const value = e.target.value
    this.searchQuery = value
  }
  render() {
    const { isLoading, previewCodeImg } = this.state

    return (
      <div>
        <Form.Group>
          <Form.Row className="form-item justify-content-md-center">
            <Form.Label column lg={1}>启动环境</Form.Label>
            <Col className="flex-middle">
              {this.state.envs.map((env, index) => (
              <Form.Check 
                key={index} 
                inline 
                type="radio" 
                label={env.label} 
                name="buildEnv" 
                id={`env-${env.id}`} 
              />
              ))}
            </Col>
          </Form.Row>
          <Form.Row className="form-item">
            <Form.Label column lg={1}>启动页面</Form.Label>
            <Col>
              <Form.Control list="pages" type="text" placeholder="如：pages/index/index" onChange={this.onPagePathChange} />
              <datalist id="pages">
                {this.state.selectPages.map((item, index) => (
                <option key={index}>{item}</option>
                ))}
              </datalist>
            </Col>
          </Form.Row>
          <Form.Row className="form-item">
            <Form.Label column lg={1}>进入场景</Form.Label>
            <Col>
              <Form.Control list="scenes" type="text" placeholder="默认" onChange={this.onPagePathChange} />
              <datalist id="scenes">
                {this.state.scenes.map(item => (
                <option key={item.id}>{item.id}: {item.desc}</option>
                ))}
              </datalist>
            </Col>
          </Form.Row>
          <Form.Row className="form-item">
            <Form.Label column lg={1}>启动参数</Form.Label>
            <Col>
              <Form.Control type="text" placeholder="如：name=sam&age=18" onChange={this.onQueryChange}/>
            </Col>
          </Form.Row>                      
        </Form.Group>
  
        <div className="flexMiddle">
          <LoadingButton loading={isLoading} onClick={this.buildPreviewCode}>点击构建并生成预览码</LoadingButton>
          {previewCodeImg &&
          <img className="mpCodeImg" src={previewCodeImg} alt="" />
          }
        </div>
      </div>
    )
  }
}
