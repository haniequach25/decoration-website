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
        email: yup
            .string()
            .trim()
            .email("Invalid email format")
            .required("This field is required"),
    })
    .required();

interface Props {
    onSubmit: any,
}


const ForgetPasswordForm: React.FC<Props> = (props) => {

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
                        Quên mật khẩu
                    </h1>
                </header>
                <h6
                    style={{ textAlign: "center", fontWeight: "lighter" }}
                >
                    Hãy nhập email tài khoản để yêu cầu reset mật khẩu !
                </h6>
                <form
                    className="form-horizontal"
                    id="commnt_form"
                    method="post"
                    onSubmit={handleSubmit(onSubmit)}
                >
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
                                {...register("email")}
                            />
                            <p className="error-field">
                                {errors.email ? errors.email.message : ""}
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
                    <Link to={"/account/register"} className="account-link">
                        <ArrowBackIosIcon />
                        <span>Không có tài khoản? Tạo ngay</span>
                    </Link>
                    <Link to={"/account/login"} className="account-link">
                        <span>Đăng nhập</span>
                    </Link>
                </footer>
            </div>
        </div>
    );
}

export default ForgetPasswordForm;