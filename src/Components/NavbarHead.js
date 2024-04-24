import React from "react";
import {
  Navbar,
  Nav,
  Form,
  Col,
  Button,
  Row,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavbarHead.css";

const NavbarHead = () => {
  return (
    <Navbar expand="lg" className="bg-body-light">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mar">
            <Nav.Link as={Link} to="/" className="navhead">
              Create
            </Nav.Link>
            <Nav.Link as={Link} to="/view" className="navhead">
              View
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarHead;
