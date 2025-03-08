import React, { useState } from "react";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import { auth, database } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

const Signup = () => {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      await set(ref(database, `users/${user.uid}`), { email: user.email });

      console.log("User has successfully signed up.");
      setForm({ email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4" style={{ width: "400px" }}>
        <h3 className="text-center">Sign Up</h3>
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

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password" />
          </Form.Group>

          <Button type="submit" disabled={loading} className="w-100" style={{ backgroundColor: "#90EE90", borderColor: "#90EE90", color: "black" }}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>

          <div className="text-center mt-3">
            <p>
              Have an account? <a href="/login" style={{ textDecoration: "none", color: "blue" }}>Login</a>
            </p>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Signup;