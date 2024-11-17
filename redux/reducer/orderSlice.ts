import { CostExpedition } from "@/@types";
import { Address, Voucher } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderState {
  addresses: Address[];
  selectedAddress?: Address;
  status: "idle" | "loading" | "failed";
  initialized: boolean;
  expedition?: CostExpedition;
  voucher?: Voucher;
  isDropship?: boolean;
  nameDropship?: string;
  noTelpDropship?: string;
  note?: string;
  serviceFee: number;
}

const initialState: OrderState = {
  addresses: [],
  status: "idle",
  initialized: false,
  expedition: undefined,
  voucher: undefined,
  isDropship: false,
  nameDropship: undefined,
  noTelpDropship: undefined,
  note: undefined,
  serviceFee: 1000,
  selectedAddress: undefined
};

export const orderSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    initAddress: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
      state.initialized = true;
    },
    setNameDropship: (state, action: PayloadAction<string>) => {
      state.nameDropship = action.payload;
    },
    setNoTelpDropship: (state, action: PayloadAction<string>) => {
      state.noTelpDropship = action.payload;
    },
    setNote: (state, action: PayloadAction<string>) => {
      state.note = action.payload;
    },
    toggleDropship: (state) => {
      state.isDropship = !state.isDropship;
    },
    setExpedition: (state, action: PayloadAction<CostExpedition>) => {
      state.expedition = action.payload;
    },
    setVoucher: (state, action: PayloadAction<Voucher>) => {
      state.voucher = action.payload;
    },
    selectAddress: (state, action: PayloadAction<Address>) => {
      state.selectedAddress = action.payload
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.unshift(action.payload)
    }
  },
});

export const {
  initAddress,
  setNote,
  setNameDropship,
  setNoTelpDropship,
  toggleDropship,
  setExpedition,
  setVoucher,
  selectAddress,
  addAddress
} = orderSlice.actions;

export default orderSlice.reducer;
