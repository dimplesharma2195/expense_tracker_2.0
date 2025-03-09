const initialState = {
    theme: "light",
    premiumActivated: false,
  };
  
  const themeReducer = (state = initialState, action) => {
    switch (action.type) {
      case "TOGGLE_THEME":
        return { ...state, theme: state.theme === "light" ? "dark" : "light" };
      case "ACTIVATE_PREMIUM":
        return { ...state, premiumActivated: true };
      default:
        return state;
    }
  };
  
  export default themeReducer;
  