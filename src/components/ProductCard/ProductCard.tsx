import React from 'react';
import { Link } from 'react-router-dom';
import numberWithCommas from '../../MoneyFormat';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import Quickview from './Quickview/Quickview';
import { useDispatch } from 'react-redux';
import { setCartSlice } from '../../features/CheckOut/cartSlice';
import { addToCart } from '../../actions/cart';
import { Store } from 'react-notifications-component';

interface Properties {
    item: any,
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 700,
    overflowY: "scroll",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ProductCard: React.FC<Properties> = (props) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    const handleAddToCart = async (product: any) => {
        if (product.SoLuong > 0) {

            const action = await addToCart({ ...product, quantity: 1 })

            dispatch(action);

            Store.addNotification({
                title: "Success!",
                message: "Thêm vào giỏ hàng thành công !",
                type: "success",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: false
                }
            })
        }
        else {
            Store.addNotification({
                title: "Failed!",
                message: "Sản phẩm đã hết, xin vui lòng chọn sản phẩm khác !",
                type: 'danger',
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: false
                }
            })
        }
    }

    return (
        <div className='thumbnail-container'>
            <div className="product-image">
                <Link to={`/product/${props.item.slug}`}>
                    <img
                        src={props.item.AnhMoTa[0].source || "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg"}
                        alt="product"
                        className="img-fluid"
                    />
                    {props.item.AnhMoTa[1].source ? (
                        <img
                            src={props.item.AnhMoTa[1].source || "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg"}
                            alt="product"
                            className="img-fluid img-fluid-2nd"
                        />
                    ) : ""}
                </Link>

                <div className="quick-interaction">
                    <div className="quickview">
                        <button
                            onClick={handleOpen}
                            className="quick-view">
                            <SearchIcon />
                        </button>
                    </div>

                    <div className="quickcart">
                        <button
                            onClick={() => handleAddToCart(props.item)}
                            className="quick-cart">
                            <ShoppingCartOutlinedIcon />
                        </button>
                    </div>
                </div>
            </div>

            <div className="product-meta">
                <h4 className="product-title">
                    <Link to={`/product/${props.item.slug}`}>
                        {props.item.TenSanPham || "Product name"}
                    </Link>
                </h4>

                <div className="product-price">
                    <div className="price">
                        <span>{numberWithCommas(props.item.DonGia) || 0}</span>
                        <span> VNĐ</span>
                    </div>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="modal-quickview">
                    <Quickview slug={props.item.slug} handleClose={handleClose} />
                </Box>
            </Modal>
        </div>
    );
}

export default ProductCard;