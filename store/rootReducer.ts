import { combineReducers } from "@reduxjs/toolkit";

import widgetReducer from "@/features/widget/widgetSlice";

const rootReducer = combineReducers({
  widget: widgetReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
