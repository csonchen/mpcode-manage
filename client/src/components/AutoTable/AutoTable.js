import React, { useEffect, useState } from 'react'
import { Pagination, Spinner, Table } from 'react-bootstrap'
import { range } from '../../tools/util'

const AutoTable = (props) => {
  const PAGE_SIZE = 10
  const [pages, setPages] = useState([])
  const { heads, loading, tableList, onPageClick, currentPage } = props || {}

  useEffect(() => {
    const size = Math.ceil(tableList.length / PAGE_SIZE)
    setPages(() => range(1, size))
  }, [tableList])

  const queryByPage = (e) => {
    const pageNum = e.target.dataset.page
    const begin = (+pageNum - 1) * PAGE_SIZE
    const end = begin + PAGE_SIZE
    const currentList = tableList.slice(begin, end)
    props.setCurrentList && props.setCurrentList(currentList, +pageNum)
  }
  return (
    <>
      <Table bordered hover>
        {(heads && heads.length > 0) &&
        <thead>
          <tr>
            {heads.map((item, index) => (
            <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        }
        <tbody>
          {loading ?
          <tr>
            <td colSpan={heads.length} className="text-center">
              <Spinner animation="border" variant="primary" role="status">
                <span className="sr-only">加载中...</span>
              </Spinner>
            </td>
          </tr>
          :
          props.children
          }
        </tbody>
      </Table>
      <div className="flex-end">
        <Pagination onClick={onPageClick || queryByPage}>
        {pages.map((page, index) => (
          <Pagination.Item
            key={index}
            data-page={page}
            active={currentPage === page}
          >{page}</Pagination.Item>
        ))}
        </Pagination>
      </div>
    </>
  )
} 

export default AutoTable