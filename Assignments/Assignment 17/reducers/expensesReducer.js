const initialState = {
    expenses: [],
  };
  
  const expensesReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_EXPENSES":
        return { expenses: action.payload };
      case "ADD_EXPENSE":
        return { expenses: [...state.expenses, action.payload] };
      case "UPDATE_EXPENSE":
        return {
          expenses: state.expenses.map((exp) =>
            exp.id === action.payload.id ? action.payload : exp
          ),
        };
      case "DELETE_EXPENSE":
        return {
          expenses: state.expenses.filter((exp) => exp.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default expensesReducer;
  