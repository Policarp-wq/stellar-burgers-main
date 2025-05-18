import { getOrderByNumberApi, getOrdersApi, orderBurgerApi, TNewOrderResponse } from "@api";
import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import { RootState } from "../store";

export interface IOrderState {
  orders: TOrder[];
  orderRequest: boolean;
  orderError: null | SerializedError;
  processedOrder: TOrder | null;
  isLoadingNumber: boolean;
  isLoadingOrders: boolean;
}

export const initialState: IOrderState = {
  orders: [],
  orderRequest: false,
  orderError: null,
  processedOrder: null,
  isLoadingNumber: true,
  isLoadingOrders: true
};

export const createOrder = createAsyncThunk<TNewOrderResponse, string[]>("order/createOrder", async(ingredients, {rejectWithValue}) =>{
    const data = await orderBurgerApi(ingredients);
    if(!data.success) rejectWithValue(data);
    return data;
})

export const getOrder = createAsyncThunk<TOrder, number>("order/getOrder", async(num, {rejectWithValue}) =>{
    const data = await getOrderByNumberApi(num);
    if(!data.success) return rejectWithValue(data);
    return data.orders[0];
});

export const getOrdersList = createAsyncThunk<TOrder[], void>("order/list", async(_, {rejectWithValue}) =>{
    const data = await getOrdersApi();
    return data;
})

export const orderBuilder = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) =>{
            state.orderRequest = true;
            state.processedOrder = null;
        })
        .addCase(createOrder.fulfilled, (state, action) =>{
            state.orderRequest = false;
            state.processedOrder = action.payload.order;
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.orderRequest = false;
            state.processedOrder = null;
      })
      .addCase(getOrder.pending, (state) =>{
        state.isLoadingNumber = true;
      })
      .addCase(getOrder.fulfilled, (state, action) =>{
        state.isLoadingNumber = false;
        state.processedOrder = action.payload;
      })
      .addCase(getOrder.rejected, (state) =>{
        state.isLoadingNumber = false;
        state.processedOrder = null;
      })
      .addCase(getOrdersList.pending, (state) =>{
        state.isLoadingOrders = true;
      })
      .addCase(getOrdersList.fulfilled, (state, action) =>{
        state.isLoadingOrders = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersList.rejected, (state, action) =>{
        state.isLoadingOrders = false;
        state.orders = [];
        state.orderError = action.error;
      })
    },
})

export const selectOrders = (state: RootState): TOrder[] => state.order.orders;
export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;
export const selectProcessedOrder = (state: RootState) =>
  state.order.processedOrder;

export default orderBuilder.reducer;
