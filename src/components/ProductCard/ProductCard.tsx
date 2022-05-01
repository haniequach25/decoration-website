import React from 'react';
import { Link } from 'react-router-dom';

interface Properties {
    item: any,
}

const ProductCard: React.FC<Properties> = (props) => {
    return (
        <div className='thumbnail-container'>
            <div className="product-image">
                <Link to={`/product/${props.item.slug}`}>
                    <img
                        src={props.item.AnhMoTa[0].source || "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg"}
                        alt="product"
                        className="img-fluid"
                    />
                    {props.item.AnhMoTa[1].source ? (
                        <img
                            src={props.item.AnhMoTa[1].source || "https://apollotran.b-cdn.net/demo/at_auros/24-home_default/hummingbird-printed-t-shirt.jpg"}
                            alt="product"
                            className="img-fluid img-fluid-2nd"
                        />
                    ) : ""}
                </Link>
            </div>

            <div className="product-meta">
                <h4 className="product-title">
                    <Link to={`/product/${props.item.slug}`}>
                        {props.item.TenSanPham || "Product name"}
                    </Link>
                </h4>

                <div className="product-price">
                    <div className="price">
                        <span>$ </span>
                        <span>{props.item.DonGia || 0}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;