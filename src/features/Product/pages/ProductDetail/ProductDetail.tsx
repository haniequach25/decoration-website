import { Rating, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import BreadCrumb from '../../../../components/BreadCrumb/BreadCrumb';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box } from '@mui/system';
import ProductSlider from '../../../../components/ProductSlider/ProductSlider';
import { useHistory, useParams } from 'react-router-dom';
import { getProductByCategory, getProductBySlug } from '../../../../api/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../../actions/cart';
import { setCartSlice } from '../../../CheckOut/cartSlice';

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
                    <Typography>{children}</Typography>
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


const ProductDetail: React.FC = (props) => {
    const [value, setValue] = React.useState(0);

    const [currentImage, setCurrentImage] = useState("");

    const [currentQuantity, setCurrentQuantity] = useState(1);

    const [productDetail, setProductDetail]: any = useState({});

    const params: any = useParams();

    const [relateList, setRelateList] = useState([]);

    const dispatch = useDispatch();

    const history = useHistory();

    const cart = useSelector((state: any) => state.cart.cartItems);

    console.log("cart", cart);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response: any = await getProductBySlug(params.slug);

                console.log(response.data);

                setProductDetail(
                    response && response && response.data
                        ? response.data
                        : {}
                );

                setCurrentImage(
                    response && response && response.data && response.data.AnhMoTa
                        ? response.data.AnhMoTa[0].source
                        : ""
                )

                const response2: any = await getProductByCategory(response.data.DanhMucSP?._id);

                setRelateList(
                    response2 && response2.result && response2.result.data
                        ? response2.result.data
                        : []
                );
            } catch (error) { }
        };
        fetchProduct();
    }, [params.slug]);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const onChangeQuantity = (event: any) => {
        if (event.target.value > productDetail.SoLuong) {
            setCurrentQuantity(productDetail.SoLuong);
        }

        else if (event.target.value < 1) {
            setCurrentQuantity(1);
        }

        else {
            setCurrentQuantity(event.target.value);
        }
    }

    console.log(currentQuantity);

    const handleAddToCart = async (product: any) => {
        if (product.SoLuong > 0) {

            const action = await addToCart({ ...product, quantity: currentQuantity })

            dispatch(action);

            setCartSlice(cart);

            history.push("/");
        }
    }

    return (
        <div>
            <BreadCrumb prevPage='product' currentPage={`${"product name"}`} />

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
                                        {productDetail.SoLuong === 0 ? "Out stock" : "In stock"}
                                    </label>
                                    <span>{productDetail.SoLuong} Items</span>
                                </div>

                                <h1 className="product-detail-name">
                                    {productDetail.TenSanPham}
                                </h1>

                                <Rating name="read-only" value={5} readOnly />

                                <div className="current-price h5">
                                    <span>$ {productDetail.DonGia}</span>
                                </div>

                                <div className="product-action">
                                    <form action="">
                                        <div className="product-quantity clearfix">
                                            <div className="">
                                                <span className="control-label">Quantity</span>
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
                                                    Add to cart
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
                                    <Tab label="Description" {...a11yProps(0)} />
                                    <Tab label="Reviews" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <span
                                    className="div"
                                    dangerouslySetInnerHTML={{ __html: `${productDetail.MoTa}` }}
                                >
                                </span>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                        </Box>
                    </div>
                </div>

                <ProductSlider
                    title='YOU MIGHT ALSO LIKE'
                    subTitle=''
                    productList={relateList}
                />
            </div >
        </div >
    );
}

export default ProductDetail;