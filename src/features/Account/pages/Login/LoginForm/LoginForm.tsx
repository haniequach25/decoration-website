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
        password: yup.string().required("This field is required").min(6),
    })
    .required();

interface Props {
    onSubmit: any,
}


const LoginForm: React.FC<Props> = (props) => {

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
            <BreadCrumb currentPage='login' />
            <div className="container">
                <header className="page-header">
                    <h1>
                        Log in your account
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
                        <div className="col-lg-3"></div>
                        <div className="col-lg-9 col-lg-offset-3">
                            <button className="btn btn-secondary btn-outline btn-submit-comment-wrapper" name="submitcomment" type="submit">
                                <span className="btn-submit-comment">Sign in</span>
                                <span className="leoblog-cssload-container cssload-speeding-wheel"></span>
                            </button>
                        </div>
                    </div>
                </form>

                <footer className="page-footer">
                    <Link to={"/account/register"} className="account-link">
                        <ArrowBackIosIcon />
                        <span>Dont have account? Create here!</span>
                    </Link>
                </footer>
            </div>
        </div>
    );
}

export default LoginForm;