



import {React,useState,useEffect} from "react";
import axios from "axios"
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import SimpleSnackbar from "./alert"
// or
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Lock from "@material-ui/icons/Lock";

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
import {useDispatch} from "react-redux"
import styles from "./../assets/jss/material-kit-react/views/loginPage";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {useForm} from "react-hook-form"
import image from "./../assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

 

const regSchema = yup.object().shape({
  first:yup.string().min(2).required(),
  last:yup.string().min(2).required(),
  pass:yup.string().min(4).max(20).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "Invalid password").required(),
  confirmPass:yup.string().oneOf([yup.ref("pass")]),
  email:yup.string().email().required(),

}).required()

export default function RegisterPage(props) {
  

  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  


  const { register,trigger, handleSubmit, formState:{ errors }, resetField } = useForm({
   resolver: yupResolver(regSchema)
  });
  
  


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


  const {activation_token} = useParams()




    useEffect(() => {

      if(activation_token){
        const activationEmail = async () =>{
            try{

              const res = await axios.post("http://localhost:5000/auth/verify",{activation_token})
             
              setMessage(res.data.message)
        handleClicks()

            }catch(err){
                console.log(err)
                // err.response.data.msg && setErr( err.response.data.msg) dusunelım
            }
        }
        activationEmail()
      }

    }, [activation_token])

  const onSubmit = async(data)=>{
    
    try{
      const registerVal = await axios.post("http://localhost:5000/auth/register",data)

     
      if(registerVal.data){
        setMessage(registerVal.data.message)
        handleClicks()
      }
   
       resetField("first");
       resetField("last");
       resetField("email");
       resetField("pass");
       resetField("confirmPass");
    }catch(err){
      console.log(err + "hatalı")
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
          <GridContainer justify="center" >
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
               
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Register</h4>
                  
                  </CardHeader>
                 
                  <CardBody>
                  <Box
     
      sx={{
        '& .MuiTextField-root': { m: 1, },
      }}
      noValidate
      autoComplete="off"
    >
                  <form className={classes.form}   onSubmit={handleSubmit(onSubmit)} >

              
                  <TextField id="standard-basic" label="First Name"
                  
                  id="first"
                      name="first"
                      {...register('first')}
                      error={errors.first}
               
                   
                  variant="standard"
                  
                  onKeyUp={() =>{
                    trigger("first")
                  }}
                  fullWidth= "true"
                  InputProps={{
                    type: "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        <People className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  
                  }}
                  helperText={errors?.first?.message}
                   />
  

<TextField id="standard-basic" label="Last Name"
                  
                
                      name="last"
                      {...register('last')}
                      error={errors.last}
               
                   
                  variant="standard"
                  
                  onKeyUp={() =>{
                    trigger("last")
                  }}
                  fullWidth= "true"
                  InputProps={{
                    type: "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        <People className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  
                  }}
                  helperText={errors?.last?.message}
                   />
    
   
               

                  
    <TextField id="standard-basic" label="Email"
                  
                 
                      name="email"
                      {...register('email')}
                      error={errors.email}
               
                   
                  variant="standard"
                  
                  onKeyUp={() =>{
                    trigger("email")
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
                  helperText={errors?.email?.message}
                   />
    
    
                
    <TextField id="standard-basic" label="Password"
                  
                 
                      name="pass"
                      {...register('pass')}
                      error={errors.pass}
               
                   
                  variant="standard"
                  
                  onKeyUp={() =>{
                    trigger("pass")
                  }}
                  fullWidth= "true"
                  InputProps={{
                    type: "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Lock className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  
                  }}
                  helperText={errors?.pass?.message}
                   />
    
   

    <TextField id="standard-basic" label="Repassword"
                  
                
                      name="confirmPass"
                      {...register('confirmPass')}
                      error={errors.confirmPass}
               
                   
                  variant="standard"
                  
                  onKeyUp={() =>{
                    trigger("confirmPass")
                  }}
                  fullWidth= "true"
                  InputProps={{
                    type: "text",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Lock className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  
                  }}
                  helperText={errors?.confirmPass?.message}
                   />
     
   
                     <CardFooter className={classes.cardFooter}>
                    <Button simple type="submit" color="primary" size="lg">
                     Register
                    </Button>
                  </CardFooter>
                  </form>
                  </Box>
                  <CardFooter className={classes.cardFooter}>
              
              <Button simple color="primary" size="md"
               component={Link}
               to="/login"
              >
            Already have an account? 
              </Button>
            </CardFooter>

                  </CardBody>
                 
                
            
               
              </Card>
            </GridItem>
          </GridContainer>
          <SimpleSnackbar   opens={opens} handleCloses={handleCloses} message={message} />
        </div>
        <Footer whiteFont />
      </div>
    </div>

  );
}

