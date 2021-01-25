import { Link } from 'react-router-dom'
import { Navbar, Nav, Form } from 'react-bootstrap'

export default function CSSidebar() {
  return(
    <>
      <Form className="py-3 bd-search d-flex align-items-center">
        <Form.Control type="search" placeholder="search..."></Form.Control>
        <button class="btn bd-search-docs-toggle d-md-none p-0 ml-3 collapsed" type="button" data-toggle="collapse" data-target="#bd-docs-nav" aria-controls="bd-docs-nav" aria-expanded="false" aria-label="Toggle docs navigation">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" role="img" focusable="false"><title>Menu</title><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M4 7h22M4 15h22M4 23h22"></path></svg>
        </button>
      </Form>

      <Navbar expand="lg" className="side-nav collapse d-md-block row">
        <Nav className="flex-column">
          <Nav.Item>
            <Link className="nav-link" to="/build/preview">构建生成预览码</Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/analyse/image">分析项目图片</Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/analyse/component">分析项目组件</Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  ) 
}