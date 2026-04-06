import { createRoot } from "react-dom/client";
import { createStore } from "redux";
import rootReducer from "./Reducers";


const store = createStore(rootReducer)

export default store;