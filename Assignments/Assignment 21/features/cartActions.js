import { uiActions } from "./uislice";
import { cartActions } from "./cartSlice";

export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Fetching...",
        message: "Fetching cart data from server...",
      })
    );

    try {
      const response = await fetch(
        "https://dummy-movie-27ae3-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Fetching cart data failed!");
      }
      const data = await response.json();

      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          totalQuantity: data.totalQuantity || 0,
        })
      );

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Fetched cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};