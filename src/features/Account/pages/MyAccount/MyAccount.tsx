import React from 'react';
import BreadCrumb from '../../../../components/BreadCrumb/BreadCrumb';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeIcon from '@mui/icons-material/Home';
import { logoutUserAction } from '../../../../actions/user';
import { useDispatch } from 'react-redux';
import { removeToken } from '../Login/loginSlice';

const MyAccount: React.FC = () => {

    const match = useRouteMatch();

    const dispatch = useDispatch();

    const history = useHistory();

    const handleLogout = () => {
        const action = logoutUserAction();
        dispatch(action);
        removeToken();
        history.push("/");
    }

    return (
        <div className='account-container'>
            <BreadCrumb currentPage='account' />
            <div className="container">
                <header className="page-header">
                    <h1>
                        Your account
                    </h1>
                </header>

                <div className="account-content">
                    <Link className="col-md-6 col-sm-6 col-xs-12" id="identity-link" to={`${match.url}/information`}>
                        <span className="link-item">
                            <AccountCircleIcon />
                            Information
                        </span>
                    </Link>
                    <Link className="col-md-6 col-sm-6 col-xs-12" id="history-link" to={`${match.url}/history`}>
                        <span className="link-item">
                            <DateRangeIcon />
                            Order history and details
                        </span>
                    </Link>
                </div>

                <div className="account-logout">
                    <Link
                        className=""
                        id="identity-link"
                        to="/"
                        onClick={() => { handleLogout(); }}
                    >
                        Sign out
                    </Link>
                </div>

                <footer className="page-footer">
                    <Link to={"/account"} className="account-link">
                        <ArrowBackIosIcon />
                        <span>Back to your account</span>
                    </Link>
                    <Link to={"/"} className="account-link">
                        <HomeIcon />
                        <span>Home</span>
                    </Link>
                </footer>
            </div>
        </div>
    );
}

export default MyAccount;