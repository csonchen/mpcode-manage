import { Link } from 'react-router-dom'
import { Navbar, Nav, Form } from 'react-bootstrap'

export default function CSSidebar() {
  return(
    <>
      <Form className="py-3">
        <Form.Control type="search" placeholder="search..."></Form.Control>
      </Form>

      <Navbar expand="lg" className="side-nav">
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