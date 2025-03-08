import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

const Dashboard = () => {
  const authInstance = getAuth();
  const user = authInstance.currentUser;
  const navigate = useNavigate();
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    if (user) {
      const userRef = ref(database, "users/" + user.uid);
      const unsubscribe = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data.fullName && data.profilePhoto) {
            setIsProfileComplete(true);
          } else {
            setIsProfileComplete(false);
          }
        } else {
          setIsProfileComplete(false);
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleProfileUpdate = () => {
    navigate("/complete-profile");
  };

  const handleLogout = () => {
    authInstance.signOut();
    navigate("/login");
  };

  return (
    <Container fluid className="p-2 border-bottom">
      <Row className="align-items-center">
        <Col xs={6}>
          <h5>Welcome to Expense Tracker!!</h5>
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
              Your Profile is complete.
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
              Your profile is incomplete.
            </span>
          )}
          <Button variant="link" onClick={handleProfileUpdate}>
            {isProfileComplete ? "Update details here" : "Complete now"}
          </Button>
        </Col>

        <Col xs={2} className="text-end">
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      <Row className="mt-5 justify-content-center">
        <Col xs="auto">
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;