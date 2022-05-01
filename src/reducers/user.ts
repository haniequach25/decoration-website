import { getToken } from "../features/Account/pages/Login/loginSlice";

const localStorageToken: any = getToken();

const initialState = {
    token: localStorageToken.token || "",
    customer: localStorageToken.customer || {},
}
const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN': {
            return {
                ...state,
                token: action.payload.token,
                customer: action.payload.customer,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                token: "",
                customer: {},
            }
        }

        case 'UPDATE': {
            return {
                ...state,
                token: action.payload.token,
                customer: action.payload.customer,
            }
        }
        default:
            return state;
    }
};
export default userReducer;
