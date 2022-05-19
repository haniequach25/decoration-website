import React, { useEffect } from 'react';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import emailjs from 'emailjs-com';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import { Store } from 'react-notifications-component';

const phoneRegExp = /((09|03|07|08|05)+([0-9]{8})\b)/g;

const schema = yup
    .object({
        contact_number: yup
            .string()
            .required("This field is required")
            .matches(phoneRegExp, 'Phone number is not valid'),
        from_name: yup.string().required("This field is required").min(2),
        from_email: yup
            .string()
            .trim()
            .email("Invalid email format")
            .required("This field is required"),
        subject: yup.string().required("This field is required").min(6),
        html_message: yup.string().required("This field is required").min(10),
    })
    .required();

const Contact: React.FC = () => {

    const history = useHistory();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any, event: any) => {
        event.preventDefault();
        const action = await emailjs.sendForm('service_c9wkvpa', 'template_lsuzkbc', event.target, 'TZnHFqgbGtJRi1Zof')
            .then((resolve: any) => {
                history.push("/")
                Store.addNotification({
                    title: "Success!",
                    message: "Gửi liên hệ thành công !",
                    type: "success",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: false
                    }
                })
            })
            .catch((error) => {
                Store.addNotification({
                    title: "Failed!",
                    message: error.message,
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
            });
    };

    useEffect(() => {
        document.title = "Liên hệ"
    }, []);

    return (
        <div className='information-form account-container'>
            <BreadCrumb currentPage='contact' />
            <div className="container">
                <header className="page-header">
                    <h1>
                        Liên hệ
                    </h1>
                </header>
                <div className="content-wrapper">
                    <div className="col-50-percents" style={{ marginBottom: "20px" }}>
                        <form
                            className="form-horizontal"
                            id="contact-form"
                            method="post"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="form-group row">
                                <div className="col-lg-3">
                                    <label className="control-label">Số điện thoại</label>
                                </div>
                                <div className="col-lg-9">
                                    <input
                                        type="text"
                                        placeholder="Số điện thoại"
                                        className="form-control"
                                        {...register("contact_number")}
                                    />
                                    <p className="error-field">
                                        {errors.contact_number ? errors.contact_number.message : ""}
                                    </p>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-3">
                                    <label className="control-label">Name</label>
                                </div>
                                <div className="col-lg-9">
                                    <input
                                        type="text"
                                        placeholder="Tên"
                                        className="form-control"
                                        {...register("from_name")}
                                    />
                                    <p className="error-field">
                                        {errors.from_name ? errors.from_name.message : ""}
                                    </p>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-3">
                                    <label className="control-label">Email</label>
                                </div>
                                <div className="col-lg-9">
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        className="form-control"
                                        {...register("from_email")}
                                    />
                                    <p className="error-field">
                                        {errors.from_email ? errors.from_email.message : ""}
                                    </p>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-3">
                                    <label className="control-label">Tiêu đề</label>
                                </div>
                                <div className="col-lg-9">
                                    <input
                                        type={"text"}
                                        placeholder="Tiêu đề"
                                        className="form-control"
                                        {...register("subject")}
                                    />
                                    <p className="error-field">
                                        {errors.subject ? errors.subject.message : ""}
                                    </p>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-lg-3">
                                    <label className="control-label">Nội dung</label>
                                </div>
                                <div className="col-lg-9">
                                    <textarea
                                        rows={6}
                                        placeholder="Nội dung"
                                        className="form-control"
                                        {...register("html_message")}
                                    />
                                    <p className="error-field">
                                        {errors.html_message ? errors.html_message.message : ""}
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
                    </div>

                    <div className="col-50-percents" style={{ marginBottom: "20px" }}>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d658.3112635557724!2d105.85052401153435!3d21.03385158562103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abbe12384aa7%3A0x595317f27fe2548e!2sHanoi%20Old%20Quarter!5e0!3m2!1sen!2s!4v1652953590222!5m2!1sen!2s" height="450"
                            style={{
                                height: "535px",
                                width: "100%",
                                padding: "20px 0 0 20px",
                                display: 'block'
                            }}
                            loading="lazy"></iframe>
                    </div>
                </div>

                <footer className="page-footer" style={{ justifyContent: "space-between" }}>
                    <Link to={"/"} className="account-link">
                        <ArrowBackIosIcon />
                        <span>Trang chủ</span>
                    </Link>
                </footer>
            </div>
        </div>
    );
}

export default Contact;