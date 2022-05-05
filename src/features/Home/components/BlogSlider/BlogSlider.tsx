import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllBlog } from '../../../../api/blogApi';

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

const BlogSlider: React.FC = () => {

    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        const fetchBlogList = async () => {
            try {
                const response: any = await getAllBlog({
                    pageNo: 1,
                    pageSize: 6,
                    sort: "createdAt",
                });
                console.log(response.result);
                setBlogList(
                    response && response.result && response.result.data
                        ? response.result.data
                        : []
                );
            } catch (error) { }
        };
        fetchBlogList();
    }, []);

    console.log("blogslider", blogList)

    return (
        <div>
            <div className="container">
                <div className="row box-product">
                    <h4 className="title-block">
                        Blog của chúng tôi
                    </h4>

                    <div className="sub-title-block">
                        Khám phá ra các mẹo hay trang trí cho ngôi nhà của bạn
                    </div>
                </div>

                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    freeMode={true}
                    loop={true}
                >
                    {blogList?.map((item: any) => {
                        return (
                            <SwiperSlide key={item._id}>
                                <div className="blog-container">
                                    <div className="left-block">
                                        <div className="blog-image-container">
                                            <Link to={`blog/${item.slug}`}>
                                                <img
                                                    src={item.IDAnh?.source}
                                                    alt={item.TieuDe}
                                                    className="img-fluid" />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="right-block">

                                        <h5 className="blog-title">
                                            <Link to={`blog/${item.slug}`}>
                                                {item.TieuDe}
                                            </Link>
                                        </h5>

                                        <div className="blog-meta">

                                            <span className="cat">
                                                {item.DanhMucBlog?.TenDanhMucBlog}
                                            </span>

                                        </div>
                                        <div className="blog-date">
                                            {moment(item.createdAt).format('lll')}
                                        </div>

                                        <p className="blog-desc">
                                            {item.TomTat}
                                        </p>
                                        <p>
                                            <Link to={`blog/${item.slug}`} className="link-readmore">
                                                + Đọc thêm
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div >
    );
}

export default BlogSlider;