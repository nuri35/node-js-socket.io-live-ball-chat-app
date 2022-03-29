
import React,{useState,useEffect} from "react";
import GitHub from '@mui/icons-material/GitHub';
import Google from '@mui/icons-material/Google';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
 
  Typography,
 TextField,


} from "@material-ui/core"
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import SimpleSnackbar from "./alert"

import Header from "./Header/Header.js";
import HeaderLinks from "./Header/HeaderLinks.js";
import Footer from "./Footer/Footer.js";

import GridContainer from "./Grid/GridContainer.js";
import GridItem from "./Grid/GridItem.js";
import Button from "./CustomButtons/Button.js";
import Card from "./Card/Card.js";
import CardBody from "./Card/CardBody.js";
import CardHeader from "./Card/CardHeader.js";
import CardFooter from "./Card/CardFooter.js";
import CustomInput from "./CustomInput/CustomInput.js";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {useForm} from "react-hook-form"
import styles from "./../assets/jss/material-kit-react/views/loginPage";
import axios from "axios"
import image from "./../assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function ForgetPassword(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;



  const [message,setMessage] = useState("") 
  const [opens, setOpens] = useState(false);

  const handleClicks = (data) => {
    
    setOpens(true);
  };

  const handleCloses = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpens(false);
  };

  
const regSchema = yup.object().shape({

  
  Email:yup.string().email().required(),

}).required()
  
const { register,trigger, handleSubmit, formState:{ errors }, resetField } = useForm({
  resolver: yupResolver(regSchema)
 });

 
const onSubmit = async(data)=>{

  try{
    

    const forgetPass = await axios.post("http://localhost:5000/auth/forgetPass",data)


      setMessage(forgetPass.data.message)
      handleClicks()
  
    resetField("Email")
 


  }catch(err){
console.log(err)
  }


 
}


  return (
  
  <div>
      <Header
        absolute
        color="transparent"
        brand="BLOGİUM"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Forgetten Password</h4>
                  
                  </CardHeader>
                 
                  <CardBody>

                  <TextField id="standard-basic" label="Email"
                  
                  id="Email"
                      name="Email"
                      {...register('Email')}
                      error={errors.Email}
               
                   
                  variant="standard"
                  
                  onKeyUp={() =>{
                    trigger("Email")
                  }}
                  fullWidth= "true"
                  InputProps={{
                    type: "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  
                  }}
                  helperText={errors?.Email?.message}
                   />
                   
                
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple type="submit" color="primary" size="lg">
                     Send a Mail 
                    </Button>
                  </CardFooter>
                 
                
            
                </form>
                
                <SimpleSnackbar   opens={opens} handleCloses={handleCloses} message={message} />
              </Card>
              
            </GridItem>
            
          </GridContainer>
        
        </div>
       
      </div>
    </div>

  );
}

