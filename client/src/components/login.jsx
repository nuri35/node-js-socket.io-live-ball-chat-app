

import {React,useEffect,useState,useContext} from "react";

import Google from '@mui/icons-material/Google';

import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import SimpleSnackbar from "./alert"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Lock from "@material-ui/icons/Lock";

import Header from "./Header/Header.js";
import HeaderLinks from "./Header/HeaderLinks.js";
import Footer from "./Footer/Footer.js";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {useForm} from "react-hook-form"
import GridContainer from "./Grid/GridContainer.js";
import GridItem from "./Grid/GridItem.js";
import Button from "./CustomButtons/Button.js";
import Card from "./Card/Card.js";
import CardBody from "./Card/CardBody.js";
import CardHeader from "./Card/CardHeader.js";
import CardFooter from "./Card/CardFooter.js";
import CustomInput from "./CustomInput/CustomInput.js";
import { AuthContext } from "./Context";
import styles from "./../assets/jss/material-kit-react/views/loginPage";

import image from "./../assets/img/bg7.jpg";
import axios from "axios";

const useStyles = makeStyles(styles);

 function Login(props) {
   
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const {history, ...rest } = props;

  
const regSchema = yup.object().shape({

  password:yup.string().min(4).max(20).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "Invalid password").required(),
  
  Email:yup.string().email().required(),

}).required()
  
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

 const authContext = useContext(AuthContext)


 const onSubmit = async(data)=>{

  try{
    const login = await axios.post("http://localhost:5000/auth/login",data,{
      withCredentials: true
    })


    if(login.status == 200 && login.data.isAuthenticated == true){
      
      authContext.setUser(login.data.user)
      authContext.setIsAuthenticated(!authContext.ısAuthenticated)
      props.history.push("/")
    }else{
      handleClicks()
      setMessage(login.data.message)
       
     resetField("Email");
     resetField("password");
    }
   
  
  }catch(err){
    console.log(err)
  
  }


 }



const googleLogin = () => {
  window.open("http://localhost:5000/auth/google", "_self");
};

 
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
                <form className={classes.form}  onSubmit={handleSubmit(onSubmit)}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                    <div className={classes.socialLine}>
                     
                    
                      <Button
                       startIcon={<Google />}
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={googleLogin}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>

                     
                    
                    
                     
                    
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
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
  

  <TextField id="standard-basic" label="password"
                  
                  id="password"
                      name="password"
                      {...register('password')}
                      error={errors.password}
               
                   
                  variant="standard"
                  
                  onKeyUp={() =>{
                    trigger("password")
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
                  helperText={errors?.password?.message}
                   />




                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                  <Button simple type="submit" color="primary" size="lg">
                    Get Started
                    </Button>
                  </CardFooter>
              
                  <CardFooter className={classes.cardFooter}>
            
                    <Button simple color="primary" size="md"
                     component={Link}
                     to="/register"
                     
                    >
                  Don&apos;t have an account?
                    </Button>
                  </CardFooter>

                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="md"
                     component={Link}
                     to="/forget-password"
                    >
                   Forgetten Password?
                    </Button>
                  </CardFooter>
            
                </form>
                
              
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



export default Login