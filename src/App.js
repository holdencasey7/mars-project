import logo from "./logo.svg";
import "./App.css";
import Weather from "./Weather/Weather";
import Image from "./Gallery/Image";
import Homepage from "./homepage/Homepage";
import Gallery from "./Gallery/Gallery";
import { useState } from "react";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import GalleryHome from "./Gallery/GalleryHome";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function App() {
  return (
    <>
      <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Mars Project</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/weather">Weather</Nav.Link>
              <Nav.Link href="/gallery">Gallery</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/gallery" element={<GalleryHome />} />
          <Route path="/gallery/:earthDate" element={<Gallery />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
