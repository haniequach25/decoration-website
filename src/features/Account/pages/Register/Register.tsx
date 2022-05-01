import React from 'react';
import { useHistory } from 'react-router-dom';
import { saveUser } from '../../../../api/userApi';
import RegisterForm from './RegisterForm/RegisterForm';

const Register: React.FC = () => {

    const history = useHistory();

    const handleSubmit = async (data: any) => {
        const response = await saveUser({ ...data, NgaySinh: Date.parse(data.NgaySinh), _id: 0, TrangThai: 1 })
        if (response) {
            console.log(response);
            history.push("/account/login");
            return true;
        }
        else {
            console.log(response);
            return response;
        }
    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;