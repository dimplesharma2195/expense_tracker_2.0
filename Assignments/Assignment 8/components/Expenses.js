import React, { useState } from "react";
import { Container, Form, Button, Row, Col, ListGroup } from "react-bootstrap";

const Expenses = () => {
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    category: "Food",
  });
  const [expensesList, setExpensesList] = useState([]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setExpensesList([...expensesList, expense]);
    setExpense({ amount: "", description: "", category: "Food" });
  };

  return (
    <Container className="mt-4">
      <h2>Add Expense</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Amount Spent</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={expense.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={expense.category}
            onChange={handleChange}
            required
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary">
          Add Expense
        </Button>
      </Form>

      <hr />

      <h3>Your Expenses</h3>
      {expensesList.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ListGroup>
          {expensesList.map((exp, index) => (
            <ListGroup.Item key={index}>
              <Row>
                <Col xs={3}>
                  <strong>${exp.amount}</strong>
                </Col>
                <Col xs={5}>{exp.description}</Col>
                <Col xs={4}>
                  <em>{exp.category}</em>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Expenses;