import { Middleware } from "redux";
import {
  addItem,
  addSomeQuantity,
  decrementQuantity,
  deleteItem,
  incrementQuantity,
  initCarts,
  recalculate,
  rollback,
  toggleCheckItem,
} from "../reducer/cartSlice";

export const cartMiddleware: Middleware =
  (store) => (next) => (action: any) => {
    const actionsToWatch = [
      addItem.type,
      deleteItem.type,
      incrementQuantity.type,
      decrementQuantity.type,
      initCarts.type,
      addSomeQuantity.type,
      toggleCheckItem.type,
      rollback.type,
    ];
    next(action);
    if (actionsToWatch.includes(action.type)) {
      store.dispatch(recalculate());
    }
  };
