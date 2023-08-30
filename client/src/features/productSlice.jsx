import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await axios.get("https://indoteknikserver-732012365989.herokuapp.com/products");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addToCartPost = createAsyncThunk(
  "orders/addToCartPost",
  async (data) => {
    console.log(data, "dataaaaaaaaaaaaa");
    console.log(`https://indoteknikserver-732012365989.herokuapp.com/orders/${data.id}`);
    try {
      const response = await axios.post(
        `https://indoteknikserver-732012365989.herokuapp.com/orders/${data.id}`,
        data,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      console.log(response, "responseeeeeeeeeeeeeeeeeeee");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default productsSlice.reducer;
