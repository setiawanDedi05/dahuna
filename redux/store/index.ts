import CartReducer from "@/redux/reducer/cartSlice";
import OrderReducer from "@/redux/reducer/orderSlice";
import { configureStore } from "@reduxjs/toolkit";
import { cartMiddleware } from "../middleware/cartMiddleware";

export const store = configureStore({
  reducer: {
    carts: CartReducer,
    order: OrderReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(cartMiddleware),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
