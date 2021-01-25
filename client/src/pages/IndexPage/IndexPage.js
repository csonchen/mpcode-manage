import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Container, Col, Row } from 'react-bootstrap'
import { CSBody, CSHeader, CSSidebar } from '../../components'

export default class IndexPage extends React.Component {
  render() {
    return (
      <Router>
        <CSHeader />
        <Container fluid>
          <Row>
            <Col className="bg-gray bd-sidebar" md={3} xl={2}>
              <CSSidebar />
            </Col>
            <Col>
              <CSBody />
            </Col>
          </Row>
        </Container>
      </Router>
    )
  }
}