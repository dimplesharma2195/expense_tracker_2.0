import React from "react";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 text-center" style={{ width: "400px" }}>
        <h2>Welcome to Expense Tracker</h2>
        <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
      </Card>
    </Container>
  );
};

export default Dashboard;