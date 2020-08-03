import React, { useEffect, useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './Home.css';

import Login from '../Login/Login'
import Auth from '../../utils/authenticate'
import config from '../../utils/config'

import articleImage from './articleImage.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Button, Col, Card, Spinner } from 'react-bootstrap';
const axios = require('axios');

function Home(props) {
    const [articles, setArticles] = useState([]);

    let history = useHistory();

    const loginRef = useRef(null);

    const openLoginModal = () => {
        loginRef.current.showModal();
    };

    const logout = () => {
        Auth.signout()
        localStorage.removeItem('token')
        history.push('/home')
    }

    useEffect(() => {
        async function getArticles() {
            try {
                const response = await axios.get(`${config().baseUrl}/articles`, config().headers)
                setArticles(response.data)
            } catch (error) {
                console.error();
            }
        }
        getArticles();
    }, [])

    const displayArticles = (articles) => {
        if (articles.length) {
            return (
                <Container fluid style={{padding: "2% 5%", backgroundColor: '#f5f5f5'}} >
                    <Row className='justify-content-md-center'>
                        {    
                        articles.map((article, index) => (
                                <Card key={index} className={'article-card' }>
                                    <Card.Img variant="top" src={articleImage} style={{ backgroundColor:'black'}}/>
                                    <Card.Body>
                                        <Card.Title>
                                            <Link style={{color: 'black'}} to={"/home/" + article._id}>
                                                <p dangerouslySetInnerHTML={{ __html: article.title }} />
                                            </Link>
                                        </Card.Title>
                                    {/* <Card.Text>
                                        {article.body}
                                    </Card.Text> */}
                                    </Card.Body>
                                    <Card.Footer>
                                    <small className="text-muted">Author: {article.author}</small>
                                    </Card.Footer>
                                </Card>
                            )
                        )
                        }
                    </Row>
                </Container>
            )
        } else {
            return (
                <div>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    <p>Loading Articles</p>
                </div>
            )
        }
    }
    return (

        <div>
            <Container fluid style={{padding: "2% 5%"}}> 
                {/* Show Login button if user is not logged in {!Auth.getAuth()=undefined}  */}
                <Row>
                    <Col xs={4} md={4}><Link to={"/home"}><h1 style={{color:'black', textDecorationLine:'none !important'}} className='title'>Articuls</h1></Link></Col>
                    { !Auth.getAuth() ?
                    <Col xs={{ span: 8, offset: 0 }} md={{ span: 4, offset: 4 }}>
                    <Button className="float-sm-right" style={{'margin':"5px", float:'right'}} onClick={openLoginModal}>Login</Button>
                    <Login ref={loginRef}/>
                    </Col> 
                    : 
                    <Col xs={{ span: 8, offset: 0 }} md={{ span: 4, offset: 4 }}>
                        <Button className="float-sm-right" style={{'margin':"5px", float:'right'}} onClick={logout}>Logout</Button>
                        <Link to={"/create"}>
                            <Button variant='secondary' className="float-sm-right" style={{'margin':"5px", float:'right'}}>
                                Write
                            </Button>
                        </Link>
                    </Col>
                    }
                </Row>
            </Container>
            <div>
                {displayArticles(articles)}
            </div>
        </div>
    )
};
  
export default Home;