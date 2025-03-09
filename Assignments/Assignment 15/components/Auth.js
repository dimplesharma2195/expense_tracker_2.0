import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from '../store/authSlice'
import { Form, Button, Card, Container } from 'react-bootstrap'

const Auth = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const dispatch = useDispatch()

  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(authActions.login())
  }

  return (
    <Container
      fluid
      style={{
        backgroundColor: 'black',
        minHeight: 'calc(100vh - 70px)', 
        paddingTop: '50px'
      }}
    >
      <div className="d-flex justify-content-center align-items-start">
        <Card style={{ width: '24rem', backgroundColor: '#cfcfcf' }}>
          <Card.Body>
            <Card.Title className="text-center mb-3">Login</Card.Title>
            <Form onSubmit={loginHandler}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} />
              </Form.Group>
              <div className="text-center">
                <Button type="submit" variant="primary">
                  Login
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}

export default Auth