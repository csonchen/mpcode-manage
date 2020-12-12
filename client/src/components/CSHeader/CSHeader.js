import { Navbar, Nav } from 'react-bootstrap'

export default function CSHeader() {
  return(
    <Navbar variant="dark" bg="dark" expand="lg">
      <Navbar.Brand href="/">微信小程序自动化构建服务</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home"></Nav.Link>
        <Nav.Link href="#home2"></Nav.Link>
        <Nav.Link href="#home3"></Nav.Link>
      </Nav>
    </Navbar>
  ) 
}