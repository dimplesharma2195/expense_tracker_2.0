import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { ref, push, onValue } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

const Expenses = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    category: "Food",
  });
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if (user) {
      const expensesRef = ref(database, "expenses/" + user.uid);
      const unsubscribe = onValue(expensesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const expensesArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setExpensesList(expensesArray);
        } else {
          setExpensesList([]);
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const expensesRef = ref(database, "expenses/" + user.uid);
    push(expensesRef, expense)
      .then(() => {
        setExpense({ amount: "", description: "", category: "Food" });
      })
      .catch((err) => {
        console.error("Error adding expense:", err);
      });
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
            <option value="Rent">React</option>
            <option value="Bills">Bills</option>
            <option value="Tax">Tax</option>
            <option value="Savings">Savings</option>
            <option value="Grocery">Grocery</option>
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {expensesList.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.category}</td>
                <td>{exp.amount}</td>
                <td>{exp.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Expenses;