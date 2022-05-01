import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const phoneRegExp = /((09|03|07|08|05)+([0-9]{8})\b)/g;

const schema = yup
    .object({
        email: yup
            .string()
            .email("Invalid email format")
            .required("This field is required"),
        DiaChi: yup.string().required("This field is required").min(5),
        SDT: yup
            .string()
            .required("This field is required")
            .matches(phoneRegExp, 'Phone number is not valid'),
        GhiChu: yup
            .string()
    })
    .required();

interface Props {
    currentInfor: any,
    handleNext: any,
    setCurrentInfo: any,
}

const AddressForm: React.FC<Props> = (props) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {
        console.log(data);
        if (props.setCurrentInfo) {
            const response = props.setCurrentInfo(
                {
                    ...props.currentInfor,
                    ...data,
                }
            );
            props.handleNext();
        }
    };


    return (
        <React.Fragment>
            <form
                method="post"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography variant="h6" gutterBottom>
                    Shipping address
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            label="Email..."
                            defaultValue={props.currentInfor.email}
                            fullWidth
                            autoComplete="email"
                            variant="standard"
                            {...register("email")}
                        />
                        <p className="error-field">
                            {errors.email ? errors.email.message : ""}
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="SDT"
                            label="Telephone number..."
                            defaultValue={props.currentInfor.SDT}
                            fullWidth
                            autoComplete="tel"
                            variant="standard"
                            {...register("SDT")}
                        />
                        <p className="error-field">
                            {errors.SDT ? errors.SDT.message : ""}
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="DiaChi"
                            label="Address..."
                            defaultValue={props.currentInfor.DiaChi}
                            fullWidth
                            autoComplete="address"
                            variant="standard"
                            {...register("DiaChi")}
                        />
                        <p className="error-field">
                            {errors.DiaChi ? errors.DiaChi.message : ""}
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="GhiChu"
                            label="Note if you have..."
                            fullWidth
                            autoComplete="note"
                            variant="standard"
                            {...register("GhiChu")}
                            defaultValue={props.currentInfor.GhiChu ? props.currentInfor.GhiChu : ""}
                        />
                        <p className="error-field">
                            {errors.GhiChu ? errors.GhiChu.message : ""}
                        </p>
                    </Grid>
                </Grid>
                <button
                    className='btn btn-secondary'
                    type="submit"
                    style={{ width: "100%" }}
                >
                    {'Next'}
                </button>
            </form>
        </React.Fragment>
    );
}

export default AddressForm;
