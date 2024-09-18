import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useDispatch, useSelector } from "react-redux";
import { checkoutCompleted } from "../Auth/userSlice";
import { toast } from "react-toastify";
import InforUserForm from "./InforUserForm";
import productApi from "../../apis/productApi";

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout() {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const { payment, delivery, cart, information } = useSelector((state) => state.user);
  
  const generateRandomNumberString = () => {
    var randomNumber = Math.floor(Math.random() * 10000000); // Tạo số ngẫu nhiên từ 0 đến 9999999
    var randomNumberString = randomNumber.toString().padStart(7, '0'); // Chuyển số thành chuỗi và thêm các số 0 phía trước nếu cần
    return randomNumberString;
  }

  const codeBill = generateRandomNumberString();
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep + 1 === steps.length) {
      dispatch(checkoutCompleted());
      toast.success("Check out successfully !");
      const checkoutProduct = async () => {
        const data = {
          info: {
            code_Bill: codeBill,
            email: information.email,
            // email: 'user@mail.com',
            name: delivery.fullName,
            telephoneNumber: delivery.telephoneNumber,
            address_to: delivery.address
          },
          cart_list: cart.items
        }
        console.log(data)
        const response = await productApi.checkoutProduct(data)
        console.log(response)
      }
      checkoutProduct()
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <InforUserForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  };


  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <Container className="min-h-[calc(100vh-var(--height-header))] mt-16 pt-8 " component="main" maxWidth="sm">
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
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
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
              Cảm ơn bạn đã đặt hàng của bạn.
              </Typography>
              <Typography variant="subtitle1">
              Số đơn đặt hàng của bạn là #{codeBill}. Chúng tôi đã gửi email đơn đặt hàng của bạn xác nhận và sẽ gửi cho bạn thông tin cập nhật khi đơn đặt hàng của bạn được vận chuyển.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Trở lại
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 2, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Đặt hàng" : "Tiếp theo"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
