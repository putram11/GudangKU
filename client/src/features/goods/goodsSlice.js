import { createSlice } from "@reduxjs/toolkit";
import { appRequest } from "../../utils/axios";

const initialState = {
  goods: [],
  loading: false,
  error: null,
};

export const goodsSlice = createSlice({
  name: "goods",
  initialState: initialState,
  reducers: {
    setGoods: (state, action) => {
      state.goods = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setGoods, setLoading, setError } = goodsSlice.actions;

export default goodsSlice.reducer;

export const fetchGoods = (search, selectedCategory) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await appRequest.get("/goods", {
      params: {
        search,
        categoryId: selectedCategory,
      },
    });
    dispatch(setGoods(response.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError("Failed to fetch goods"));
    dispatch(setLoading(false));
  }
};
