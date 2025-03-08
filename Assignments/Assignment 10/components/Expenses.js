import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, push, onValue, update, remove } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

const Expenses = () => {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    category: "Food",
  });
  const [expensesList, setExpensesList] = useState([]);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editingExpense, setEditingExpense] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  // Realtime listener for expenses
  useEffect(() => {
    if (currentUser) {
      const expensesRef = ref(database, "expenses/" + currentUser.uid);
      const unsubscribe = onValue(expensesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert the returned object into an array
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
  }, [currentUser]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const expensesRef = ref(database, "expenses/" + currentUser.uid);
    push(expensesRef, expense)
      .then(() => {
        setExpense({ amount: "", description: "", category: "Food" });
      })
      .catch((err) => {
        console.error("Error adding expense:", err);
      });
  };

  const handleDelete = (expenseId) => {
    if (!currentUser) return;
    const expenseRef = ref(database, `expenses/${currentUser.uid}/${expenseId}`);
    remove(expenseRef)
      .then(() => {
        console.log("Expense successfully deleted");
      })
      .catch((err) => {
        console.error("Error deleting expense:", err);
      });
  };

  const handleEdit = (expenseItem) => {
    setEditingExpenseId(expenseItem.id);
    setEditingExpense({
      amount: expenseItem.amount,
      description: expenseItem.description,
      category: expenseItem.category,
    });
  };

  const handleEditChange = (e) => {
    setEditingExpense({ ...editingExpense, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (expenseId) => {
    if (!currentUser) return;
    const expenseRef = ref(database, `expenses/${currentUser.uid}/${expenseId}`);
    update(expenseRef, editingExpense)
      .then(() => {
        console.log("Expense successfully updated");
        setEditingExpenseId(null);
        setEditingExpense({ amount: "", description: "", category: "Food" });
      })
      .catch((err) => {
        console.error("Error updating expense:", err);
      });
  };

  const handleEditCancel = () => {
    setEditingExpenseId(null);
    setEditingExpense({ amount: "", description: "", category: "Food" });
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expensesList.map((exp) => (
              <tr key={exp.id}>
                {editingExpenseId === exp.id ? (
                  <>
                    <td>
                      <Form.Select
                        name="category"
                        value={editingExpense.category}
                        onChange={handleEditChange}
                      >
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Salary</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Rent">Rent</option>
                        <option value="Bills">Bills</option>
                        <option value="Tax">Tax</option>
                        <option value="Savings">Savings</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        name="amount"
                        value={editingExpense.amount}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="description"
                        value={editingExpense.description}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleEditSubmit(exp.id)}
                      >
                        Submit
                      </Button>{" "}
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{exp.category}</td>
                    <td>{exp.amount}</td>
                    <td>{exp.description}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEdit(exp)}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(exp.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Expenses;