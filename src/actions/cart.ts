export const removeAllCart = () => {
    return {
        type: "REMOVE_ALL",
        payload: "",
    }
}

export const addToCart = (data: any) => {
    return {
        type: "ADD",
        payload: data,
    }
}

export const removeFromCart = (data: any) => {
    return {
        type: "REMOVE_FROM_CART",
        payload: data,
    }
}

export const decreaseCart = (data: any) => {
    return {
        type: "DECREASE_CART",
        payload: data,
    }
}

export const getTotals = () => {
    return {
        type: "GET_TOTAL",
        payload: "",
    }
}