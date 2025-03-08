import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import VerifyEmail from "./VerifyEmail";

const HomePage = () => {
  return (
    <>
      <Header isProfilePage={false} />
      <Container className="mt-4">
        <Row>
          <Col>
            <VerifyEmail />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;