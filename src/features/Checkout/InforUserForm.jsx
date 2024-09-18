import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useDispatch, useSelector } from "react-redux";
import { updateInformationDelivery } from "../Auth/userSlice";

export default function InforUserForm({ onChange }) {
  const dispatch = useDispatch()
  const {information} = useSelector(state => state.user)
  const [inforUser, setInforUser] = useState(information);

  const handleChangeInformation = (e, field) => {
    const valueChange = e.target.value;
    const newInforDelivery = {
      ...inforUser,
      [field]: valueChange,
    };
    setInforUser(newInforDelivery);
    dispatch(updateInformationDelivery({ newInformation: newInforDelivery }));
  };


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Địa chỉ giao hàng
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Tên đầy đủ"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={inforUser.fullName}
            onChange={(e) => handleChangeInformation(e, "fullName")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="telephoneNumber"
            name="state"
            label="Số điện thoại"
            fullWidth
            variant="standard"
            value={inforUser.telephoneNumber}
            onChange={(e) => handleChangeInformation(e, "telephoneNumber")}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Địa chỉ"
            fullWidth
            autoComplete="shipping address-line"
            variant="standard"
            value={inforUser.address}
            onChange={(e) => handleChangeInformation(e, "address")}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
