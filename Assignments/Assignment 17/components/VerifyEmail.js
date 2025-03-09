import React, { useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendVerification = async () => {
    setMessage("");
    setError("");
    setIsSending(true);

    try {
      await sendEmailVerification(user);
      setMessage("Verification email sent! Please check your inbox.");
    } catch (err) {
      setError(err.message);
    }

    setIsSending(false);
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col xs="auto">
          <h5>Email Verification</h5>
          {user && user.emailVerified ? (
            <Alert variant="success">Your email is verified.</Alert>
          ) : (
            <>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Button variant="primary" onClick={handleSendVerification} disabled={isSending}>
                {isSending ? "Sending..." : "Verify Email"}
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyEmail;