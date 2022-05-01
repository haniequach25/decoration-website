import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../../../actions/user';
import { login } from '../../../../api/userApi';
import LoginForm from './LoginForm/LoginForm';
import { saveToken } from './loginSlice';

const Login: React.FC = (props) => {

    const dispatch = useDispatch();

    const handleSubmit = async (data: any) => {
        const response: any = await login(data);
        if (response && response.token) {
            console.log(response);
            const action = loginUserAction(response);
            dispatch(action);
            saveToken(response);
            return true;
        }
        else {
            return response;
        }
    }

    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;