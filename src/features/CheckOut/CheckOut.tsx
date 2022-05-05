import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './pages/AddressForm/AddressForm';
import Review from './pages/Review/Review';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const steps = ['Địa chỉ vận chuyển', 'Xem lại đơn hàng'];

function getStepContent(
    step: number,
    currentInfor: any,
    handleNext: any,
    setCurrentInfo: any,
    cartItems: any,
    cartTotalAmount: any,
) {
    switch (step) {
        case 0:
            return <AddressForm
                currentInfor={currentInfor}
                handleNext={handleNext}
                setCurrentInfo={setCurrentInfo}
            />;
        case 1:
            return <Review
                cartItems={cartItems}
                currentInfor={currentInfor}
                cartTotalAmount={cartTotalAmount}
                handleNext={handleNext}
            />;
        default:
            throw new Error('Unknown step');
    }
}

const theme = createTheme();

export default function Checkout() {

    const dispatch = useDispatch();

    const customer: any = useSelector((state: any) => state.user.customer);

    console.log(customer);

    const cartItems: any = useSelector((state: any) => state.cart.cartItems);

    const cartTotalAmount: any = useSelector((state: any) => state.cart.cartTotalAmount);

    const [activeStep, setActiveStep] = React.useState(0);

    const [currentInfor, setCurrentInfo] = React.useState(customer);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    React.useEffect(() => {
        document.title = "Thanh toán"
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BreadCrumb currentPage='checkout' />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Thanh toán
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Cảm ơn bạn đã mua hàng !.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Đơn hàng của bạn đã được gửi lên thành công.
                                    Chúng tôi sẽ kiểm tra đơn hàng và sẽ sớm gửi đến bạn nhanh nhất có thể.
                                </Typography>
                                <footer className="page-footer" style={{ justifyContent: "space-between" }}>
                                    <Link to={"/"} className="account-link">
                                        <span>Trang chủ</span>
                                    </Link>
                                </footer>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(
                                    activeStep,
                                    currentInfor,
                                    handleNext,
                                    setCurrentInfo,
                                    cartItems,
                                    cartTotalAmount,
                                )}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button
                                            onClick={handleBack}
                                            sx={{ mt: 3, ml: 1 }}
                                            style={{ width: "100%" }}
                                        >
                                            Quay lại
                                        </Button>
                                    )}
                                </Box>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}