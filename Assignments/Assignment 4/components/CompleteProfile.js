import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { ref, update as updateDb, get } from "firebase/database";
import { auth, database } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setLocalUser(usr);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!localUser) return;
    const userRef = ref(database, "users/" + localUser.uid);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setFullName(data.fullName || "");
          setProfilePhoto(data.profilePhoto || "");
          if (data.fullName && data.profilePhoto) {
            setIsProfileComplete(true);
          } else {
            setIsProfileComplete(false);
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [localUser]);

  useEffect(() => {
    if (fullName && profilePhoto) {
      setIsProfileComplete(true);
    } else {
      setIsProfileComplete(false);
    }
  }, [fullName, profilePhoto, success]);

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

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <Container fluid className="p-0">
      <Row className="border-bottom p-2 align-items-center">
        <Col xs={2} className="text-start">
          <Button variant="link" onClick={handleBack}>
            &larr; Back
          </Button>
        </Col>
        <Col xs={4}>
          <strong>Winners never quit, Quitters never win.</strong>
        </Col>
        <Col xs={4} className="text-end">
          {isProfileComplete ? (
            <span
              style={{
                backgroundColor: "#d4edda",
                padding: "5px 10px",
                borderRadius: "5px",
                marginRight: "5px",
                color: "#155724",
              }}
            >
              Your Profile is 100% complete.
            </span>
          ) : (
            <span
              style={{
                backgroundColor: "#fde3e3",
                padding: "5px 10px",
                borderRadius: "5px",
                marginRight: "5px",
              }}
            >
              Your Profile is 64% completed. A complete profile has higher chances of landing a job.
            </span>
          )}
          <Button variant="link" onClick={() => navigate("/complete-profile")}>
            {isProfileComplete ? "Update details here" : "Complete now"}
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