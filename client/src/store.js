import { createStore, applyMiddleware, compose } from "redux";
import allReducers from "./reducers";
import thunk from "redux-thunk";

export const store = createStore(allReducers, compose(applyMiddleware(thunk)));
