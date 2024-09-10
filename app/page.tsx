"use client";

import React from "react";
import "./globals.css";
import App from "./components/App";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import logo from "../public/logo.png";

export default function Home() {
  const logoStyle = {};

  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Image src={logo} alt="Walkway Logo" height={250} width={250} />
          </Col>
        </Row>
        <Row>
          <Col>
            <App />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
