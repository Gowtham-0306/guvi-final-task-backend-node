
import { AppBar , Divider, Toolbar , Grid ,Button} from "@mui/material"
import { Login } from "./loginpage"
import { useState } from "react";
import React from 'react';
import { useLocation  ,useNavigate} from 'react-router-dom';
export function Navbar({handleLoginSuccess = ()=>{} , handleOpen = ()=>{} , handleClose = ()=>{} ,}){
    const [open, setOpen] = React.useState(false);
    const [type, settype] = React.useState("login");

    const navigate = useNavigate();
    const location = useLocation();
    const isHomePresent = location.pathname.includes('/home');
    function handleClose (){
        setOpen(false)
        settype("login")


    }
    
    function handleOpen (islogoutbtn = Boolean){
        console.log(islogoutbtn );
if(islogoutbtn){

navigate("/");

}

      if(!islogoutbtn){
        setOpen(true);
      } 



    }

    function handleType(){
        setOpen(true);
settype("registration");
// console.log(type);


    }
    return(<>
    
    <div>
    <AppBar style={{backgroundColor : "#5cb55c"} }>

<Toolbar>

<Grid container 

style={{  margin: "0 auto" }}

flexDirection={"row"}
direction="row"
justifyContent="space-evenly"
alignItems={"center"}


 

>

    <Grid item>
        <Grid>

        
 <img src="https://www.guvi.in/web-build/images/guvi-logo-new.2c41fef696b49959c1033ef2290bd2b9.png"  style={{maxHeight : 50}} />
 </Grid>
    </Grid>
    <Grid item >
        <Grid container flexDirection={"row"}
        alignItems={"center"}
        justifyContent="space-evenly"
        marginRight={3}
        >

{ isHomePresent && (
<h1></h1>

)
}


        <Button variant="contained" onClick={()=>{
            handleOpen(isHomePresent)
        }}> {isHomePresent ? "Log out" : "Log in" } </Button>


  
<Button variant="contained" onClick={()=>{
    handleType()
}}>Sign UP</Button>
        </Grid>
   
   
    </Grid>





</Grid>


</Toolbar>
<Login modal ={open} handlemodalClose = {handleClose} modaltype= {type} handleLoginSuccess={handleLoginSuccess} />

    </AppBar>
    </div> 
    </>)
}