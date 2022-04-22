import React, { useState } from 'react';
import BreadCrumb from '../../../../components/BreadCrumb/BreadCrumb';
import { Collapse } from "react-collapse";
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeIcon from '@mui/icons-material/Home';

const History: React.FC = (props) => {

    const [isExpanded, setExpanded] = useState(false);

    return (
        <div className='history-list account-container'>
            <BreadCrumb prevPage='account' currentPage='history' />
            <div className="container">
                <header className="page-header">
                    <h1>
                        Order history
                    </h1>
                </header>

                <h6>Here are the orders you've placed since your account was created.</h6>

                <div className="table-bordered">
                    <div className="thead-default">
                        <div>Order reference</div>
                        <div>Date</div>
                        <div>Total price</div>
                        <div>Note</div>
                        <div>Address</div>
                        <div className="text-sm-center">Status</div>
                        <div>&nbsp;</div>
                    </div>
                    <div>
                        <div>PDEMHQLCP</div>
                        <div>04/22/2022</div>
                        <div>$28.51</div>
                        <div>Payments by check</div>
                        <div>
                            40B Lac Trung street, Hanoi city, Vietnam country
                        </div>
                        <div className="text-sm-center">
                            Pending
                        </div>
                        <div className="text-sm-center">
                            <button
                                className='btn'
                                onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
                            >
                                Details
                            </button>
                        </div>
                    </div>
                </div>
                <Collapse isOpened={isExpanded}>
                    <table className="table table-striped table-bordered table-labeled hidden-sm-down">
                        <thead className="thead-default">
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th className="hidden-md-down">Quantity</th>
                                <th className="hidden-md-down">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <img
                                        src={"	https://apollotran.b-cdn.net/demo/at_auros/24-large_default/hummingbird-printed-t-shirt.jpg"}
                                        alt=""
                                    />
                                </th>
                                <td>04/22/2022</td>
                                <td className="text-xs-right">$ 28.51</td>
                                <td className="hidden-md-down">5</td>
                                <td>
                                    <span className="label label-pill bright">
                                        $ 100
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Collapse>

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

export default History;