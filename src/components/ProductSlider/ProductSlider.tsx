import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from '../ProductCard/ProductCard';

interface Properties {
    title?: string,
    subTitle?: string,
    productList: any,
}

const ProductSlider: React.FC<Properties> = (props) => {

    return (
        <div>
            <div className="container">
                <div className="row box-product">
                    <h4 className="title-block">
                        {props.title || "Unknown"}
                    </h4>

                    <div className="sub-title-block">
                        {props.subTitle || ""}
                    </div>
                </div>

                <Swiper
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        450: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1080: {
                            slidesPerView: 4,
                        },
                    }}
                    spaceBetween={30}
                    freeMode={true}
                    loop={props.productList.length > 4 ? true : false}
                >
                    {props.productList?.map((item: any) => {
                        return (
                            <SwiperSlide key={item._id}>
                                <ProductCard
                                    item={item}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div >
    );
}

export default ProductSlider;