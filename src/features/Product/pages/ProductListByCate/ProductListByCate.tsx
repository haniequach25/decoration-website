import { FormControl, FormControlLabel, MenuItem, Pagination, Radio, RadioGroup, Select } from '@mui/material';
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

    useEffect(() => {
        document.title = "Sản phẩm"
    }, []);

    const [filter, setFilter]: any = useState({
        DanhMucSP: params.id,
        pageNo: 1,
        pageSize: 6,
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
        if (min && max) {
            setFilter({
                ...filter,
                filter: {
                    DonGia: {
                        $gte: min,
                        $lte: max,
                    },
                },
                pageNo: 1,
            });
            history.push({
                pathname: '/product',
                search: qs.stringify({
                    ...filter,
                    ...qs.parse(location.search.substring(1)),
                    filter: {
                        DonGia: {
                            $gte: min,
                            $lte: max,
                        },
                    },
                    pageNo: 1,
                }),
            });
            return;
        }

        if (!min && max) {
            setFilter({
                ...filter,
                filter: {
                    DonGia: {
                        $gte: 0,
                        $lte: max,
                    },
                },
                pageNo: 1,
            });
            history.push({
                pathname: '/product',
                search: qs.stringify({
                    ...filter,
                    ...qs.parse(location.search.substring(1)),
                    filter: {
                        DonGia: {
                            $gte: 0,
                            $lte: max,
                        },
                    },
                    pageNo: 1,
                }),
            });
            return;
        }

        else if (!max && min) {
            setFilter({
                ...filter,
                filter: {
                    DonGia: {
                        $gte: min,
                    },
                },
                pageNo: 1,
            });
            history.push({
                pathname: '/product',
                search: qs.stringify({
                    ...filter,
                    ...qs.parse(location.search.substring(1)),
                    filter: {
                        DonGia: {
                            $gte: min,
                        },
                    },
                    pageNo: 1,
                }),
            });
            return;
        }

        else {
            let tempFilter = filter;
            delete tempFilter.filter;

            let tempLocation = qs.parse(location.search.substring(1));
            delete tempLocation.filter;

            setFilter({
                ...tempFilter,
                pageNo: 1,
            });
            history.push({
                pathname: '/product',
                search: qs.stringify({
                    ...tempFilter,
                    ...tempLocation,
                    pageNo: 1,
                }),
            });
        }
        return;
    }

    return (
        <div>
            <BreadCrumb currentPage='product' />

            <div className="list-content">
                <div className="container">
                    <div className="list-content-wrapper">
                        <div id="left-column" className="sidebar">
                            <div className="block-categories">
                                <h2 className="title-block">Danh mục</h2>
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
                                <h2 className="title-block">Giá</h2>
                                <div className="block_content">
                                    <div className="price-menu">
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel
                                                value="default"
                                                control={<Radio color="default" />}
                                                label="Mặc định"
                                                onClick={() => {
                                                    selectPrice(null, null);
                                                }}
                                            />

                                            <FormControlLabel
                                                value="cheap"
                                                control={<Radio color="default" />}
                                                label="<= 100 nghìn"
                                                onClick={() => {
                                                    selectPrice(null, 100000);
                                                }}
                                            />

                                            <FormControlLabel
                                                value="medium"
                                                control={<Radio color="default" />}
                                                label="100 - 500 nghìn"
                                                onClick={() => {
                                                    selectPrice(100000, 500000);
                                                }}
                                            />

                                            <FormControlLabel
                                                value="high"
                                                control={<Radio color="default" />}
                                                label="500 nghìn - 1 triệu "
                                                onClick={() => {
                                                    selectPrice(500000, 1000000);
                                                }}
                                            />

                                            <FormControlLabel
                                                value="expensive"
                                                control={<Radio color="default" />}
                                                label=">= 1 triệu"
                                                onClick={() => {
                                                    selectPrice(1000000, null);
                                                }}
                                            />
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="content-wrapper">
                            <div id="list-product-sort">
                                <span className='sort-by'>Lọc theo: </span>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Age"
                                        defaultValue={0}
                                    >
                                        <MenuItem value={0} onClick={() => { selectSort("_id") }}>Mặc định</MenuItem>
                                        <MenuItem value={1} onClick={() => { selectSort("TenSanPham") }}>Tên, A - Z</MenuItem>
                                        <MenuItem value={2} onClick={() => { selectSort("-TenSanPham") }}>Tên, Z - A</MenuItem>
                                        <MenuItem value={3} onClick={() => { selectSort("DonGia") }}>Giá, thấp - cao</MenuItem>
                                        <MenuItem value={4} onClick={() => { selectSort("-DonGia") }}>Giá, cao - thấp</MenuItem>
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
                                <div>Đang hiện {totalItems} sản phẩm</div>
                                <Pagination page={Number.parseInt(filter.pageNo)} count={totalPages} onChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductListByCate;