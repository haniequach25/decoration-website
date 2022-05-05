import React from 'react';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeIcon from '@mui/icons-material/Home';
import BreadCrumb from '../../../../../components/BreadCrumb/BreadCrumb';

const schema = yup
    .object({
        newPassword: yup.string().required("This field is required").min(6),
        reNewpassword: yup
            .string()
            .required('This field is required')
            .oneOf([yup.ref('newPassword'), null], 'Password must match'),
    })
    .required();

interface Props {
    onSubmit: any,
}


const ResetPasswordForm: React.FC<Props> = (props) => {

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
    };

    return (
        <div className='information-form account-container'>
            <BreadCrumb currentPage='login' />
            <div className="container">
                <header className="page-header">
                    <h1>
                        Đặt lại mật khẩu
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
                            <label className="control-label" htmlFor="inputPassword">Password</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type={"password"}
                                placeholder="Enter your new password"
                                id="inputPassword"
                                className="form-control"
                                {...register("newPassword")}
                            />
                            <p className="error-field">
                                {errors.newPassword ? errors.newPassword.message : ""}
                            </p>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-lg-3">
                            <label className="control-label" htmlFor="inputRePassword">Xác nhận password</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type={"password"}
                                placeholder="Confirm new password"
                                id="inputRePassword"
                                className="form-control"
                                {...register("reNewpassword")}
                            />
                            <p className="error-field">
                                {errors.reNewpassword ? errors.reNewpassword.message : ""}
                            </p>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-9 col-lg-offset-3">
                            <button className="btn btn-secondary btn-outline btn-submit-comment-wrapper" name="submitcomment" type="submit">
                                <span className="btn-submit-comment">Submit</span>
                                <span className="leoblog-cssload-container cssload-speeding-wheel"></span>
                            </button>
                        </div>
                    </div>
                </form>

                <footer className="page-footer" style={{ justifyContent: "space-between" }}>
                    <Link to={"/"} className="account-link">
                        <span>Trang chủ</span>
                    </Link>
                </footer>
            </div>
        </div>
    );
}

export default ResetPasswordForm;