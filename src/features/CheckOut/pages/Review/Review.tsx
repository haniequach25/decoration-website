import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { createOrder } from '../../../../api/orderApi';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { removeAllCart } from '../../../../actions/cart';

interface Props {
    cartItems: any,
    currentInfor: any,
    cartTotalAmount: any,
    handleNext: any,
}

const Review: React.FC<Props> = (props) => {

    const dispatch = useDispatch();

    const {
        handleSubmit,
    } = useForm({});

    const onSubmit = async () => {
        const items = props.cartItems.map((item: any) => ({
            sanpham: {
                _id: item._id,
            },
            soluong: item.cartQuantity,
        }));
        const finalData = {
            items: items,
            email: props.currentInfor.email,
            SDT: props.currentInfor.SDT,
            DiaChi: props.currentInfor.DiaChi,
            MaKhachHang: props.currentInfor._id,
            GhiChu: props.currentInfor.GhiChu ? props.currentInfor.GhiChu : "",
            TrangThai: 0,
            TongTien: props.cartTotalAmount,
            KieuThanhToan: "cod",
            TinhTrangThanhToan: 0,
        };
        console.log("customer", props.currentInfor);
        console.log(finalData);
        const action = await createOrder(finalData);
        console.log(action);
        props.handleNext();
        const removeCart = removeAllCart();
        dispatch(removeCart);
    };

    return (
        <React.Fragment>
            <form
                method="post"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography variant="h6" gutterBottom>
                    Order summary
                </Typography>
                <List disablePadding>
                    {props.cartItems?.map((product: any) => (
                        <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={product.TenSanPham} secondary={`x ${product.cartQuantity}`} />
                            <Typography variant="body2">$ {product.DonGia}</Typography>
                        </ListItem>
                    ))}
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary="Total" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            $ {Math.round(props.cartTotalAmount * 100) / 100}
                        </Typography>
                    </ListItem>
                </List>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            Shipping information
                        </Typography>
                        <Typography gutterBottom>Email: {props.currentInfor?.email}</Typography>
                        <Typography gutterBottom>Tel: {props.currentInfor?.SDT}</Typography>
                        <Typography gutterBottom>Address: {props.currentInfor?.DiaChi}</Typography>
                        <Typography gutterBottom>Note: {props.currentInfor?.GhiChu}</Typography>
                    </Grid>
                </Grid>
                <button
                    className='btn btn-secondary'
                    type="submit"
                    style={{ width: "100%" }}
                >
                    {'Submit'}
                </button>
            </form>
        </React.Fragment>
    );
}

export default Review;