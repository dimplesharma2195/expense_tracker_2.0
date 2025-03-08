import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import VerifyEmail from "./VerifyEmail";
import Expenses from "./Expenses";

const HomePage = () => {
  return (
    <>
      <Header isProfilePage={false} />

      <Container className="mt-4">
        <Row className="mb-4">
          <Col>
            <VerifyEmail />
          </Col>
        </Row>

        <Row>
          <Col>
            <Expenses />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;