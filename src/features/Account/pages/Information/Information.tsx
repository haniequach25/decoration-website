import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateUserAction } from '../../../../actions/user';
import { saveUser } from '../../../../api/userApi';
import { getMe, saveToken } from '../Login/loginSlice';
import InformationForm from './InformationForm/InformationForm';

function parseJwt(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

const Information: React.FC = () => {

    const history = useHistory();

    const dispatch = useDispatch();

    const customer: any = useSelector((state: any) => state.user.customer);

    const handleSubmit = async (data: any) => {
        const response = await saveUser({
            ...data,
            NgaySinh: Date.parse(data.NgaySinh),
            _id: customer._id,
        })
            .then((data: any) => {
                const token: any = {
                    customer: parseJwt(data.token).customer,
                    token: data.token,
                }
                const action = updateUserAction(token);
                dispatch(action);
                saveToken(token);
            })
    }

    return (
        <div>
            <InformationForm onSubmit={handleSubmit} customer={customer} />
        </div>
    );
}

export default Information;