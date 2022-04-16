import React from 'react';
import { Link } from 'react-router-dom';
import ProductSlider from './components/ProductSlider/ProductSlider';

function Home() {
    return (
        <div>
            <div className="container">
                <div className="slide-config">
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

            <ProductSlider />
        </div>
    );
}

export default Home;