import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BlogSlider from './components/BlogSlider/BlogSlider';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { getAllProduct } from '../../api/productApi';

const Home: React.FC = () => {

    const [newsList, setNewsList] = useState([]);

    const [featuresList, setFeaturesList] = useState([]);

    useEffect(() => {
        const fetchNewsList = async () => {
            try {
                const response: any = await getAllProduct({
                    pageNo: 1,
                    pageSize: 6,
                    sort: "-_id"
                });
                console.log("new", response.result.data);
                setNewsList(
                    response && response.result && response.result.data
                        ? response.result.data
                        : []
                );
            } catch (error) { }
        };
        fetchNewsList();
    }, []);

    useEffect(() => {
        const fetchFeaturesList = async () => {
            try {
                const response: any = await getAllProduct({
                    pageNo: 1,
                    pageSize: 6,
                    sort: "-SoLuongDaBan"
                });
                console.log("feature", response.result.data);
                setFeaturesList(
                    response && response.result && response.result.data
                        ? response.result.data
                        : []
                );
            } catch (error) { }
        };
        fetchFeaturesList();
    }, []);

    return (
        <div>
            <div className="container">
                <div
                    className="slide-config"
                    style={{ backgroundImage: `url(https://ld-wp73.template-help.com/woocommerce/prod_22039/v2/wp-content/uploads/2021/05/Rectangle.png)` }}
                >
                    <div className="slide-content">
                        <div className="tp-caption  h1-style-2" data-x="240" data-y="360" data-transition="fade" >
                            <div className="caption-contain" >
                                Etna
                            </div>
                        </div>

                        <div className="tp-caption  h1-style-3" data-x="240" data-y="475" data-transition="fade" >
                            <span>From</span> $650.00
                        </div>

                        <div className="tp-caption  h1-style-4" data-x="240" data-y="545" data-transition="fade">
                            <Link className="slide-btn btn btn-contained" to="/" title="Shop Now">Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>

            <ProductSlider
                title={"New Arrivals"}
                subTitle={"Take a look at new items in our shop."}
                productList={newsList}
            />

            <div className="container">
                <div
                    className="slide-config"
                    style={{ backgroundImage: `url(https://ld-wp73.template-help.com/woocommerce/prod_22039/v2/wp-content/uploads/2021/05/Rectangle-5.png)` }}
                >
                    <div className="slide-content-center">
                        <Link to={"/"} className="play-button">
                            <span>
                                <PlayArrowIcon className='play-button-icon' />
                            </span>
                        </Link>
                        <div className="tp-caption  h1-style-2" data-x="240" data-y="360" data-transition="fade" >
                            <div className="caption-contain" >
                                Doing Their Own Hands
                            </div>
                        </div>

                        <div className="sub-title-block" data-x="240" data-y="475" data-transition="fade" >
                            How to Decorate a Birthday Gift Box!
                        </div>
                    </div>
                </div>
            </div>

            <ProductSlider
                title={"Trending Product"}
                subTitle={"Find a bright ideal to suit your taste with our great selection of suspension, wall, floor and table lights."}
                productList={featuresList}
            />

            <div className="container">

            </div>

            <BlogSlider />
        </div>
    );
}

export default Home;