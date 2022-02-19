import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "@src/store/root-reducer";
 
export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));