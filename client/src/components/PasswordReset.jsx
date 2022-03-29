


import {React,useEffect,useState,useContext} from "react";

import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import SimpleSnackbar from "./alert"

import TextField from '@mui/material/TextField';

import Lock from "@material-ui/icons/Lock";

import Header from "./Header/Header.js";
import HeaderLinks from "./Header/HeaderLinks.js";

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
import styles from "./../assets/jss/material-kit-react/views/loginPage";


import image from "./../assets/img/bg7.jpg";
import axios from "axios";
const useStyles = makeStyles(styles);


function PasswordReset(props){
     
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const {history, ...rest } = props;

    const {activatTokenForPass} = useParams()





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
  
    
    password:yup.string().min(4).max(20).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "Invalid password").required(),
    resetPassword:yup.string().oneOf([yup.ref("password")]),
  }).required()
    
  const { register,trigger, handleSubmit, formState:{ errors }, resetField } = useForm({
    resolver: yupResolver(regSchema)
   });
  

  //  useEffect(() => {

  //   if(activatTokenForPass){
  //     const activationEmail = async () =>{
  //         try{

  //           const res = await axios.post("http://localhost:5000/auth/verify",{activation_token})
           
  //           setMessage(res.data.message)
  //     handleClicks()

  //         }catch(err){
  //             console.log(err)
  //             // err.response.data.msg && setErr( err.response.data.msg) dusunelım
  //         }
  //     }
  //     activationEmail()
  //   }

  // }, [activation_token])

   
   const onSubmit =async (data)=>{
   
        const passwordValue = {
            token:activatTokenForPass,
            value:data
        }

        try{

            const resetPassword = await axios.post("http://localhost:5000/auth/resetPassword",passwordValue)

            resetField("password")
            resetField("resetPassword")

            handleClicks()
            setMessage(resetPassword.data.message)


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
                          <h4>Reset Password</h4>
                        
                        </CardHeader>
                       
                        <CardBody>
      
                        <TextField id="standard-basic" label="Password"
                        
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
                         

                         <TextField id="standard-basic" label="Password again"
                        
                        id="resetPassword"
                            name="resetPassword"
                            {...register('resetPassword')}
                            error={errors.resetPassword}
                     
                         
                        variant="standard"
                        
                        onKeyUp={() =>{
                          trigger("resetPassword")
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
                        helperText={errors?.resetPassword?.message}
                         />
                      
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                          <Button simple type="submit" color="primary" size="lg">
                           Submit
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

export default PasswordReset