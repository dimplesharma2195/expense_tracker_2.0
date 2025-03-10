import React from "react";
import { Provider, useSelector } from "react-redux";
import store from "./stores/store";
import Header from "./components/Header";
import Notification from "./components/Notification";
import Products from "./components/Product";
import Cart from "./components/Cart";
import CartDataHandler from "./components/CartDataHandler";

const MainContent = () => {
  const notification = useSelector((state) => state.ui.notification);
  const cartIsVisible = useSelector((state) => state.cart.isVisible);

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Header />

      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}

      {cartIsVisible && <Cart />}

      <Products />

      <CartDataHandler />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <MainContent />
    </Provider>
  );
}

export default App;