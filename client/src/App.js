import React,{useState,useEffect,useContext} from 'react'
import { useDispatch } from 'react-redux';
import {BrowserRouter as Router, Routes,Route,Navigate, BrowserRouter } from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles'

import {
    CssBaseline,
    Container,
    Grid,
  
    Toolbar,
    Typography,
    Button,
    IconButton,
    Avatar,
    Chip,
    Badge,
} from "@material-ui/core"

import Room from "./components/Room"
import PageNotFound from "./components/PageNotFound"



  const useStyle = makeStyles((theme) => ({
    root:{
        flexGrow:1,
  
    },
    menuButton:{
        marginRight:theme.spacing(2)
  
    },
    title:{
        flexGrow:1,
        
    },
    container:{
  marginTop:theme.spacing(3)
    }
  }))
  




const App = () => {

 
  
  const classes = useStyle();

    return (
        <>
        <CssBaseline/>

        <Container maxWidth="lg"  >
     
     

<Grid container className={classes.container}>
    <Grid item xs={12}>
  
   <Router>
   
      <Routes>
     
      <Route  path="/" element={<Room  />} />
     
         
            <Route  path="*" element={<PageNotFound />} />
          
           
            </Routes>
           
            </Router>
        

      
    </Grid>
</Grid>
        </Container>
     
        </>
    )
}


export default App
