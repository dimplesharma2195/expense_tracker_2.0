import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

const Header = ({ isProfilePage }) => {
  const navigate = useNavigate();
  const user = getAuth().currentUser;
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

  const handleButtonClick = () => {
    navigate("/profile");
  };

  const handleBack = () => {
    navigate("/home");
  };

  const handleLogout = () => {
    getAuth().signOut();
    navigate("/login");
  };

  let headerMessage = "";
  let buttonText = "";

  if (!isProfilePage) {
    if (isProfileComplete) {
      headerMessage = "Your Profile is Complete";
      buttonText = "Update profile here";
    } else {
      headerMessage = "Your Profile is Incomplete";
      buttonText = "Complete now";
    }
  } else {
    if (isProfileComplete) {
      headerMessage = "Your Profile is 100% Complete";
      buttonText = "Update profile here";
    } else {
      headerMessage =
        "Your Profile is 64% completed. A complete profile has higher chances of landing a job.";
      buttonText = "Complete now";
    }
  }

  return (
    <Container fluid className="p-2 border-bottom">
      <Row className="align-items-center">
        <Col xs={isProfilePage ? 2 : 6}>
          {isProfilePage ? (
            <Button variant="link" onClick={handleBack}>
              &larr; Back
            </Button>
          ) : (
            <h5>Welcome to Expense Tracker!!</h5>
          )}
        </Col>
        <Col xs={isProfilePage ? 6 : 4} className="text-end">
          <span
            style={{
              backgroundColor: isProfileComplete ? "#d4edda" : "#fde3e3",
              padding: "5px 10px",
              borderRadius: "5px",
              marginRight: "5px",
              color: isProfileComplete ? "#155724" : "inherit",
            }}
          >
            {headerMessage}
          </span>
          <Button variant="link" onClick={handleButtonClick}>
            {buttonText}
          </Button>
        </Col>
        <Col xs={isProfilePage ? 4 : 2} className="text-end">
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
