import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../../../actions/user';
import { login } from '../../../../api/userApi';
import LoginForm from './LoginForm/LoginForm';
import { saveToken } from './loginSlice';
import { Store } from 'react-notifications-component';

const Login: React.FC = (props) => {

    const dispatch = useDispatch();

    const handleSubmit = async (data: any) => {
        const response: any = await login(data)
            .then((resolve: any) => {
                console.log(resolve);
                const action = loginUserAction(resolve);
                dispatch(action);
                saveToken(resolve);
                Store.addNotification({
                    title: "Success!",
                    message: "Đăng nhập thành công !",
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
        document.title = "Đăng nhập"
    }, []);

    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;