


import React,{useState,useContext} from 'react'

import { makeStyles } from '@material-ui/core/styles'


import styles from "../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";
import NotAuthenticatedContext from "./NotAuthenticatedContext"
import AuthenticatedNavBtn from "./AuthenticatedNavBtn"
import { AuthContext } from "./Context";





const NewStory = () => {




  
  const {user,ısAuthenticated,setUser,setIsAuthenticated} = useContext(AuthContext)

 
    
    return (

<>
{ısAuthenticated ?
            <AuthenticatedNavBtn >



</AuthenticatedNavBtn>


            : 
          <NotAuthenticatedContext />
          
          }






</>
    
    )
}
export default NewStory