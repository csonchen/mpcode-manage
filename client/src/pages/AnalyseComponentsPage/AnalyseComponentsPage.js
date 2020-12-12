import React from 'react'
import { Col, Form } from 'react-bootstrap'
import AutoTable from '../../components/AutoTable/AutoTable'
import LoadingButton from '../../components/LoadingButton/LoadingButton'
import { postData } from '../../services/request'
export default class AnalyseComponentsPage extends React.Component {
  originTableList = []
  state = {
    loading: false,
    operateLoading: false,
    tableList: [],
    currentList: [],
    currentPage: 1,
  }
  analyseComponents = () => {
    this.setState({
      loading: true,
    })
    postData('/api/analyse/components').then(res => {
      const { list: tableList } = res.data
      this.originTableList = tableList
      const currentList = tableList.slice(0, 10)
      this.setState({
        tableList,
        currentList,
        loading: false,
        currentPage: 1,
      })
    })
  }
  setCurrentList = (currentList, currentPage) => {
    this.setState({
      currentPage,
      currentList,
    })
  }
  render() {
    const { loading, operateLoading, tableList, currentPage } = this.state
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
            <LoadingButton className="mr10" loading={loading} onClick={this.analyseComponents}>开始分析</LoadingButton>
            <LoadingButton loading={operateLoading}>导出</LoadingButton>
          </div>
        </Form.Group>
        <AutoTable 
          heads={['序号', '页面', '当前目录', '引入组件', '组件路径', '使用情况']}
          loading={loading}
          tableList={tableList}
          currentPage={currentPage}
          setCurrentList={this.setCurrentList}
        >
          {this.state.currentList.map((item, index) => (
            <tr className={item.used === 'false' ? 'table-warning' : ''} key={index}>
              <td>{item.id}</td>
              <td>{item.page}</td>
              <td>{item.directory}</td>
              <td>{item.component}</td>
              <td>{item.componentPath}</td>
              <td>{item.used}</td>
            </tr>
          ))
          }
        </AutoTable>
      </div>
    )
  }
}