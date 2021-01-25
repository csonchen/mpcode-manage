import React from 'react'
import { Form, Col, DropdownButton, Dropdown } from 'react-bootstrap'
import AutoTable from '../../components/AutoTable/AutoTable'
import { LoadingButton } from '../../components'
import { postData } from '../../services/request'

export default class AnalyseImagesPage extends React.Component {
  originImgList = [] // 初始请求接口的列表数据
  state = {
    loading: false,
    imgList: [],
    currentList: [],
    currentPage: 1,
    filterTitle: '全部',
    operateLoading: false,
  }
  analyseImgs = () => {
    this.setState({
      loading: true,
    })
    postData('/api/analyse/images').then(res => {
      const { list: imgList } = res.data
      this.originImgList = imgList
      const currentList = imgList.slice(0, 10)
      this.setState({
        imgList,
        currentList,
        loading: false,
        currentPage: 1,
        filterTitle: '全部'
      })
    })
  }
  exportCSVFile = () => {
    this.setState({
      operateLoading: true,
    })
    postData('/api/analyse/imagesExport').then(res => {
      this.setState({
        operateLoading: false,
      })
      const { file } = res.data
      window.open(file)
    })
  }
  filterOptions = (e) => {
    const { status, title } = e.target.dataset

    if (typeof status === 'undefined' && typeof title === 'undefined') return

    const filterList = status === "" ? this.originImgList : this.originImgList.filter(item => item.status === +status)
    const currentList = filterList.slice(0, 10)
    this.setState({
      filterTitle: title,
      imgList: filterList,
      currentList,
      currentPage: 1,
    })
  }
  setCurrentList = (currentList, currentPage) => {
    this.setState({
      currentPage,
      currentList,
    })
  }
  render() {
    const { loading, operateLoading, imgList, currentPage } = this.state
    return (
      <div>
        <Form.Group>
          <Form.Row className="form-item align-items-center">
            <Form.Label column lg={1}>主包</Form.Label>
            <Col>
              <Form.Control type="text" placeholder="" />
            </Col>
          </Form.Row>

          <div className="flex-end">
            <LoadingButton className="mr10" loading={loading} onClick={this.analyseImgs}>开始分析</LoadingButton>
            <LoadingButton loading={operateLoading} onClick={this.exportCSVFile}>导出</LoadingButton>
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Row className="align-items-center">
            <Col>
              <DropdownButton id="dropdown-basic-button" title={this.state.filterTitle} onClick={this.filterOptions}>
                <Dropdown.Item data-status="" data-title="全部">全部</Dropdown.Item>
                <Dropdown.Item data-status="1" data-title="用到">用到</Dropdown.Item>
                <Dropdown.Item data-status="0" data-title="没有用到">没有用到</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Form.Row>
        </Form.Group>
        <AutoTable
          heads={['序号', '图片', '路径']}
          loading={loading}
          tableList={imgList}
          currentPage={currentPage}
          setCurrentList={this.setCurrentList}
        >
          {this.state.currentList.map((item, index) => (
            <tr className={item.status === 0 ? 'table-warning' : ''} key={index}>
              <td>{item.id}</td>
              <td>{item.image}</td>
              <td>{item.existPath}</td>
            </tr>
          ))}
        </AutoTable>
      </div>
    )
  }
}