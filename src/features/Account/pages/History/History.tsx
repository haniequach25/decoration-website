import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../../../components/BreadCrumb/BreadCrumb';
import { Collapse } from "react-collapse";
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeIcon from '@mui/icons-material/Home';
import { Pagination } from '@mui/material';
import { getAllOrder } from '../../../../api/orderApi';
import moment from 'moment';
import { useSelector } from 'react-redux';

interface Props {
    item: any,
}

const CollapseItem: React.FC<Props> = (props) => {

    const [isExpanded, setExpanded] = useState(false);

    return (
        <>
            <div>{props.item._id}</div>
            <div>{moment(props.item.createdAt).format('lll')}</div>
            <div>$ {props.item.TongTien}</div>
            <div>{props.item.GhiChu ? props.item.GhiChu : "None"}</div>
            <div>
                {props.item.DiaChi}
            </div>
            <div className="text-sm-center">
                {props.item.TinhTrangThanhToan === 0 ? "Pending" : "Success"}
            </div>
            <div className="text-sm-center">
                <button
                    className='btn'
                    onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
                >
                    Details
                </button>
            </div>
            <Collapse isOpened={isExpanded}>
                <table className="table table-striped">
                    <thead className="thead-default">
                        <tr>
                            <th className='text-align-center'>Image</th>
                            <th >Name</th>
                            <th className="text-align-center">Price</th>
                            <th className="text-align-center">Quantity</th>
                            <th className="text-align-center">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.item.items?.map((product: any) => {
                            return (
                                <tr key={product.sanpham._id}>
                                    <th scope="row" className='text-align-center'>
                                        <img
                                            src={product.sanpham?.AnhMoTa[0].source}
                                            alt=""
                                        />
                                    </th>
                                    <td valign='middle'>{product.sanpham?.TenSanPham}</td>
                                    <td valign='middle' className="text-align-center">$ {product.sanpham?.DonGia}</td>
                                    <td valign='middle' className="text-align-center">{product.soluong}</td>
                                    <td valign='middle' className="text-align-center">
                                        <span className="label label-pill bright">
                                            $ {product.sanpham.DonGia * product.soluong}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Collapse>
        </>
    );
}

const History: React.FC = (props) => {

    const [orderList, setOrderList] = useState([]);

    const [totalPages, setTotalPages] = useState(0);

    const [totalItems, setTotalItems] = useState(0);

    const customerID: any = useSelector((state: any) => state.user.customer)._id;

    const [filter, setFilter] = useState({
        MaKhachHang: customerID,
        pageNo: 1,
        pageSize: 3,
    });

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response: any = await getAllOrder({
                    ...filter,
                });
                console.log(response.result);
                setTotalPages(
                    response && response.result && response.result.totalPage
                        ? response.result.totalPage
                        : 0
                );
                setOrderList(
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
        fetchList();
    }, [filter]);

    const handlePageChange = (event: any, value: number) => {
        event.preventDefault();
        setFilter({
            ...filter,
            pageNo: value,
        });
    };

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
                    <div>Order reference</div>
                    <div>Date</div>
                    <div>Total price</div>
                    <div>Note</div>
                    <div>Address</div>
                    <div className="text-sm-center">Status</div>
                    <div>&nbsp;</div>
                    {orderList.map((item: any) => {
                        return (
                            <CollapseItem key={item._id} item={item} />
                        );
                    })}
                </div>

                <div className="pagination">
                    <div>Showing {totalItems} items</div>
                    <Pagination count={totalPages} onChange={handlePageChange} />
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

export default History;