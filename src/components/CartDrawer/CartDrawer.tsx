import { Box, Divider, Drawer, List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import { addToCart, decreaseCart, getTotals, removeAllCart, removeFromCart } from '../../actions/cart';
import { removeAllCartSlice, setCartSlice } from '../../features/CheckOut/cartSlice';

interface Props {
    open: any,
    setOpen: any,
}

const CartDrawer: React.FC<Props> = (props) => {

    const dispatch = useDispatch();

    const cartItems = useSelector((state: any) => state.cart.cartItems);

    const cartTotalAmount = useSelector((state: any) => state.cart.cartTotalAmount);

    const token: any = useSelector((state: any) => state.user.token);

    useEffect(() => {
        dispatch(getTotals());
    }, [cartTotalAmount, cartItems]);

    const handleAddToCart = (product: any) => {
        if (product.SoLuong > 0) {

            const action = addToCart({ ...product, quantity: 1 })

            dispatch(action);
        }
    }

    const handleDecreaseToCart = (product: any) => {
        if (product.SoLuong > 0) {

            const action = decreaseCart({ ...product })

            dispatch(action);
        }
    }

    const handleClearAll = () => {
        const action = removeAllCart();

        dispatch(action);

        removeAllCartSlice();
    }

    const handleRemove = (product: any) => {
        const action = removeFromCart({ ...product })

        dispatch(action);
    }

    const list = () => (
        <Box
            sx={{ width: 350 }}
            role="presentation"
            className='cart-drawer'
        >
            <List>
                <ListSubheader
                    component="div"
                    id="nested-list-subheader"
                    className='cart-title'
                >
                    Giỏ hàng
                </ListSubheader>
                <Divider />
                {cartItems && cartItems.length > 0 ? cartItems.map((item: any, index: any) => (
                    <div key={item._id}>
                        <ListItem button key={item.TenSanPham}>
                            <img
                                src={item.AnhMoTa[0].source}
                                alt={item.TenSanPham}
                                className="cart-item-img"
                            />
                            <div className="cart-item-name-quantity">
                                <Link className="item-name" to={`/product/${item.slug}`}>
                                    {item.TenSanPham}
                                </Link>
                                <div className="item-name item-price">
                                    $ {item.DonGia}
                                </div>
                                <div className="item-quantity">
                                    <button
                                        className='input-quantity'
                                        onClick={() => { handleDecreaseToCart(item) }}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        className='input-quantity'
                                        value={item.cartQuantity}
                                        onChange={(event) => { }}
                                    />
                                    <button
                                        className='input-quantity button-increase'
                                        onClick={() => { handleAddToCart(item) }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button className='item-button-remove' onClick={() => { handleRemove(item) }}>
                                <ClearIcon />
                            </button>

                        </ListItem>
                    </div>
                )) : (<ListItem>
                    <ListItemText primary={"Bạn chưa có sản phẩm nào..."} />
                </ListItem>)
                }
                {cartItems.length > 0 ? (<>
                    <Divider />
                    <ListItem>
                        <div className="cart-total-money">
                            <span className='total-money-text'>
                                Tổng tiền:
                            </span>
                            <span className='total-money-number'>
                                $ {Math.round(cartTotalAmount * 100) / 100}
                            </span>
                        </div>
                    </ListItem>

                    <ListItem>
                        <button
                            className="btn btn-secondary button-clear"
                            onClick={() => { handleClearAll() }}
                        >
                            Dọn giỏ hàng
                        </button>
                    </ListItem>

                    <ListItem>
                        <Link
                            className="btn btn-secondary button-checkout"
                            to={token ? "/checkout" : "/account/login"}
                            onClick={() => { props.setOpen(false) }}
                        >
                            Thanh toán
                        </Link>
                    </ListItem>
                </>) : ""}
            </List>
        </Box>
    );

    return (
        <div>
            <Drawer
                anchor={"right"}
                open={props.open}
                onClose={() => { props.setOpen(false) }}
            >
                {list()}
            </Drawer>
        </div>
    );
}

export default CartDrawer;