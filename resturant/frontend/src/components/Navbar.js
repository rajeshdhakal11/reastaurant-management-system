import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaUtensils } from 'react-icons/fa';
import './Navbar.css';

function NavigationBar({ cartItemCount }) {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaUtensils className="me-2" />
          <h1 className="ms-2 d-inline brand-name">Dhakal Restaurant</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              <FaHome /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <FaShoppingCart /> Cart ({cartItemCount})
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;