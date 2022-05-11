import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { resetPass } from '../../../../api/userApi';

import { Store } from 'react-notifications-component';
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm';
import qs from "qs";

const ResetPassword: React.FC = (props) => {

    const history = useHistory();

    const location = useLocation();

    const onSubmit = async (data: any) => {
        const resetToken = qs.parse(location.search) && qs.parse(location.search.substring(1)).q ? qs.parse(location.search.substring(1)).q : "";
        data = { newPassword: data.newPassword, resetToken: resetToken }
        console.log(qs.parse(location.search.substring(1)).q, "resetToken")
        const action = await resetPass(data)
            .then((resolve: any) => {
                history.push("/account/login");
                Store.addNotification({
                    title: "Success!",
                    message: "Reset mật khẩu thành công !",
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
        document.title = "Reset mật khẩu"
    }, []);

    return (
        <div>
            <ResetPasswordForm onSubmit={onSubmit} />
        </div>
    );
}

export default ResetPassword;