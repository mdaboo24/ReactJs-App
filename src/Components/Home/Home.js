import React, { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  TextField,
  IconButton,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  Button,
  FormControl,
  Dialog,
  DialogContent,
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Stack,
} from "@mui/material";
import config from "../../Common/config.json";
import axios from "axios";
import Add from "@mui/icons-material/Add";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Clear from "@mui/icons-material/Clear";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import styles from "./Home.module.css";
import TableDisplay from "../../Widgets/TableDisplay/TableDisplay";
import { Edit } from "@mui/icons-material";

function Home() {
  /************States**********/

  const [showPassword, setShowPassword] = useState(false);
  const [CustomerList, setCustomerList] = useState([]);
  const [ErrorsList, setErrorsList] = useState([]);
  const [IsEdit, setIsEdit] = useState(false);
  const [CustomerId, setCustomerId] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [OpenAlert, setOpenAlert] = useState(false);

  /************UseEffects**********/
  useEffect(() => {
    getCustomerList();
  }, []);

  /************Functions**********/

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const getCustomerList = () => {
    axios({
      url: config.baseURL + config.CustomerRoute + "customer",
      method: "GET",
      //   headers: {
      //     authorization: "your token comes here",
      //   },
      //data: formData,
    })
      .then((res) => {
        setCustomerList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTextboxChange = (Event, Field) => {
    switch (Field.toLowerCase()) {
      case "first name":
        setFirstname(Event.target.value);
        break;
      case "last name":
        setLastname(Event.target.value);
        break;
      case "email":
        setEmail(Event.target.value);
        break;
      case "password":
        setPassword(Event.target.value);
        break;
      default:
      // code block
    }
  };

  const CreateCustomerClick = () => {
    const data = {
      Firstname: Firstname,
      Lastname: Lastname,
      Email: Email,
      Password: Password,
    };
    console.log(data);
    axios({
      url: config.baseURL + config.CustomerRoute + "customer",
      method: "POST",
      //   headers: {
      //     authorization: "your token comes here",
      //   },
      data: data,
    })
      .then((res) => {
        getCustomerList();
        clearForm();
      })
      .catch((err) => {
        setErrorsList(err.response.data.error_message);
        setOpenAlert(true);
      });
  };

  const clearForm = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");

    setIsEdit(false);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
    setErrorsList(null);
  };

  const EditClientClick = (id) => {
    //Search Customer in existing customer list and assign to a state call selected customer.
    const customer = CustomerList.filter((cust) => cust.id == id);
    setCustomerId(customer[0].id);
    setFirstname(customer[0].Firstname);
    setLastname(customer[0].Lastname);
    setEmail(customer[0].Email);
    setPassword(customer[0].Password);
    console.log(customer);
    setIsEdit(true);
  };

  const EditProcess = () => {
    const data = {
      Firstname: Firstname,
      Lastname: Lastname,
      Email: Email,
      Password: Password,
    };

    axios({
      url: config.baseURL + config.CustomerRoute + "customer/" + CustomerId,
      method: "PUT",
      //   headers: {
      //     authorization: "your token comes here",
      //   },
      data: data,
    })
      .then((res) => {
        console.log(res);
        getCustomerList();
        clearForm();
      })
      .catch((err) => {
        console.log(err);
        setErrorsList(err.response.data.error_message);
        setOpenAlert(true);
      });
  };

  const DeleteClientClick = (id) => {
    axios({
      url: config.baseURL + config.CustomerRoute + "customer/" + id,
      method: "DELETE",
    })
      .then((res) => {
        getCustomerList();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} md={5}>
          <Card>
            <CardContent>
              <Grid container>
                <Grid xs={12} className={styles.CardHeader}>
                  Customer
                </Grid>
                <Grid xs={12} className={styles.grid_padding}>
                  <TextField
                    id="outlined-basic1"
                    label="First name"
                    variant="outlined"
                    fullWidth
                    value={Firstname}
                    onChange={(event) =>
                      handleTextboxChange(event, "first name")
                    }
                  />
                </Grid>
                <Grid xs={12} className={styles.grid_padding}>
                  <TextField
                    id="outlined-basic2"
                    label="Last name"
                    variant="outlined"
                    fullWidth
                    value={Lastname}
                    onChange={(event) =>
                      handleTextboxChange(event, "last name")
                    }
                  />
                </Grid>
                <Grid xs={12} className={styles.grid_padding}>
                  <TextField
                    id="outlined-basic3"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={Email}
                    onChange={(event) => handleTextboxChange(event, "email")}
                  />
                </Grid>
                <Grid xs={12} className={styles.grid_padding}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      value={Password}
                      onChange={(event) =>
                        handleTextboxChange(event, "password")
                      }
                    />
                  </FormControl>
                </Grid>
                {!IsEdit ? (
                  <>
                    <Grid xs={12} className={styles.grid_padding}>
                      <Button
                        variant="contained"
                        startIcon={<Add />}
                        fullWidth
                        onClick={CreateCustomerClick}
                      >
                        Add Customer
                      </Button>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid xs={12} className={styles.grid_padding}>
                      <Button
                        variant="contained"
                        startIcon={<Edit />}
                        fullWidth
                        onClick={EditProcess}
                      >
                        Update Customer
                      </Button>
                    </Grid>
                  </>
                )}
                <Grid xs={12} className={styles.grid_padding}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<Clear />}
                    fullWidth
                    onClick={() => {
                      clearForm();
                    }}
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={7}>
          <Card sx={{ minHeight: { md: "400px" }, maxHeight: { md: "400px" } }}>
            <CardContent>
              {CustomerList.length > 0 ? (
                <TableDisplay
                  data={CustomerList}
                  onDelete={DeleteClientClick}
                  onEdit={EditClientClick}
                ></TableDisplay>
              ) : (
                <>
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <CircularProgress
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                      color="secondary"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={OpenAlert}
        fullWidth={true}
        maxWidth={"sm"}
        onClose={() => handleAlertClose()}
      >
        <DialogContent>
          <Alert severity="error">
            <AlertTitle>Error while saving!</AlertTitle>
            {Array.isArray(ErrorsList) &&
              ErrorsList.length > 0 &&
              ErrorsList.map((row) => <li>{row}</li>)}
          </Alert>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Home;
