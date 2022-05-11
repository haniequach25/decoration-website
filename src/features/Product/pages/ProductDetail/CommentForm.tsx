import React, { useState } from 'react';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Rating } from '@mui/material';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Store } from 'react-notifications-component';

interface Props {
    onSubmit?: any,
    customer?: any,
}

const schema = yup
    .object({
        commenter: yup.string().required("This field is required"),
        email: yup
            .string()
            .email("Invalid email format")
            .required("This field is required"),
        content: yup.string(),
    })
    .required();

const CommentForm: React.FC<Props> = (props) => {

    const history = useHistory();

    const [rating, setRating] = useState(5);

    const token = useSelector((state: any) => state.user.token);

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
        if (props.onSubmit && token) {
            const response = await props.onSubmit({
                ...data,
                rating: rating,
            });
            console.log(response);
            reset({
                content: "",
            });
            return;
        }
        else {
            history.push("/account/login");
            Store.addNotification({
                title: "Failed!",
                message: "Vui lòng đăng nhập trước khi đánh giá sản phẩm !",
                type: 'danger',
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: false
                }
            })
        }
    };

    return (
        <form
            className="form-horizontal"
            id="commnt_form"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="form-group row">
                <div className="col-lg-3">
                    <label className="control-label" htmlFor="inputFullName">Tên</label>
                </div>
                <div className="col-lg-9">
                    <input
                        type="text"
                        placeholder="Your name"
                        id="inputFullName"
                        className="form-control"
                        defaultValue={props.customer?.TenKhachHang || "Your name"}
                        {...register("commenter")}
                        readOnly
                    />
                    <p className="error-field">
                        {errors.commenter ? errors.commenter.message : ""}
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
                        placeholder="Email"
                        id="inputEmail"
                        className="form-control"
                        defaultValue={props.customer?.email || "abc@gmail.com"}
                        {...register("email")}
                        readOnly
                    />
                    <p className="error-field">
                        {errors.email ? errors.email.message : ""}
                    </p>
                </div>
            </div>

            <div className="form-group row">
                <div className="col-lg-3">
                    <label className="control-label" htmlFor="inputEmail">Đánh giá</label>
                </div>
                <div className="col-lg-9">
                    <Rating onChange={(event, newValue: any) => {
                        if (newValue === null) {
                            setRating(5);
                        }
                        else {
                            setRating(newValue);
                        }
                    }} />
                </div>
            </div>

            <div className="form-group row">
                <div className="col-lg-3">
                    <label className="control-label" htmlFor="inputEmail">Nội dung</label>
                </div>
                <div className="col-lg-9">
                    <textarea
                        placeholder="Write something..."
                        id="inputEmail"
                        className="form-control"
                        {...register("content")}
                        rows={5}
                    />
                    <p className="error-field">
                        {errors.content ? errors.content.message : ""}
                    </p>
                </div>
            </div>

            <div className="form-group row">
                <div className="col-lg-3"></div>
                <div className="col-lg-9 col-lg-offset-3">
                    <button
                        className="btn btn-secondary btn-outline btn-submit-comment-wrapper"
                        name="submitcomment"
                        type="submit"
                        style={{ width: "100%" }}
                    >
                        <span className="btn-submit-comment">Submit</span>
                        <span className="leoblog-cssload-container cssload-speeding-wheel"></span>
                    </button>
                </div>
            </div>
        </form >
    );
}

export default CommentForm;