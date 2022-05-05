import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getReset } from '../../../../api/userApi';
import ForgetPasswordForm from './ForgetPasswordForm/ForgetPasswordForm';
import { Store } from 'react-notifications-component';

const ForgetPassword: React.FC = (props) => {

    const history = useHistory();

    const onSubmit = async (data: any) => {
        const action = await getReset(data)
            .then((resolve) => {
                Store.addNotification({
                    title: "Success!",
                    message: "Sent request successfully. Please check your email for the reset password link !",
                    type: "success",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
                history.push("/account/login");
            })
            .catch((error) => {
                console.log(error);
                Store.addNotification({
                    title: "Failed!",
                    message: error.message,
                    type: "danger",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
            });
    };

    useEffect(() => {
        document.title = "Quên mật khẩu"
    }, []);

    return (
        <div>
            <ForgetPasswordForm onSubmit={onSubmit} />
        </div>
    );
}

export default ForgetPassword;