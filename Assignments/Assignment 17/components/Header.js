import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, database } from "../firebase/firebaseConfig";

const Header = ({ isProfilePage }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();
      }
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const userRef = ref(database, "users/" + currentUser.uid);
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
  }, [currentUser]);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    getAuth().signOut();
    navigate("/login");
  };

  let headerMessage = "";
  let buttonText = "";

  if (!isProfilePage) {
    headerMessage = isProfileComplete
      ? "Your Profile is Complete"
      : "Your Profile is Incomplete";
    buttonText = isProfileComplete ? "Update profile here" : "Complete now";
  } else {
    headerMessage = isProfileComplete
      ? "Your Profile is 100% Complete"
      : "Your Profile is 64% completed. A complete profile has higher chances of landing a job.";
    buttonText = isProfileComplete ? "Update profile here" : "Complete now";
  }

  return (
    <Container
      fluid
      className="p-2 border-bottom"
      style={{ backgroundColor: "lightgreen" }}
    >
      <Row className="align-items-center">
        <Col xs={isProfilePage ? 2 : 6}>
          {isProfilePage ? (
            <Button variant="link" onClick={() => navigate("/home")}>
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
          <Button variant="link" onClick={handleProfileClick}>
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