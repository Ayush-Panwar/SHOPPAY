import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import expandSidebar from "./ExpandSlice";
import dialog from "./DialogSlice";
import cart from "./cartslice";
const reducers = combineReducers({ cart, expandSidebar, dialog });

const config = {
  key: "root",
  version: 0,
  storage,
};
const reducer = persistReducer(config, reducers);

const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV != "production",
  middleware: [thunk],
});
export default store;
