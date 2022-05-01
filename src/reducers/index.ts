import { combineReducers } from "redux";
import cartReducer from "./cart";
import userReducer from "./user";

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
})
export default rootReducer;
