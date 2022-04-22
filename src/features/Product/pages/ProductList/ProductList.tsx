import { Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import BreadCrumb from '../../../../components/BreadCrumb/BreadCrumb';
import ProductCard from '../../../../components/ProductCard/ProductCard';

const ProductList: React.FC = (props) => {
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
                                        <li>
                                            <Link to={"/"}>Cate 1</Link>
                                        </li>

                                        <li>
                                            <Link to={"/"}>Cate 1</Link>
                                        </li>

                                        <li>
                                            <Link to={"/"}>Cate 1</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="block-categories">
                                <h2 className="title-block">price</h2>
                                <div className="block_content">
                                    <div className="price-menu">
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox color="default" />} label="$0 - $50" />
                                            <FormControlLabel control={<Checkbox color="default" />} label="$50 - $100" />
                                            <FormControlLabel control={<Checkbox color="default" />} label="$100 - $150" />
                                        </FormGroup>
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
                                    >
                                        <MenuItem value={1}>Name, A to Z</MenuItem>
                                        <MenuItem value={2}>Name, Z to A</MenuItem>
                                        <MenuItem value={3}>Price, Low to High</MenuItem>
                                        <MenuItem value={4}>Price, High to Low</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="list-product-container">
                                <ProductCard />
                                <ProductCard />
                                <ProductCard />
                                <ProductCard />
                                <ProductCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;