import { Cart, Product } from "@/@types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  value: Cart[];
  status: "idle" | "loading" | "failed";
  initialized: boolean;
  totalItems: number;
  totalAmount: number;
}

const initialState: CartState = {
  value: [],
  status: "idle",
  initialized: false,
  totalItems: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addSomeQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const cartIndex = state.value.findIndex(
        (cart) => cart.id === action.payload.id
      );
      if (cartIndex < 0) return;
      state.value[cartIndex].quantity += action.payload.quantity;
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const cartIndex = state.value.findIndex(
        (cart) => cart.id === action.payload
      );
      if (cartIndex < 0) return;
      state.value[cartIndex].quantity += 1;
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const cartIndex = state.value.findIndex(
        (cart) => cart.id === action.payload
      );
      if (cartIndex < 0) return;
      if (state.value[cartIndex].quantity === 1) {
        state.value.splice(cartIndex, 1);
        return;
      }
      state.value[cartIndex].quantity -= 1;
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      const cartIndex = state.value.findIndex(
        (cart) => cart.id === action.payload
      );
      if (cartIndex < 0) return;
      state.value.splice(cartIndex, 1);
    },
    addItem: (
      state,
      action: PayloadAction<{
        product: Product;
        userId: string;
        quantity: number;
      }>
    ) => {
      const { product, userId, quantity } = action.payload;
      const cartIndex = state.value.findIndex(
        (cart) => cart.productId === product.id
      );
      if (cartIndex < 0) {
        const cart: Cart = {
          price: product.priceDisplay,
          productId: product.id,
          checked: true,
          userId,
          quantity,
          Product: product,
        };
        state.value.unshift(cart);
        return;
      }
      state.value[cartIndex].quantity += quantity;
    },
    toggleCheckItem: (
      state,
      action: PayloadAction<{ id: string; value: boolean }>
    ) => {
      const cartIndex = state.value.findIndex(
        (cart) => cart.id === action.payload.id
      );
      if (cartIndex < 0) return;
      state.value[cartIndex].checked = action.payload.value;
    },
    initCarts: (state, action: PayloadAction<Cart[]>) => {
      state.value = action.payload;
      state.initialized = true;
    },
    rollbackDelete: (
      state,
      action: PayloadAction<{ item: Cart; index: number }>
    ) => {
      const { item, index } = action.payload;
      state.value.splice(index, 0, item);
    },
    rollbackAdd: (state, action: PayloadAction<string>) => {
      const findedCart = state.value.findIndex(
        (it) => it.productId === action.payload
      );
      if (findedCart < 0) return;
      if (state.value[findedCart].quantity === 1){
        state.value.splice(findedCart, 1);
        return
      }
      state.value[findedCart].quantity -= 1;
    },
    rollbackIncrement: (state, action: PayloadAction<Cart>) => {
      const findedCart = state.value.findIndex(
        (it) => it.id === action.payload.id
      );
      if (findedCart < 0) return;
      state.value[findedCart].quantity -= 1;
    },
    rollbackDecrement: (state, action: PayloadAction<Cart>) => {
      const findedCart = state.value.findIndex(
        (it) => it.id === action.payload.id
      );
      if (findedCart < 0) return;
      state.value[findedCart].quantity += 1;
    },
    recalculate: (state) => {
      state.totalAmount = state.value.reduce(
        (accumulator, currenValue) =>
          currenValue.checked
            ? accumulator + currenValue.price * currenValue.quantity
            : accumulator + 0,
        0
      );
      state.totalItems = state.value.reduce(
        (accumulator, currenValue) =>
          currenValue.checked
            ? accumulator + currenValue.quantity
            : accumulator + 0,
        0
      );
    },
    changeStatus: (
      state,
      action: PayloadAction<"idle" | "loading" | "failed">
    ) => {
      state.status = action.payload;
    },
  },
});

export const {
  incrementQuantity,
  decrementQuantity,
  addSomeQuantity,
  deleteItem,
  addItem,
  rollbackDelete,
  initCarts,
  toggleCheckItem,
  recalculate,
  changeStatus,
  rollbackAdd,
  rollbackDecrement,
  rollbackIncrement
} = cartSlice.actions;

export default cartSlice.reducer;
