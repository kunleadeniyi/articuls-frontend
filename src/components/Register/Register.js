import React, { useState, useImperativeHandle, forwardRef, useEffect} from 'react';
import { useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

// import Auth from '../../utils/authenticate'
import config from '../../utils/config'

import './Register.css';
import {Button, Modal, Form, Container } from 'react-bootstrap';

const axios = require('axios');

const Register = forwardRef((props, ref) => {
    const [show, setShow] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();
  
    // here
    useEffect(() => {
      if (JSON.parse(localStorage.getItem('authenticated'))) {
          // history.push('/home') 
          // SET THE ARTICLES PAGE HERE
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
    const register = (e) => {
      e.preventDefault()
      if (!email) {
          return
      }
      if (!password) {
          return
      }
      const request = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
      }
      
      axios.post(`${config().baseUrl}/user/register`, request, config().headers)
      .then(function (response) { /* Do something here */
        // Auth.authenticate()
        // localStorage.setItem("token", response.data);
        // console.log(response)
        hideModal()
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    return (
      <Container fluid>
        <Modal dialogClassName="register-modal" animation={true} show={show} onHide={hideModal} {...props}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={register}>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                </Form.Group>

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
              <p>Already have an account?</p>
            <Button variant="primary">
                Sign in
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  });
  
  export default Register;