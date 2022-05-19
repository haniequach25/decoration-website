import { Rating, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import BreadCrumb from '../../../../components/BreadCrumb/BreadCrumb';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box } from '@mui/system';
import ProductSlider from '../../../../components/ProductSlider/ProductSlider';
import { useHistory, useParams } from 'react-router-dom';
import { getAllProduct, getProductByCategory, getProductBySlug, postComment } from '../../../../api/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../../actions/cart';
import CommentForm from './CommentForm';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import moment from 'moment';
import numberWithCommas from '../../../../MoneyFormat';
import { Store } from 'react-notifications-component';
import PropagateLoader from "react-spinners/PropagateLoader";

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


const ProductDetail: React.FC = (props) => {

    const [comments, setComments] = useState([]);

    const [rating, setRating] = useState(0);

    const [value, setValue] = React.useState(0);

    const [currentImage, setCurrentImage] = useState("");

    const [currentQuantity, setCurrentQuantity] = useState(1);

    const [productDetail, setProductDetail]: any = useState({});

    const params: any = useParams();

    const [relateList, setRelateList] = useState([]);

    const dispatch = useDispatch();

    const history = useHistory();

    const customer = useSelector((state: any) => state.user.customer);

    const [productName, setProductName] = useState('Sản phẩm');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response: any = await getProductBySlug(params.slug);

                console.log(response.data);

                setProductDetail(
                    response && response.data
                        ? response.data
                        : {}
                );

                console.log(response.data.TenSanPham, "ten san pham")

                setProductName(response.data.TenSanPham);

                setCurrentImage(
                    response && response.data && response.data.AnhMoTa
                        ? response.data.AnhMoTa[0].source
                        : ""
                )

                const response2: any = await getProductByCategory(response.data.DanhMucSP?._id);

                setRelateList(
                    response2 && response2.result && response2.result.data
                        ? response2.result.data
                        : []
                );

                setComments(response.data.Comments);

                setRating(response.data.averageRating);
            } catch (error) { }
        };
        fetchProduct();
        setLoading(false);
    }, [params.slug]);


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

            history.push("/");
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

    const onSubmitComment = async (data: any) => {
        if (comments.filter((p: any) => { return p.email === data.email }).length > 0) {
            Store.addNotification({
                title: "Failed!",
                message: "Bạn đã đánh giá sản phẩm này rồi !",
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
            return;
        }
        else {
            const params = {
                ...data,
                date: new Date(),
            };
            console.log(params, "params")
            const post = await postComment(productDetail._id, data)
                .then(() => {
                    const fetchProduct = async () => {
                        const response: any = await getAllProduct({
                            code: productDetail.code,
                        });

                        console.log(response);

                        setProductDetail(
                            response && response.result.data
                                ? response.result.data[0]
                                : {}
                        );

                        setComments(response.result.data[0].Comments);

                        setRating(response.result.data[0].averageRating);
                    };
                    fetchProduct();
                    Store.addNotification({
                        title: "Success!",
                        message: "Đánh giá thành công",
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
                    history.push(`/product/${productDetail.slug}`);
                })
                .catch((err) => {
                    Store.addNotification({
                        title: "Failed!",
                        message: err.message,
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
                });
            return;
        }
    };

    useEffect(() => {
        document.title = productName;
    }, [productName]);

    return (
        <div>
            {loading && <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    textAlign: "center",
                    backgroundColor: "#FFF",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 999
                }}
            >
                <PropagateLoader color={"#9ca19e"} size={15} />
            </div>}
            <BreadCrumb prevPage='product' currentPage={`${productDetail.TenSanPham}`} />

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
                                <div className="comments clearfix">
                                    {console.log(comments, "comment")}
                                    {comments.map((item: any) => {
                                        return (
                                            <div className="comment-item" key={item._id}>
                                                <PersonOutlineIcon />
                                                <div className="comment-wrap">
                                                    <div className="comment-meta">
                                                        <span className="comment-infor">
                                                            <span className="comment-created">
                                                                Lúc:
                                                                <span>{moment(item.date).format('lll')}</span>
                                                            </span>
                                                            <span className="comment-postedby">
                                                                Tên:
                                                                <span>{item.commenter}</span>
                                                            </span>
                                                            <span className="comment-rating">
                                                                Đánh giá:
                                                                <span><Rating value={item.rating} readOnly size='small' /></span>
                                                            </span>
                                                        </span>
                                                    </div>

                                                    <div className="comment-content">
                                                        {item.content}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="pagination clearfix pagination-comments">
                                        Đang hiện {comments.length} comments
                                    </div>
                                </div>
                                <h3
                                    className="title-comment"
                                    style={{ fontSize: "20px" }}
                                >
                                    Để lại đánh giá của bạn</h3>
                                <CommentForm customer={customer} onSubmit={onSubmitComment} />
                            </TabPanel>
                        </Box>
                    </div>
                </div>

                <ProductSlider
                    title='Có thể bạn sẽ thích'
                    subTitle=''
                    productList={relateList}
                />
            </div >
        </div >
    );
}

export default ProductDetail;