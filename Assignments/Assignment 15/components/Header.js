import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store/authSlice'

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(authActions.logout())
  }

  return (
    <Navbar
      expand="sm"
      style={{ backgroundColor: 'purple' }}
      variant="dark"
      className="mb-4"
    >
      <Container>
        <Navbar.Brand style={{ color: 'white', fontWeight: 'bold' }}>
          Redux Auth
        </Navbar.Brand>
        {isAuth && (
          <Nav className="ms-auto">
            <Button
              onClick={logoutHandler}
              variant="light"
              style={{ color: 'purple', fontWeight: 'bold' }}
            >
              Logout
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  )
}

export default Header