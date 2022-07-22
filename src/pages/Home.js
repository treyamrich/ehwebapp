import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Landing } from './index';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = ({isAuthenticated, name, signOut}) => {
  return (
    <div>
      <Navbar className="navbar" fixed="top" expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/"> Engraving Hawaii </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
      
            <Nav.Item>
              <Nav.Link href="/management">Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/order">Order</Nav.Link>
            </Nav.Item>
            {isAuthenticated ? 
              <Nav.Item>
                <Nav.Link id="welcome-user"> Welcome {name}. </Nav.Link>
              </Nav.Item> 
              : null
            }

            <Nav.Item> {!isAuthenticated ? 
              <Nav.Link href="/login"> Login </Nav.Link> : 
              <Nav.Link onClick={()=>signOut()}> Sign out </Nav.Link>} 
            </Nav.Item>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
        <Routes>
            <Route element={<Landing/>} path="/"/>
        </Routes>
    </div>
  )
}

export default Home