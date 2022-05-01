import React from 'react';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeIcon from '@mui/icons-material/Home';
import BreadCrumb from '../../../../../components/BreadCrumb/BreadCrumb';
import moment from 'moment';

const phoneRegExp = /((09|03|07|08|05)+([0-9]{8})\b)/g;

const schema = yup
    .object({
        TenKhachHang: yup.string().required("This field is required").min(2),
        email: yup
            .string()
            .email("Invalid email format")
            .required("This field is required"),
        DiaChi: yup.string().required("This field is required").min(5),
        SDT: yup
            .string()
            .required("This field is required")
            .matches(phoneRegExp, 'Phone number is not valid'),
        password: yup.string().required("This field is required").min(6),
        repassword: yup.string().required('This field is required').oneOf([yup.ref('password'), null], 'Password must match'),
    })
    .required();

interface Props {
    onSubmit: any,
    customer: any,
}

const InformationForm: React.FC<Props> = (props) => {


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        console.log(data);
        if (props.onSubmit) {
            const response = await props.onSubmit(data);
            console.log(response);
        }
        // handleAddComment(data);
        // reset({ commenter: "", email: "", content: "" });
    };

    return (
        <div className='information-form account-container'>
            <BreadCrumb prevPage='account' currentPage='information' />
            <div className="container">
                <header className="page-header">
                    <h1>
                        Your personal information
                    </h1>
                </header>

                <form
                    className="form-horizontal"
                    id="commnt_form"
                    method="post"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="form-group row">
                        <div className="col-lg-3">
                            <label className="control-label" htmlFor="inputFullName">Full Name</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                id="inputFullName"
                                className="form-control"
                                defaultValue={props.customer?.TenKhachHang}
                                {...register("TenKhachHang")}
                            />
                            <p className="error-field">
                                {errors.TenKhachHang ? errors.TenKhachHang.message : ""}
                            </p>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-lg-3">
                            <label className="control-label" htmlFor="inputEmail">Email</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type="text"
                                placeholder="Enter your email"
                                id="inputEmail"
                                className="form-control"
                                defaultValue={props.customer?.email}
                                {...register("email")}
                            />
                            <p className="error-field">
                                {errors.email ? errors.email.message : ""}
                            </p>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-lg-3">
                            <label className="control-label" htmlFor="inputDiaChi">Address</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type="text"
                                placeholder="Enter your address"
                                id="inputDiaChi"
                                className="form-control"
                                defaultValue={props.customer?.DiaChi}
                                {...register("DiaChi")}
                            />
                            <p className="error-field">
                                {errors.DiaChi ? errors.DiaChi.message : ""}
                            </p>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-lg-3">
                            <label className="control-label" htmlFor="inputSDT">Telephone</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                itemType={"text"}
                                placeholder="Enter your telephone number"
                                id="inputSDT"
                                className="form-control"
                                defaultValue={props.customer?.SDT}
                                {...register("SDT")}
                            />
                            <p className="error-field">
                                {errors.SDT ? errors.SDT.message : ""}
                            </p>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-lg-3">
                            <label className="control-label" htmlFor="inputNgaySinh">Date of birth</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type={"date"}
                                placeholder='DD-MM-yyyy'
                                id="inputNgaySinh"
                                className="form-control"
                                defaultValue={moment(props.customer?.NgaySinh).format('yyyy-MM-DD')}
                                {...register("NgaySinh")}
                            />
                            <p className="error-field">
                                {errors.NgaySinh ? errors.NgaySinh.message : ""}
                            </p>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-lg-3">
                            <label className="control-label" htmlFor="inputPassword">Password</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type={"password"}
                                placeholder="Enter your password"
                                id="inputPassword"
                                className="form-control"
                                {...register("password")}
                            />
                            <p className="error-field">
                                {errors.password ? errors.password.message : ""}
                            </p>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-lg-3">
                            <label className="control-label" htmlFor="inputRePassword">Confirm password</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type={"password"}
                                placeholder="Confirm your password"
                                id="inputRePassword"
                                className="form-control"
                                {...register("repassword")}
                            />
                            <p className="error-field">
                                {errors.repassword ? errors.repassword.message : ""}
                            </p>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-9 col-lg-offset-3">
                            <button className="btn btn-secondary btn-outline btn-submit-comment-wrapper" name="submitcomment" type="submit">
                                <span className="btn-submit-comment">Update</span>
                                <span className="leoblog-cssload-container cssload-speeding-wheel"></span>
                            </button>
                        </div>
                    </div>
                </form>

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

export default InformationForm;