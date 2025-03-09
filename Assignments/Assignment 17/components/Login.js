import React, { useState } from "react";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Dispatch the LOGIN_SUCCESS action
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token, userId: user.uid },
      });

      localStorage.setItem("token", token);
      console.log("User successfully logged in.");
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4" style={{ width: "400px" }}>
        <h3 className="text-center">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter password" />
          </Form.Group>
          <Button type="submit" disabled={loading} className="w-100" style={{ backgroundColor: "#90EE90", borderColor: "#90EE90", color: "black" }}>
            {loading ? "Logging In..." : "Login"}
          </Button>
          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <a href="/" style={{ textDecoration: "none", color: "blue" }}>
                Sign Up
              </a>
            </p>
          </div>
          <div className="text-center mt-3">
            <a href="/forgot-password" style={{ textDecoration: "none", color: "blue" }}>
              Forgot Password?
            </a>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;