import { removeAllCartSlice, setCartSlice } from "../features/CheckOut/cartSlice";

const localStorageCart: any = localStorage.getItem("cartItems");

const initialState = {
    cartItems: localStorageCart ? JSON.parse(localStorageCart) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}
const cartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'REMOVE_ALL': {
            removeAllCartSlice();
            return {
                cartItems: [],
                cartTotalQuantity: 0,
                cartTotalAmount: 0,
            }
        }
        case 'ADD': {
            const itemIndex = state.cartItems.findIndex(
                (item: any) => item.slug === action.payload.slug);

            if (itemIndex >= 0) {
                if ((state.cartItems[itemIndex].cartQuantity + action.payload.quantity) < state.cartItems[itemIndex].SoLuong + 1) {

                    let tempCartItems = state.cartItems;
                    tempCartItems[itemIndex].cartQuantity += action.payload.quantity;

                    let { total, quantity } = tempCartItems.reduce(
                        (cartTotal: any, cartItem: any) => {
                            const { DonGia, cartQuantity } = cartItem;
                            const itemTotal = DonGia * cartQuantity;

                            cartTotal.total += itemTotal
                            cartTotal.quantity += cartQuantity

                            return cartTotal;
                        },
                        {
                            total: 0,
                            quantity: 0,
                        });
                    setCartSlice(tempCartItems);
                    return {
                        ...state,
                        cartItems: tempCartItems,
                        cartTotalQuantity: quantity,
                        cartTotalAmount: total,
                    }
                }
                else {
                    let tempCartItems = state.cartItems;
                    tempCartItems[itemIndex].cartQuantity = state.cartItems[itemIndex].SoLuong;

                    let { total, quantity } = tempCartItems.reduce(
                        (cartTotal: any, cartItem: any) => {
                            const { DonGia, cartQuantity } = cartItem;
                            const itemTotal = DonGia * cartQuantity;

                            cartTotal.total += itemTotal
                            cartTotal.quantity += cartQuantity

                            return cartTotal;
                        },
                        {
                            total: 0,
                            quantity: 0,
                        });
                    setCartSlice(tempCartItems);
                    return {
                        ...state,
                        cartItems: tempCartItems,
                        cartTotalQuantity: quantity,
                        cartTotalAmount: total,
                    }
                }
            }
            else {
                let tempProduct = { ...action.payload, cartQuantity: action.payload.quantity };
                let tempCartItems = state.cartItems;
                tempCartItems.push(tempProduct);

                let { total, quantity } = tempCartItems.reduce(
                    (cartTotal: any, cartItem: any) => {
                        const { DonGia, cartQuantity } = cartItem;
                        const itemTotal = DonGia * cartQuantity;

                        cartTotal.total += itemTotal
                        cartTotal.quantity += cartQuantity

                        return cartTotal;
                    },
                    {
                        total: 0,
                        quantity: 0,
                    });
                setCartSlice(tempCartItems);
                return {
                    ...state,
                    cartItems: tempCartItems,
                    cartTotalQuantity: quantity,
                    cartTotalAmount: total,
                }
            }
        }

        case 'REMOVE_FROM_CART': {
            const nextCartItems = state.cartItems.filter(
                (cartItems: any) => cartItems.slug !== action.payload.slug
            );

            let { total, quantity } = nextCartItems.reduce(
                (cartTotal: any, cartItem: any) => {
                    const { DonGia, cartQuantity } = cartItem;
                    const itemTotal = DonGia * cartQuantity;

                    cartTotal.total += itemTotal
                    cartTotal.quantity += cartQuantity

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                });
            setCartSlice(nextCartItems);
            return {
                ...state,
                cartItems: nextCartItems,
                cartTotalQuantity: quantity,
                cartTotalAmount: total,
            }
        }

        case 'DECREASE_CART': {
            const itemIndex = state.cartItems.findIndex(
                (cartItem: any) => cartItem.slug === action.payload.slug
            );

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                let tempCartItems = state.cartItems;
                tempCartItems[itemIndex].cartQuantity -= 1;

                let { total, quantity } = tempCartItems.reduce(
                    (cartTotal: any, cartItem: any) => {
                        const { DonGia, cartQuantity } = cartItem;
                        const itemTotal = DonGia * cartQuantity;

                        cartTotal.total += itemTotal
                        cartTotal.quantity += cartQuantity

                        return cartTotal;
                    },
                    {
                        total: 0,
                        quantity: 0,
                    });
                setCartSlice(tempCartItems);
                return {
                    ...state,
                    cartItems: tempCartItems,
                    cartTotalQuantity: quantity,
                    cartTotalAmount: total,
                }
            }

            else if (state.cartItems[itemIndex].cartQuantity === 1) {

                let tempCartItems = state.cartItems;
                console.log(tempCartItems, "before")
                tempCartItems = tempCartItems.filter(
                    (cartItems: any) => cartItems.slug !== action.payload.slug
                );

                console.log(tempCartItems, tempCartItems.length, "after")

                let { total, quantity } = tempCartItems.reduce(
                    (cartTotal: any, cartItem: any) => {
                        const { DonGia, cartQuantity } = cartItem;
                        const itemTotal = DonGia * cartQuantity;

                        cartTotal.total += itemTotal
                        cartTotal.quantity += cartQuantity

                        return cartTotal;
                    },
                    {
                        total: 0,
                        quantity: 0,
                    });
                if (tempCartItems.length > 0) {
                    setCartSlice(tempCartItems);
                    return {
                        ...state,
                        cartItems: tempCartItems,
                        cartTotalQuantity: quantity,
                        cartTotalAmount: total,
                    }
                }
                else {
                    removeAllCartSlice();
                    return {
                        ...state,
                        cartItems: [],
                        cartTotalQuantity: 0,
                        cartTotalAmount: 0,
                    }
                }
            }

            else {
                return {
                    ...state,
                }
            }
        }

        case 'GET_TOTAL': {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal: any, cartItem: any) => {
                    const { DonGia, cartQuantity } = cartItem;
                    const itemTotal = DonGia * cartQuantity;

                    cartTotal.total += itemTotal
                    cartTotal.quantity += cartQuantity

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                });
            return {
                ...state,
                cartTotalQuantity: quantity,
                cartTotalAmount: total,
            }
        }

        default:
            return state;
    }
};
export default cartReducer;
