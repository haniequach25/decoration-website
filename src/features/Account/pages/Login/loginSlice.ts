import { me } from "../../../../api/userApi";

export const saveToken = (data: any) => {
    if (data) {
        localStorage.setItem("token", JSON.stringify(data));
    }
};

export const getToken = () => {
    if (localStorage && localStorage.getItem("token")) {
        const token: any = localStorage.getItem("token");
        return JSON.parse(token);
    }
    else {
        return "";
    }
};

export const removeToken = () => {
    const token = getToken();
    if (token) {
        localStorage.removeItem("token");
    }
};

export const getMe = async () => {
    const userInfo = await me()
    return userInfo
};