import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from '../ProductCard/ProductCard';

interface Properties {
    title?: string,
    subTitle?: string,
    productList?: [],
}

interface Product {
    id: number,
    name: string,
    price: number,
    imageSrc: string,
}

const arrayList: Product[] = [
    {
        id: 1,
        name: "Chair",
        price: 11.5,
        imageSrc: "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg",
    },

    {
        id: 2,
        name: "Table",
        price: 14.5,
        imageSrc: "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg",
    },

    {
        id: 3,
        name: "Folk",
        price: 15.5,
        imageSrc: "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg",
    },

    {
        id: 4,
        name: "Spoon",
        price: 17.5,
        imageSrc: "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg",
    },

    {
        id: 5,
        name: "Knife",
        price: 20.5,
        imageSrc: "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg",
    },


]

const ProductSlider: React.FC<Properties> = (props) => {

    return (
        <div>
            <div className="container">
                <div className="row box-product">
                    <h4 className="title-block">
                        {props.title || "Unknown"}
                    </h4>

                    <div className="sub-title-block">
                        {props.subTitle || "Unknown"}
                    </div>
                </div>

                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    freeMode={true}
                    loop={true}
                >
                    {arrayList?.map((item) => {
                        return (
                            <SwiperSlide key={item.id}>
                                <ProductCard key={item.id} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div >
    );
}

export default ProductSlider;