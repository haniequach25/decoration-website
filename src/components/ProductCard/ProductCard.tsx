import React from 'react';
import { Link } from 'react-router-dom';

interface Properties {
    name?: string,
    price?: number,
    imageSrc?: string,
}

const ProductCard: React.FC<Properties> = (props) => {
    return (
        <div className='thumbnail-container'>
            <div className="product-image">
                <Link to={`/product/${"slug"}`}>
                    <img
                        src={props.imageSrc || "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg"}
                        alt="product"
                        className="img-fluid"
                    />
                </Link>
            </div>

            <div className="product-meta">
                <h4 className="product-title">
                    <Link to={`/product/${"slug"}`}>
                        {props.name || "Product name"}
                    </Link>
                </h4>

                <div className="product-price">
                    <div className="price">
                        <span>$</span>
                        <span>{props.price || 0}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;