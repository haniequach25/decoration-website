export const loginUserAction = (data: any) => {
    return {
        type: "LOGIN",
        payload: data
    }
}

export const updateUserAction = (data: any) => {
    return {
        type: "UPDATE",
        payload: data
    }
}

export const logoutUserAction = () => {
    return {
        type: "LOGOUT",
        payload: ""
    }
}