import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from 'swiper';
import Banner1 from "../../assets/h1-slide1.jpg";
import Banner2 from "../../assets/h1-slide2.jpg";
import 'swiper/css';
import 'swiper/css/pagination';

const BannerSlider: React.FC = () => {

    const bannerList = [
        Banner1,
        Banner2,
    ];

    return (
        <div className="container">
            <Swiper
                modules={[Pagination, Autoplay, A11y]}
                loop={true}
                pagination={{ clickable: true }}
                autoplay={
                    {
                        delay: 3000,
                    }
                }
            >
                {bannerList?.map((item: any) => {
                    return (
                        <SwiperSlide key={item._id}>
                            <div
                                className="slide-config"
                                style={{ backgroundImage: `url(${item})` }}
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
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}

export default BannerSlider;