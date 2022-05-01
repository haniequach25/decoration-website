export const getCartSlice = () => {
    if (localStorage && localStorage.getItem("cartItems")) {
        const cart: any = localStorage.getItem("cartItems");
        return JSON.parse(cart);
    }
    else {
        return "";
    }
};

export const removeAllCartSlice = () => {
    const cart = getCartSlice();
    if (cart) {
        localStorage.removeItem("cartItems");
    }
};

export const setCartSlice = (data: any) => {
    localStorage.setItem("cartItems", JSON.stringify(data));
};