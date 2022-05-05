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

    useEffect(() => {
        document.title = "Trang chủ"
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
                                Decór
                            </div>
                        </div>

                        <div className="tp-caption  h1-style-3" data-x="240" data-y="475" data-transition="fade" >
                            <span>Chỉ từ</span> 50 nghìn VNĐ
                        </div>

                        <div className="tp-caption  h1-style-4" data-x="240" data-y="545" data-transition="fade">
                            <Link className="slide-btn btn btn-contained" to="/product" title="Shop Now">Xem ngay</Link>
                        </div>
                    </div>
                </div>
            </div>

            <ProductSlider
                title={"Sản phẩm mới"}
                subTitle={"Hãy xem các mặt hàng mới trong cửa hàng của chúng tôi."}
                productList={newsList}
            />

            <div className="container">
                <div
                    className="slide-config"
                    style={{ backgroundImage: `url(https://ld-wp73.template-help.com/woocommerce/prod_22039/v2/wp-content/uploads/2021/05/Rectangle-5.png)` }}
                >
                    <div className="slide-content-center">
                        <a
                            target="_blank"
                            href="https://www.youtube.com/watch?v=HnYX87jwG3I" className="play-button">
                            <span>
                                <PlayArrowIcon className='play-button-icon' />
                            </span>
                        </a>
                        <div className="tp-caption  h1-style-2" data-x="240" data-y="360" data-transition="fade" >
                            <div className="caption-contain" >
                                Tô điểm thế giới trong ngôi nhà của bạn
                            </div>
                        </div>

                        <div className="sub-title-block" data-x="240" data-y="475" data-transition="fade" >
                            Cách để trang trí hộp quà
                        </div>
                    </div>
                </div>
            </div>

            <ProductSlider
                title={"Sản phẩm nổi bật"}
                subTitle={"Tìm một nơi lý tưởng phù hợp với sở thích của bạn với các sự lựa chọn tuyệt vời của chúng tôi về đèn treo, đèn tường, đèn sàn và đèn bàn"}
                productList={featuresList}
            />

            <div className="container">

            </div>

            <BlogSlider />
        </div>
    );
}

export default Home;