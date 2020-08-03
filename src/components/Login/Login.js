import React, { useState, useImperativeHandle, forwardRef, useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Auth from '../../utils/authenticate'
import config from '../../utils/config'

import Register from '../Register/Register'

import './Login.css';
import {Button, Modal, Form, Container } from 'react-bootstrap';

const axios = require('axios');

const Login = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const registerRef = useRef(null);

  const openRegisterModal = () => {
    registerRef.current.showModal();
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('authenticated'))) {
        history.push('/home') 
    }
  }, [history])

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  useImperativeHandle(ref, () => {
    return {
      showModal: showModal
    };
  });

  // Login form sumbit handler
  const login = (e) => {
    e.preventDefault()
    if (!email) {
        return
    }
    if (!password) {
        return
    }
    const request = {
        email: email,
        password: password
    }

    axios.post(`${config().baseUrl}/user/login`, request, config().headers)
    .then(function (response) {
      Auth.authenticate()
      localStorage.setItem("token", response.data);
      hideModal()
      history.push('/home')
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Container fluid>
      <Modal dialogClassName="login-modal" animation={true} show={show} onHide={hideModal} {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={login}>
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                  </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </Form.Group>
              
              <Button variant="primary" type="submit">
                  Submit
              </Button>
              
          </Form>
        </Modal.Body>
        <Modal.Footer>
            <p>New here?</p>
          <Button variant="primary" onClick={openRegisterModal}>
              Register
          </Button>
          <Register ref={registerRef}/>
        </Modal.Footer>
      </Modal>
    </Container>
  );
});


export default Login;

