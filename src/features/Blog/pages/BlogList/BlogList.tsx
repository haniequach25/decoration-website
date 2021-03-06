import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { getAllBlog } from '../../../../api/blogApi';
import BreadCrumb from '../../../../components/BreadCrumb/BreadCrumb';
import moment from 'moment';
import PropagateLoader from "react-spinners/PropagateLoader";

const BlogList: React.FC = () => {

    const match = useRouteMatch();

    const [loading, setLoading] = useState(true);

    const [blogList, setBlogList] = useState([]);

    const [totalPages, setTotalPages] = useState(0);

    const [totalItems, setTotalItems] = useState(0);

    const [filter, setFilter] = useState({
        pageNo: 1,
        pageSize: 6,
    })

    useEffect(() => {
        document.title = "Blog"
    }, []);

    useEffect(() => {
        const fetchBlogList = async () => {
            try {
                const response: any = await getAllBlog({
                    ...filter,
                });
                console.log(response.result);
                setTotalPages(
                    response && response.result && response.result.totalPage
                        ? response.result.totalPage
                        : 0
                );
                setBlogList(
                    response && response.result && response.result.data
                        ? response.result.data
                        : []
                );
                setTotalItems(
                    response && response.result && response.result.data
                        ? response.result.data.length
                        : 0
                );
            } catch (error) { }
        };
        fetchBlogList();
        setLoading(false);
    }, [filter]);

    const handlePageChange = (event: any, value: number) => {
        event.preventDefault();
        setFilter({
            ...filter,
            pageNo: value,
        });
    };



    return (
        <div>
            {loading && <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    textAlign: "center",
                    backgroundColor: "#FFF",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 999
                }}
            >
                <PropagateLoader color={"#9ca19e"} size={15} />
            </div>}
            <BreadCrumb currentPage='blog' />

            <div className="list-content">
                <div className="container">
                    <div className="blog-listing">
                        <h1 className="section-title blog-lastest-title">
                            Blog m???i nh???t
                        </h1>

                        <div className="blog-list-grid">
                            {blogList.map((item: any) => {
                                return (
                                    <div className="blog-item" key={item._id}>
                                        <div className="blog-image-container">
                                            <img
                                                src={item.IDAnh.source}
                                                title={item.TieuDe}
                                                alt={item.TieuDe}
                                                className="img-fluid"
                                            />
                                        </div>

                                        <div className="blog-short-information">
                                            <h4 className="title">
                                                <Link to={`${match.url}/${item.slug}`}>
                                                    {item.TieuDe}
                                                </Link>
                                            </h4>

                                            <div className="blog-desc">
                                                {item.TomTat}
                                            </div>

                                            <div className="blog-bottom">
                                                <span className="created">
                                                    <time className="date">
                                                        {moment(item.createdAt).format('lll')}
                                                    </time>
                                                </span>

                                                <span className="nbcomment">
                                                    <span className="icon-comment"> {item.Comments.length} Comment</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="pagination">
                            <div>??ang hi???n {totalItems} blog</div>
                            <Pagination count={totalPages} onChange={handlePageChange} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default BlogList;