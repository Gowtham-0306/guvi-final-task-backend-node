import { Grid } from "@mui/material";
import styles from "./banner.module.css";

import axios from "axios";
import TextField from "@mui/material/TextField";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { Homepage } from "./homepage";
import { useDispatch } from "react-redux";
import { fetchDataFromAPI } from "./redux/reducers/apidatas";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export function Login({

  modal = false,
  handlemodalClose = () => {},
  modaltype = "login",
}) {
  //  console.log(`${modaltype} hit`);

let dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePresent = location.pathname.includes("/home");

  // console.log(isHomePresent);

  const defaultuserCredentials = {
    Username: "",
    password: "",
    email: "",
    phonenumber: "",
  };
  const [userCredentials, setuserCredentials] = React.useState(
    defaultuserCredentials
  );
  const [redirectToHome, setRedirectToHome] = React.useState(true);


  const [errors, setErrors] = useState({
    Username: false,
    password: false,
    email: false,
    phonenumber: false,
  });





  function handleClose() {}

  function handleregistration(buttontype) {
    if (buttontype === "registration") {
      // console.log(userCredentials);
      if (!userCredentials.Username || !userCredentials.password || !userCredentials.email || !userCredentials.phonenumber) {
        console.error("Please fill in all required fields");
console.log(userCredentials.phonenumber);
        setErrors({
          Username: !userCredentials.Username ,
          password: !userCredentials.password,
          email: !userCredentials.email,
          phonenumber: !userCredentials.phonenumber,
        })



        return; // Prevent further execution
      }






      axios({
        method: "post",
        url: "http://127.0.0.1:3000/createuser",
        data: {
          ...userCredentials,
        },
      }).then((response)=>{


        console.log("User created successfully:", response.data);
      }).catch((error)=>{

        console.error("Error creating user:", error.response.data);
        // You can also check for specific error status codes and handle them differently if needed
        if (error.response.status === 400) {
          console.error("Bad request - Invalid data:", error.response.data);
        }



      });
    
    
    
    
    
    
    
    
    
    } else {
      handlelogin(userCredentials);
    }
  }

  async function handlelogin(userCredentials) {
    //  const navigate = useNavigate();
    if (!userCredentials.Username || !userCredentials.password ) {
      console.error("Please fill in all required fields");
console.log(userCredentials.phonenumber);
      setErrors({
        Username: !userCredentials.Username ,
        password: !userCredentials.password,
       
      })



      return; // Prevent further execution
    }




    console.log(userCredentials);

    const response = await axios({
      method: "post",
      url: "http://127.0.0.1:3000/login",
      data: {
        ...userCredentials,
      },
    });

    try {
      console.log(response.status);

      if (response.status == 200) {
        console.log(`valid userr`);

        const token = response.data.token;

   
        localStorage.setItem("token", token);



        navigate("/home");

        fetchDataFromAPI(dispatch);


      } else if (response.status != 200) {
        alert("invalid creds");
        console.log("invalid user");
      }
    } catch (err) {
      console.log("inv");
    }
  }
  return (
    <>
      <Grid container>
        <Modal
          open={modal}
          onClose={()=>{

            handleClose();

            

          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ height: "500px" }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modaltype === "login"
                ? "Enter your credentials to log in"
                : "Enter your credentials to signup"}
            </Typography>

            <Grid item>
              <DialogContent>
                <TextField
                  autoFocus
                  required
                
                  margin="dense"
                  id="username"
                  name="Username"
                  label="Username"
                  type="email"
                  fullWidth
                  variant="standard"
                  onChange={(event) => {
                    setuserCredentials({
                      ...userCredentials,
                      Username: event.target.value,
                    });
              
                    console.log(event.target.value);

                    if(event.target.value.length > 0){
setErrors({...errors ,
  Username : false
                   });
                    }
                    
                    console.log(userCredentials);
                  }}

                  error={errors.Username}
                  helperText={errors.Username ? 'Username is required' : ''} 


                />

                <TextField
                  autoFocus
                  required
                 
                  
                  margin="dense"
                  id="password"a
                  name="password"
                  label="password"
                  type="password"
                  fullWidth
                  variant="standard"
                  onChange={(event) => {
                    setuserCredentials({
                      ...userCredentials,
                      password: event.target.value,
                    });


                    if(event.target.value.length > 0){
                      setErrors({...errors ,
                        password : false
                                         });
                                          }


                  }}



                  error ={errors.password}
                  helperText={errors.password ? 'password is required' : ''} 
                />

                {modaltype === "registration" && (
                  <>
                    <TextField
                      autoFocus
                      required
                    
                      margin="dense"
                      id="email"
                      name="email"
                      label="email"
                      type="email"
                      fullWidth
                      variant="standard"
                      onChange={(event) => {
                        setuserCredentials({
                          ...userCredentials,
                          email: event.target.value,
                        });

                        if(event.target.value.length > 0){
                          setErrors({...errors ,
                            email : false
                                             });
                                              }


                      }}
                      error ={errors.email}
                      helperText={errors.email ? 'email is required' : ''} 
                    />

                    <TextField
                      autoFocus
                      required
                  
                      margin="dense"
                      id="phonenumber"
                      name="phonenumber"
                      label="phonenumber"
                      type="number"
                      fullWidth
                      variant="standard"
                      onChange={(event) => {
                        setuserCredentials({
                          ...userCredentials,
                          phonenumber: event.target.value,
                        });

                        if(event.target.value.length > 0){
                          setErrors({...errors ,
                            phonenumber : false
                                             });
                                              }
                        
                        // console.log(userCredentials);
                      }}
                      error ={errors.phonenumber}
                      helperText={errors.phonenumber ? 'Phone number is required' : ''} 
                    />
                  </>
                )}
              </DialogContent>
            </Grid>

            <DialogContent>
              <Button
                variant="contained"
                style={{ marginRight: 4 }}
                onClick={(e) => {
                  handleregistration(modaltype);
                }}
              >
                {modaltype === "login" ? "login" : "signup"}
              </Button>
              <Button variant="contained" onClick={()=>{

handlemodalClose();
setErrors({
  Username: false ,
  password: false,
  email: false,
  phonenumber: false ,
})

              }}>
                close
              </Button>
            </DialogContent>
          </Box>
        </Modal>
      </Grid>
    </>
  );
}
