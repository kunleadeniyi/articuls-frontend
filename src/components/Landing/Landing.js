import React, { useRef }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Landing.css';

import { Container, Row, Button, Carousel, Col, Image } from 'react-bootstrap';

import carouselImage from './images/cool-background.png';
import expressImage from './images/kkk.png';

import Login from '../Login/Login'
import Register from '../Register/Register'
import { Link } from 'react-router-dom';


function Landing() {

  const loginRef = useRef(null);

  const openLoginModal = () => {
    loginRef.current.showModal();
  };

  const registerRef = useRef(null);

  const openRegisterModal = () => {
    registerRef.current.showModal();
  };


  return (
    <div>
    <Container fluid style={{padding: "2% 5%"}}> 
      <Row>
        <Col xs={4} md={4}><Link to={"/home"}><h1 style={{color:'black'}} className='title'>Articuls</h1></Link></Col>
        <Col xs={{ span: 8, offset: 0 }} md={{ span: 4, offset: 4 }}>
          <Button className="float-sm-right" style={{'margin':"5px", float:'right'}} onClick={openLoginModal}>Login</Button>
          <Login ref={loginRef}/>
          <Button className="float-sm-right" style={{'margin':"5px", float:'right'}} onClick={openRegisterModal}>Register</Button>
          <Register ref={registerRef}/>
        </Col> 
      </Row>
    </Container>
    
    <Container fluid style={{padding: "2% 5%"}}> 
      <Row>
        <Col xs={12} md={12} className="text-center">
        <h1 className='write'> Write about things that matter to you! </h1>
        </Col>
      </Row> 
      
      <Row className="justify-content-center"><Button size="lg" onClick={openLoginModal}>Get Started</Button>
      <Login ref={loginRef}/>
      </Row>
    </Container>
      
    <Container fluid style={{padding: "2% 5%"}}>      
      <Row>
        <Col xs={12} md={6}>
          <Image src={expressImage} alt='ExpressImage' className='express-image'/>
        </Col>
        <Col xs={{ span: 10, offset:1}} md={{ span: 4, offset: 1}}>
          <div className='express-content'>
            <h2>Express Yourself</h2>
            <p style={{textAlign:'left'}} >This is a place to freely articulate your thoughts, feelings and experiences. Think of it as a public journal to share what you want. 
            Those compelling ideas and mindblowing series are worth sharing.</p>
          </div>
        </Col>
      </Row>
    </Container>

    <Container fluid style={{padding: "2% 5%"}}>
      <Row>
        <Col xs={12} md={4}>
          <div className="middle"><h1>Enjoy documenting your thoughts</h1></div>
        </Col>
        <Col xs={12} md={8}>
          <Carousel interval={6000} pauseonhover={"true"}>
            <Carousel.Item >
              <img id='carousel-image' className="d-block w-100" src={carouselImage} alt='Slide 1' />
              <Carousel.Caption>
                <h1 id='carousel-text'>Write</h1>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img id='carousel-image' className="d-block w-100" src={carouselImage} alt='Slide 1' />
              <Carousel.Caption>
                <h1 id='carousel-text'>Save</h1>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img id='carousel-image' className="d-block w-100" src={carouselImage} alt='Slide 1' />
              <Carousel.Caption>
                <h1 id='carousel-text'>Share</h1>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

        </Col>
      </Row>

    </Container>
    </div>
  );
}

export default Landing;
