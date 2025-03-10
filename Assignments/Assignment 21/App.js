import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./stores/store";
import Header from "./components/Header";
import { fetchCartData } from "./features/cartActions";
import Notification from "./components/Notification";
import Products from "./components/Product";
import Cart from "./components/Cart";
import CartDataHandler from "./components/CartDataHandler";

function MainContent() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.cart.isVisible);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Header />
      {cartIsVisible && <Cart />}
      <Products />
      <CartDataHandler />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainContent />
    </Provider>
  );
}