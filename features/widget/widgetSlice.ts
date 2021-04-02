import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialState = {
  nameOfActiveWidget: ""
};

const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    setActiveWidget(state, action: PayloadAction<string>) {
      state.nameOfActiveWidget = action.payload;
    }
  }
});

export const { setActiveWidget } = widgetSlice.actions;

export default widgetSlice.reducer;
