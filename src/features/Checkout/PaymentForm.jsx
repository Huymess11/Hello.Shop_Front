import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeInforPayment } from "../Auth/userSlice";

export default function PaymentForm() {
  const dispatch = useDispatch();
  const { payment } = useSelector((state) => state.user);
  const [inforPayment, setInforPayment] = React.useState(payment);
  const handleChangePayment = (e, field) => {
    const valueChange = e.target.value;
    const newInforPayment = {
      ...inforPayment,
      [field]: valueChange,
    };
    setInforPayment(newInforPayment);
    dispatch(changeInforPayment({ newInforPayment }));
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
       Phương thức thanh toán
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Tên trên thẻ"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={inforPayment.cardName}
            onChange={(e) => handleChangePayment(e, "cardName")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Số thẻ"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={inforPayment.cardNumber}
            onChange={(e) => handleChangePayment(e, "cardNumber")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            value={inforPayment.expDate}
            label="Ngày hết hạn"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            onChange={(e) => handleChangePayment(e, "expDate")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            value={inforPayment.cvv}
            autoComplete="cc-csc"
            variant="standard"
            onChange={(e) => handleChangePayment(e, "cvv")}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
