import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import Header from "./Header";
import VerifyEmail from "./VerifyEmail";
import Expenses from "./Expenses";

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();
        setCurrentUser(user);
        setIsEmailVerified(user.emailVerified);
      } else {
        setCurrentUser(null);
        setIsEmailVerified(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header isProfilePage={false} />

      <Container className="mt-4">
        <Row className="mb-4">
          <Col>
            <h5>Email Verification</h5>
            {isEmailVerified ? (
              <Alert variant="success" style={{ width: "fit-content" }}>
                Your email is verified.
              </Alert>
            ) : (
              <VerifyEmail />
            )}
          </Col>
        </Row>

        <Expenses />
      </Container>
    </>
  );
};

export default HomePage;