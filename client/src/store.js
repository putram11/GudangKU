import { configureStore } from "@reduxjs/toolkit";

import goodsReducer from "./features/goods/goodsSlice";

const store = configureStore({
  reducer: {
    goods: goodsReducer,
  },
});

export default store;
