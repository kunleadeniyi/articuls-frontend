import React from 'react';
// import PropTypes from 'prop-types';
import './Footer.css'
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => (
  <Container fluid className="footer">
    <Row>
      <Col xs={12} md={12}>
        <footer className='footer-text'>
          <p>For any suggestion on improving this site,
            <a href="mailto:adeniyikunle22@gmail.com"> mail me</a></p>
        </footer>
      </Col>
    </Row>
  </Container>     
);

export default Footer;
