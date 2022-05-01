import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Logo from '../Logo/Logo';
import { getAllCatProduct } from '../../api/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction } from '../../actions/user';
import { removeToken } from '../../features/Account/pages/Login/loginSlice';
import { Popover } from '@mui/material';
import CartDrawer from '../CartDrawer/CartDrawer';

function Header() {

    const [catesProduct, setCatesProduct] = useState([]);

    const [wordEntered, setWordEntered] = useState("");

    const [openWithHeader, setOpenWithHeader] = React.useState(false);

    const dispatch = useDispatch();

    const history = useHistory();

    const token: any = useSelector((state: any) => state.user.token);

    const name: any = useSelector((state: any) => state.user.customer);

    useEffect(() => {
        const fetchNewsList = async () => {
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
        fetchNewsList();
    }, []);

    const handleLogout = () => {
        const action = logoutUserAction();
        dispatch(action);
        removeToken();
        history.push("/");
    }


    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleFilter = (event: any) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord)
    };

    const handleEnter = (e: any) => {
        if (e.key === 'Enter') {
            history.push({
                pathname: '/product',
                search: `?keywords=${wordEntered}&pageNo=1&pageSize=3`
            });
            setWordEntered("");
        }
    }

    const handleSearch = () => {
        history.push({
            pathname: '/product',
            search: `?keywords=${wordEntered}&pageNo=1&pageSize=3`
        });
        setWordEntered("");
    }

    return (
        <header id="header">
            <div className="container">
                <div className="header-top">
                    <Logo />
                </div>

                <div className="header-bottom">
                    <ul className='header-navbar'>
                        <li className='dropdown-parent'><Link to="/">Home</Link></li>
                        <li className='dropdown-parent dropdown'>
                            <Link
                                to={{
                                    pathname: "/product",
                                    search: "?pageNo=1&pageSize=3&sort=_id",
                                }}
                            >Product<KeyboardArrowDownIcon /></Link>
                            <div className="dropdown-menu level1">
                                <div className="row">
                                    <ul>
                                        {catesProduct?.map((item: any) => {
                                            return (
                                                <li key={item?._id}>
                                                    <Link to={{
                                                        pathname: `/product/category/${item._id}`,
                                                        search: "?pageNo=1&pageSize=3&sort=_id",
                                                    }}>{item.TenDanhMucSP}</Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className='dropdown-parent'><Link to="/blog">Blog</Link></li>
                        <li className='dropdown-parent'><Link to="/">Contact</Link></li>
                    </ul>

                    <ul className="header-user-interaction">
                        <button className="search-block" onClick={handleClick}>
                            <SearchOutlinedIcon className='icon-block' />
                        </button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            disableAutoFocus
                            disableEnforceFocus
                        >
                            <div className="productsearch-content">
                                <div className="leoproductsearch-result">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Search"
                                        onChange={handleFilter}
                                        onKeyDown={handleEnter}
                                    />
                                </div>
                                <button
                                    className="btn btn-default button button-small"
                                    onClick={handleSearch}
                                >
                                    <SearchOutlinedIcon className='icon-block' />
                                </button>
                            </div>
                        </Popover>
                        <div className="person-block dropdown-parent dropdown">
                            <PersonOutlineOutlinedIcon className='icon-block' />
                            <div className="dropdown-menu level1">
                                <div className="row">
                                    {token ? (
                                        <ul>
                                            <AccountCircleIcon />User: {name?.TenKhachHang}
                                            <li>
                                                <SettingsIcon />
                                                <Link to="/account">My account</Link>
                                            </li>
                                            <li>
                                                <LogoutIcon />
                                                <Link to="/" onClick={() => { handleLogout(); }}>Logout</Link>
                                            </li>
                                        </ul>
                                    ) : (
                                        <ul>
                                            <li>
                                                <LoginIcon />
                                                <Link to="/account/login">Login</Link>
                                            </li>
                                            <li>
                                                <VpnKeyIcon />
                                                <Link to="/account/register">Register</Link>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="cart-block" onClick={() => setOpenWithHeader(true)}>
                            <ShoppingCartOutlinedIcon className='icon-block' />
                        </div>
                    </ul>
                </div>
            </div>

            <CartDrawer open={openWithHeader} setOpen={setOpenWithHeader} />
        </header >
    );
}

export default Header;