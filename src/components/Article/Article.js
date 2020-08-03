import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams, Link} from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";
import './Article.css';

import Login from '../Login/Login';
import Auth from '../../utils/authenticate';
import config from '../../utils/config';
import AddComment from '../Comments/AddComment';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Button, Col } from 'react-bootstrap';

const axios = require('axios');

function Article(props) {
    let {articleId} = useParams();
    const history = useHistory();

    const [currentArticle, setCurrentArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(true)

    const [ownArticle, setOwnArticle] = useState(null)

    const loginRef = useRef(null);

    const openLoginModal = () => {
        loginRef.current.showModal();
    };

    const logout = () => {
        Auth.signout()
        localStorage.removeItem('token')
        history.push('/home')
    }

    const deleteArticle = () => {
        axios
        .delete(`${config().baseUrl}/articles/${articleId}`, config().headers)
        .then(res => {
            history.push('/home')
            return alert("Article Deleted")
        })
        .catch(err => {
            console.log(err)
            return alert("Cannot delete what isn't yours \nDelete your own article")
        }) 
    }


    function toggleComment() {
        setShowComments(!showComments)
    }

    function displayComments() {
        if (comments.length) {
            return (showComments &&
                <Container fluid >
                    {
                        comments.map((comment, index) => (
                            <Row key={index} style={{textAlign: 'left', margin: '2% 2%'}}>
                                <Col>{comment.body}</Col>
                                <Col><AiFillDelete className="delete-icon" onClick={() => deleteComment(comment._id)}/></Col>
                            </Row>
                        ))
                    }
                    <AddComment />
                </Container>
            )
        } else {
            return (
                <AddComment />
            )
        }
    }

    function deleteComment(index) {
        axios.delete(`${config().baseUrl}/articles/${articleId}/comments/${index}`, config().headers)
        .then(response => {
            history.go()
        })
        .catch(error => {
            alert(error.message)
        })
    }

    useEffect(() => {
        async function getArticle() {
            try {
                const response = await axios.get(`${config().baseUrl}/articles/${articleId}`, config().headers);
                setCurrentArticle(response.data)
                const commentResponse = await axios.get(`${config().baseUrl}/articles/${articleId}/comments`, config().headers)
                setComments(commentResponse.data)
                const loggedIn = await axios.get(`${config().baseUrl}/articles/${articleId}/loggedIn`, config().headers);
                setOwnArticle(loggedIn.data)
            } catch (error) {
                console.error();
            }
        }
        getArticle()
    }, [articleId])

    return (
        <div>
            <Container fluid style={{padding: "2% 5%"}}> 
                {/* Show Login button if user is not logged in {!Auth.getAuth()=undefined}  */}
                <Row>
                    <Col xs={4} md={4}><Link to={"/home"}><h1 style={{color:'black'}} className='title'>Articuls</h1></Link></Col>
                    { !Auth.getAuth() ?
                    <Col xs={{ span: 8, offset: 0 }} md={{ span: 4, offset: 4 }}>
                    <Button className="float-sm-right" style={{'margin':"5px", float:'right'}} onClick={openLoginModal}>Login</Button>
                    <Login ref={loginRef}/>
                    </Col> 
                    : 
                    <Col xs={{ span: 8, offset: 0 }} md={{ span: 4, offset: 4 }}>
                        <Button className="float-sm-right" style={{'margin':"5px", float:'right'}} onClick={logout}>Logout</Button>
                    </Col>
                    }
                </Row>
            </Container>
            <Container>
                <h1 dangerouslySetInnerHTML={{ __html: currentArticle.title }} />
                <h3>{currentArticle.author}</h3>
                <div style={{textAlign:'justify'}} dangerouslySetInnerHTML={{ __html: currentArticle.body }} />
                <Row>
                    {ownArticle && 
                    <Col xs={4} md={4}>
                        <Button variant='warning' style={{'margin':"5px", float:'left'}} onClick={deleteArticle}>
                            Delete
                        </Button>
                        <Link to={`/edit/${currentArticle._id}`}>
                            <Button style={{'margin':"5px", float:'left'}}>Edit</Button>
                        </Link>
                    </Col>
                    }
                    {!showComments ?
                    <Col>
                        <Button className="float-right" style={{'margin':"5px", float:'right'}} onClick={toggleComment}>Show Comments</Button>
                    </Col>
                    :
                    <Col>
                        <Button className="float-sm-right" style={{'margin':"5px", float:'right'}} onClick={toggleComment}>Hide Comments</Button>
                    </Col>
                    }
                </Row>
                <Row>
                    <Container fluid>{displayComments()}</Container>
                </Row>
            </Container>
        </div>
    )
}

export default Article;