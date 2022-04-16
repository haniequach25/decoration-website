import React from 'react';
import ProductCard from '../../../../components/ProductCard/ProductCard';

interface Properties {
    title?: string,
    subTitle?: string,
    productList?: [],
}

interface Product {
    name: string,
    price: number,
    imageSrc: string,
}

const arrayList = [
    {
        name: "Chair",
        price: 11.5,
        imageSrc: "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg",
    },

    {
        name: "Table",
        price: 14.5,
        imageSrc: "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg",
    },

    {
        name: "Folk",
        price: 15.5,
        imageSrc: "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg",
    },

    {
        name: "Spoon",
        price: 17.5,
        imageSrc: "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg",
    },

    {
        name: "Knife",
        price: 20.5,
        imageSrc: "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg",
    },


]

const ProductSlider: React.FC<Properties> = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

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

                    <div className="block-content">
                        <div className="owl-carousel">
                            <div className="owl-wrapper-outer">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductSlider;