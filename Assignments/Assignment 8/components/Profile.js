import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { ref, update as updateDb, get } from "firebase/database";
import { auth, database } from "../firebase/firebaseConfig";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setLocalUser(usr);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (localUser) {
      const userRef = ref(database, "users/" + localUser.uid);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setFullName(data.fullName || "");
            setProfilePhoto(data.profilePhoto || "");
          }
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  }, [localUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName) {
      setError("Full Name is required");
      return;
    }
    try {
      await updateProfile(localUser, {
        displayName: fullName,
        photoURL: profilePhoto,
      });
      await updateDb(ref(database, "users/" + localUser.uid), {
        fullName,
        profilePhoto,
      });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Header isProfilePage={true} />
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h4>Contact Details</h4>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
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
              <Button
                variant="outline-secondary"
                className="ms-2"
                onClick={() => navigate("/home")}
              >
                Cancel
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;