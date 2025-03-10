import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../features/uislice";
import { cartActions } from "../features/cartSlice";

let isInitial = true; 

const CartDataHandler = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchCartData = async () => {
      const response = await fetch(
        "https://dummy-movie-27ae3-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        console.log("Could not fetch cart data!");
        return;
      }
      const data = await response.json();
      if (data) {
        dispatch(
          cartActions.replaceCart({
            items: data.items || [],
            totalQuantity: data.totalQuantity || 0,
          })
        );
      }
    };
    fetchCartData().catch((error) => {
      console.log(error);
    });
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (!cart.changed) {
      return;
    }

    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );

      const response = await fetch(
        "https://dummy-movie-27ae3-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    };

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);

  return null; 
};

export default CartDataHandler;