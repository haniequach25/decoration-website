import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function Header() {
    return (
        <header id="header">
            <div className="container">
                <div className="header-top">
                    <div className="logo-container">

                        <a href="https://apollotran.com/demo/at_auros/">
                            <img className="logo img-fluid" src="https://apollotran.com/demo/at_auros/img/at-auros-logo-1557240632.jpg" alt="At Auros" />
                        </a>

                    </div>
                </div>

                <div className="header-bottom">
                    <ul className='header-navbar'>
                        <li className='dropdown-parent'><Link to="/">Home</Link></li>
                        <li className='dropdown-parent dropdown'>
                            <Link to="/">Product<KeyboardArrowDownIcon /></Link>
                            <div className="dropdown-menu level1">
                                <div className="row">
                                    <ul>
                                        <li>
                                            <Link to="/">Cate 1</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Cate 2</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Cate 3</Link>
                                        </li>
                                        <li>
                                            <Link to="/">Cate 4</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className='dropdown-parent'><Link to="/">Blog</Link></li>
                        <li className='dropdown-parent'><Link to="/">Contact</Link></li>
                    </ul>

                    <ul className="header-user-interaction">
                        <div className="search-block">
                            <SearchOutlinedIcon className='icon-block' />
                        </div>
                        <div className="person-block">
                            <PersonOutlineOutlinedIcon className='icon-block' />
                        </div>
                        <div className="cart-block">
                            <ShoppingCartOutlinedIcon className='icon-block' />
                        </div>
                    </ul>
                </div>
            </div>
        </header >
    );
}

export default Header;