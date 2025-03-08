import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCompleteProfile = () => {
    navigate("/complete-profile");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <Container fluid className="p-2 border-bottom">
      <Row className="align-items-center">
        <Col xs={6}>
          <h5>Welcome to Expense Tracker!!</h5>
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
            Your profile is incomplete.
          </span>
          <Button variant="link" onClick={handleCompleteProfile}>
            Complete now
          </Button>
        </Col>

        <Col xs={2} className="text-end">
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;