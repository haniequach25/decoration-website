import React, { useEffect } from 'react';
import { Store } from 'react-notifications-component';
import { useHistory } from 'react-router-dom';
import { saveUser } from '../../../../api/userApi';
import RegisterForm from './RegisterForm/RegisterForm';

const Register: React.FC = () => {

    const history = useHistory();

    const handleSubmit = async (data: any) => {
        const response = await saveUser({ ...data, NgaySinh: Date.parse(data.NgaySinh), _id: 0, TrangThai: 1 })
            .then((resolve: any) => {
                history.push("/account/login");
                Store.addNotification({
                    title: "Success!",
                    message: "Đăng ký thành công !",
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
    }

    useEffect(() => {
        document.title = "Đăng ký"
    }, []);

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;