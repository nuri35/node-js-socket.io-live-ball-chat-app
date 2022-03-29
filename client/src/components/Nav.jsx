import React,{useState,useEffect,useContext} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { Link } from "react-router-dom";
import Header from "./../components/Header/Header.js";

import Button from "./../components/CustomButtons/Button";


import styles from "./../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";


const useStyles = makeStyles(styles);

export default function SectionNavbars() {

  const classes = useStyles();




  return (
    
    
      <div id="navbar" className={classes.navbar }>
      
        
            <Header
            brand="BLOGİUM"
            
           
            rightLinks={
              <List className={classes.list}>
                    <ListItem className={classes.listItem}>
                  <Button
                       component={Link}
                       to=""
                    className={classes.navLink}
                    
                    color="transparent"
                  >
                  My Story
                  </Button>
                </ListItem>
                
               
              
                <ListItem className={classes.listItem}>
                  <Button
                      component={Link}
                      to="/login"
                    className={classes.navLink}
               
                    color="transparent"
                  >
              
                    
               Sign In
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                     component={Link}
                     to="/register"
                    className={classes.registerNavLink}
           
                    color="github"
                    round
                   
                  >
                   Get Started
                  </Button>
                </ListItem>
           
              </List>
            }
          /> 
        
   
      </div>

  );
}

