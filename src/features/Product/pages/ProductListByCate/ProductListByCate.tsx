import { Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Pagination, Radio, RadioGroup, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { getAllCatProduct, getAllProduct } from '../../../../api/productApi';
import BreadCrumb from '../../../../components/BreadCrumb/BreadCrumb';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import qs from "qs"; // qs là cái gì đấy query string vl thư hiện query-string thì phải import la import qs from "query-string"

const ProductListByCate: React.FC = (props) => {

    const location = useLocation();

    const history = useHistory();

    const [productList, setProductList] = useState([]);

    const [catesProduct, setCatesProduct] = useState([]);

    const [totalPages, setTotalPages] = useState(0);

    const [totalItems, setTotalItems] = useState(0);

    const params: any = useParams();

    console.log(params);

    const [filter, setFilter]: any = useState({
        DanhMucSP: params.id,
        pageNo: 1,
        pageSize: 3,
        sort: "_id",
        ...qs.parse(location.search.substring(1)),
    })

    useEffect(() => {
        history.push({
            pathname: `/product/category/${params.id}`,
            search: qs.stringify({
                ...filter,
                ...qs.parse(location.search.substring(1)),
                DanhMucSP: params.id,
            }),
        });
    }, [location.search.substring(1)]);

    useEffect(() => {
        const fetchCateList = async () => {
            try {
                const response: any = await getAllCatProduct();
                console.log("new", response.result.data);
                setCatesProduct(
                    response && response.result && response.result.data
                        ? response.result.data
                        : []
                );
            } catch (error) { }
        };
        fetchCateList();
    }, []);

    useEffect(() => {
        const fetchNewsList = async () => {
            try {
                const response: any = await getAllProduct({
                    ...filter,
                    ...qs.parse(location.search.substring(1)),
                    DanhMucSP: params.id,
                });

                console.log("fetch", {
                    ...filter
                })
                console.log("productlist", response.result.data);
                setProductList(
                    response && response.result && response.result.data
                        ? response.result.data
                        : []
                );
                setTotalPages(
                    response && response.result && response.result.totalPage
                        ? response.result.totalPage
                        : 0
                );
                setTotalItems(
                    response && response.result && response.result.data
                        ? response.result.data.length
                        : 0
                );
            } catch (error) { }
        };
        fetchNewsList();
    }, [filter, params, location.search.substring(1)]);

    const handlePageChange = (event: any, value: any) => {
        event.preventDefault();
        setFilter({
            ...filter,
            pageNo: value,
        });
        history.push({
            pathname: `/product/category/${params.id}`,
            search: qs.stringify({
                ...filter,
                ...qs.parse(location.search.substring(1)),
                pageNo: value,
            }),
        });
    };

    const selectSort = (value: any) => {
        setFilter({
            ...filter,
            sort: value,
        });
        history.push({
            pathname: `/product/category/${params.id}`,
            search: qs.stringify({
                ...filter,
                ...qs.parse(location.search.substring(1)),
                sort: value,
            }),
        });
    }

    const selectPrice = (min?: any, max?: any) => {
        if (!min) {
            setFilter({
                ...filter,
                filter: {
                    DonGia: {
                        $gte: 0,
                        $lte: max,
                    },
                },
            });
            history.push({
                pathname: `/product/category/${params.id}`,
                search: qs.stringify({
                    ...filter,
                    ...qs.parse(location.search.substring(1)),
                    filter: {
                        DonGia: {
                            $gte: 0,
                            $lte: max,
                        },
                    },
                }),
            });
        }

        else if (!max) {
            setFilter({
                ...filter,
                filter: {
                    DonGia: {
                        $gte: min,
                    },
                },
            });
            history.push({
                pathname: `/product/category/${params.id}`,
                search: qs.stringify({
                    ...filter,
                    ...qs.parse(location.search.substring(1)),
                    filter: {
                        DonGia: {
                            $gte: min,
                        },
                    },
                }),
            });
        }

        else {
            setFilter({
                ...filter,
                filter: {
                    DonGia: {
                        $gte: min,
                        $lte: max,
                    },
                },
            });
            history.push({
                pathname: `/product/category/${params.id}`,
                search: qs.stringify({
                    ...filter,
                    ...qs.parse(location.search.substring(1)),
                    filter: {
                        DonGia: {
                            $gte: min,
                            $lte: max,
                        },
                    },
                }),
            });
        }
    }

    return (
        <div>
            <BreadCrumb currentPage='product' />

            <div className="list-content">
                <div className="container">
                    <div className="list-content-wrapper">
                        <div id="left-column" className="sidebar">
                            <div className="block-categories">
                                <h2 className="title-block">Categories</h2>
                                <div className="block_content">
                                    <ul className="category-top-menu">
                                        {catesProduct?.map((cate: any) => {
                                            return (
                                                <li key={cate?._id}>
                                                    <Link to={{
                                                        pathname: `/product/category/${cate._id}`,
                                                        search: "?pageNo=1&pageSize=3&sort=_id",
                                                    }}>{cate.TenDanhMucSP}</Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>

                            <div className="block-categories">
                                <h2 className="title-block">price</h2>
                                <div className="block_content">
                                    <div className="price-menu">
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value="cheap"
                                                control={<Radio color="default" />}
                                                label="$0 - $10"
                                                onClick={() => {
                                                    selectPrice(null, 10);
                                                }}
                                            />

                                            <FormControlLabel
                                                value="medium"
                                                control={<Radio color="default" />}
                                                label="$10 - $20"
                                                onClick={() => {
                                                    selectPrice(10, 20);
                                                }}
                                            />

                                            <FormControlLabel
                                                value="expensive"
                                                control={<Radio color="default" />}
                                                label=">= $20"
                                                onClick={() => {
                                                    selectPrice(20, null);
                                                }}
                                            />
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="content-wrapper">
                            <div id="list-product-sort">
                                <span className='sort-by'>Sort by: </span>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Age"
                                        defaultValue={0}
                                    >
                                        <MenuItem value={0} onClick={() => { selectSort("_id") }}>Default</MenuItem>
                                        <MenuItem value={1} onClick={() => { selectSort("TenSanPham") }}>Name, A to Z</MenuItem>
                                        <MenuItem value={2} onClick={() => { selectSort("-TenSanPham") }}>Name, Z to A</MenuItem>
                                        <MenuItem value={3} onClick={() => { selectSort("DonGia") }}>Price, Low to High</MenuItem>
                                        <MenuItem value={4} onClick={() => { selectSort("-DonGia") }}>Price, High to Low</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="list-product-container">
                                {productList?.map((item: any) => {
                                    console.log(item)
                                    return (
                                        <ProductCard
                                            key={item?._id}
                                            item={item}
                                        />
                                    );
                                })}
                            </div>

                            <div className="pagination">
                                <div>Showing {totalItems} items</div>
                                <Pagination count={totalPages} onChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductListByCate;