import { Rating, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box } from '@mui/system';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from 'react-notifications-component';
import numberWithCommas from '../../../MoneyFormat';
import { addToCart } from '../../../actions/cart';
import { getProductBySlug } from '../../../api/productApi';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface Props {
    slug: any,
    handleClose: any,
}

const Quickview: React.FC<Props> = (props) => {

    const [rating, setRating] = useState(0);

    const [value, setValue] = React.useState(0);

    const [currentImage, setCurrentImage] = useState("");

    const [currentQuantity, setCurrentQuantity] = useState(1);

    const [productDetail, setProductDetail]: any = useState({});

    const dispatch = useDispatch();

    const [productName, setProductName] = useState('Sản phẩm');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response: any = await getProductBySlug(props.slug);

                console.log(response.data);

                setProductDetail(
                    response && response.data
                        ? response.data
                        : {}
                );

                setProductName(response.data.TenSanPham);

                setCurrentImage(
                    response && response.data && response.data.AnhMoTa
                        ? response.data.AnhMoTa[0].source
                        : ""
                )

                setRating(response.data.averageRating);
            } catch (error) { }
        };
        fetchProduct();
    }, [props.slug]);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const onChangeQuantity = (event: any) => {
        if (event.target.value > productDetail.SoLuong) {
            setCurrentQuantity(Number.parseInt(productDetail.SoLuong));
        }

        else if (event.target.value < 1) {
            setCurrentQuantity(1);
        }

        else {
            setCurrentQuantity(Number.parseInt(event.target.value));
        }
    }

    const handleAddToCart = async (product: any) => {
        if (product.SoLuong > 0) {

            const action = await addToCart({ ...product, quantity: currentQuantity })

            dispatch(action);

            props.handleClose();

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

    useEffect(() => {
        document.title = productName;
    }, [productName]);

    return (
        <div style={{ outline: "none" }}>
            <div className="product-detail-container">
                <div className="container">
                    <div className="content-wrapper">
                        <div className="col-50-percents" style={{ marginBottom: "20px" }}>
                            <div
                                className="product-image-container"
                                style={
                                    {
                                        backgroundImage: `url(${currentImage})`,
                                    }
                                }
                            >
                            </div>

                            <Swiper
                                slidesPerView={5}
                                spaceBetween={10}
                                freeMode={true}
                                style={{
                                    padding: "5px 2px",
                                }}
                            >
                                {productDetail.AnhMoTa?.map((item: any) => {
                                    return (
                                        <SwiperSlide key={item._id}>
                                            <div
                                                className="img-slide-item"
                                                style={{
                                                    backgroundImage: `url(${item.source})`
                                                }}
                                                onClick={() => {
                                                    setCurrentImage(`${item.source}`);
                                                }}
                                            ></div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>

                        <div className="col-50-percents">
                            <div className='product-information'>
                                <div className="product-quantities">
                                    <label className={`label ${productDetail.SoLuong === 0 ? "out-stock-label" : ""}`}>
                                        {productDetail.SoLuong === 0 ? "Hết hàng" : "Còn hàng"}
                                    </label>
                                    <span>{productDetail.SoLuong} sản phẩm</span>
                                </div>

                                <h1 className="product-detail-name">
                                    {productDetail.TenSanPham}
                                </h1>

                                <Rating name="read-only" value={rating} readOnly />

                                <div className="current-price h5">
                                    <span>{numberWithCommas(productDetail.DonGia)} VNĐ</span>
                                </div>

                                <div className="product-action">
                                    <form action="">
                                        <div className="product-quantity clearfix">
                                            <div className="">
                                                <span className="control-label">Số lượng</span>
                                                <input
                                                    type="number"
                                                    className='input-quantity'
                                                    value={currentQuantity}
                                                    onChange={(event) => { onChangeQuantity(event) }}
                                                />
                                            </div>

                                            <div className="add">
                                                <button
                                                    className="btn add-to-cart"
                                                    type="button"
                                                    onClick={() => handleAddToCart(productDetail)}
                                                    disabled={productDetail.SoLuong === 0 ? true : false}
                                                >
                                                    <AddShoppingCartIcon style={{ marginRight: "10px" }} />
                                                    Thêm vào giỏ hàng
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Mô tả" {...a11yProps(0)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <span
                                    className="div"
                                    dangerouslySetInnerHTML={{ __html: `${productDetail.MoTa}` }}
                                >
                                </span>
                            </TabPanel>
                        </Box>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Quickview;