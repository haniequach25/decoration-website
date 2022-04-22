import { Rating, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import BreadCrumb from '../../../../components/BreadCrumb/BreadCrumb';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box } from '@mui/system';
import ProductSlider from '../../../../components/ProductSlider/ProductSlider';

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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [currentImage, setCurrentImage] = useState("https://apollotran.b-cdn.net/demo/at_auros/36-large_default/the-adventure-begins-framed-poster.jpg")

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
                                <SwiperSlide>
                                    <div
                                        className="img-slide-item"
                                        style={{
                                            backgroundImage: "url(https://apollotran.b-cdn.net/demo/at_auros/36-large_default/the-adventure-begins-framed-poster.jpg)"
                                        }}
                                        onClick={() => {
                                            setCurrentImage("https://apollotran.b-cdn.net/demo/at_auros/36-large_default/the-adventure-begins-framed-poster.jpg");
                                        }}
                                    ></div>
                                </SwiperSlide>

                                <SwiperSlide>
                                    <div
                                        className="img-slide-item"
                                        style={{
                                            backgroundImage: "url(https://apollotran.b-cdn.net/demo/at_auros/37-home_default/the-adventure-begins-framed-poster.jpg)"
                                        }}
                                        onClick={() => {
                                            setCurrentImage("https://apollotran.b-cdn.net/demo/at_auros/37-home_default/the-adventure-begins-framed-poster.jpg");
                                        }}
                                    ></div>
                                </SwiperSlide>
                            </Swiper>
                        </div>

                        <div className="col-50-percents">
                            <div className='product-information'>
                                <div className="product-quantities">
                                    <label className="label">In stock</label>
                                    <span>{100} Items</span>
                                </div>

                                <h1 className="product-detail-name">
                                    Discus Floor and Table
                                </h1>

                                <Rating name="read-only" value={5} readOnly />

                                <div className="current-price h5">
                                    <span>$29.00</span>
                                </div>

                                <div className="product-action">
                                    <form action="">
                                        <div className="product-quantity clearfix">
                                            <div className="">
                                                <span className="control-label">Quantity</span>
                                                <input type="number" className='input-quantity' defaultValue={1} />
                                            </div>

                                            <div className="add">
                                                <button className="btn add-to-cart" type="submit">
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
                                The best is yet to come! Give your walls a voice with a framed poster. This aesthethic, optimistic poster will look great in your desk or in an open-space office. Painted wooden frame with passe-partout for more depth.
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                        </Box>
                    </div>
                </div>

                <ProductSlider />
            </div >
        </div >
    );
}

export default ProductDetail;