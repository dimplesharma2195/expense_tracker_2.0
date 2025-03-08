import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { getAuth, updateProfile } from "firebase/auth";
import { ref, update } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName) {
      setError("Full Name is required");
      return;
    }

    try {
      await updateProfile(user, {
        displayName: fullName,
        photoURL: profilePhoto
      });

      await update(ref(database, "users/" + user.uid), {
        fullName,
        profilePhoto
      });

      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className="border-bottom p-2 align-items-center">
        <Col xs={6}>
          <strong>Winners never quite, Quitters never win.</strong>
        </Col>

        <Col xs={4} className="text-end">
          <span
            style={{
              backgroundColor: "#fde3e3",
              padding: "5px 10px",
              borderRadius: "5px",
              marginRight: "5px"
            }}
          >
            Your Profile is 64% completed. A complete profile has higher chances of landing a job.
          </span>
          <Button variant="link" onClick={() => console.log("Complete now clicked")}>
            Complete now
          </Button>
        </Col>

        <Col xs={2} className="text-end">
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      <Row className="p-4">
        <Col xs={12} md={6} className="mx-auto">
          <h4>Contact Details</h4>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProfilePhoto">
              <Form.Label>Profile Photo URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your profile photo URL"
                value={profilePhoto}
                onChange={(e) => setProfilePhoto(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
            <Button variant="outline-secondary" className="ms-2" onClick={handleCancel}>
              Cancel
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CompleteProfile;