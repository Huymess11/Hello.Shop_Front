import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { Divider } from "@mui/material";

export default function Review() {
  const { payment, delivery, cart } = useSelector((state) => state.user);
  const [inforUser, setInforUser] = React.useState(delivery);
  const payments = [
    { name: "Loại thẻ", detail: "Visa" },
    { name: "Chủ thẻ", detail: `Mr ${inforUser.fullName}` },
    {
      name: "Số thẻ",
      detail: `xxxx-xxxx-xxxx-${payment.cardNumber.slice(-4)}`,
    },
    { name: "Ngày hết hạn", detail: `${payment.expDate}` },
  ];


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
       Tóm tắt đơn hàng
      </Typography>
      <List disablePadding>
        {cart.items.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.name}
              secondary={`Số lượng: x${product.count}`}
            />
            <Typography variant="body2">
              {product.totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Typography>
          </ListItem>
        ))}
        <Divider />
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" />
          <Typography variant="subtitle1">
            {cart.totalCost >= 10000
              ? "Free"
              : (cart.totalCost * 0.05).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {cart.totalCost.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Vận chuyển
          </Typography>
          <Typography gutterBottom>{inforUser.fullName}</Typography>
          <Typography gutterBottom>{inforUser.address}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Chi tiết thanh toán
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
