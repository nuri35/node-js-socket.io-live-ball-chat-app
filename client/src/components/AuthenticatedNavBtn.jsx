import React,{useState,useEffect,useContext} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import AddPostForm from "./AddPostForm"


import Menu from '@mui/material/Menu';
import { Link } from "react-router-dom";
import Header from "./Header/Header.js";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from "../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";
import { MailOutlined ,BellOutlined,LogoutOutlined} from '@ant-design/icons';
import Badge from '@mui/material/Badge';
import axios from "axios"
import { AuthContext } from "./Context";


const useStyles = makeStyles(styles);

export default function SectionNavbars() {

  const {user,ısAuthenticated,setUser,setIsAuthenticated} = useContext(AuthContext)

const nameSlice = ()=>{
  const sliceName =  user.name.charAt(0) + user.surname.charAt(0)   ;
  return sliceName
}
 
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
 

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  
  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    setOpen(true);
  
  };

  const handleClose = () => {
   
    setOpen(false);
  };
  

  const logoutHandle = async()=>{

    window.open("http://localhost:5000/auth/logout", "_self");
 

}


  const settings = [{ad:"Profile",link:""}, {ad:"Stats",link:""},{ad:"Stories",link:""},{ad:"Write a story",link:""},{ad:"Blogs",link:""}];
  
  return (
    
    <>
      <div id="navbar" className={classes.navbar }>
      
        
            <Header
            brand="BLOGİUM"
            
           
            rightLinks={
              <List className={classes.list}>
                  
                <Box sx={{ flexGrow: 0 }}>
                <ListItem className={classes.listItem}>
               
                <Button variant="outlined" size="small" color="success" onClick={handleOpen}>
                Publish
                </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
               
                <MenuItem>
        <IconButton size="small" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <BellOutlined />
          </Badge>
        </IconButton>
      
      </MenuItem>
   
                </ListItem>
           
                <ListItem className={classes.listItem}>
        
            <Tooltip title="More" >
            <IconButton onClick={handleOpenUserMenu}  sx={{ p: 0 }}>
              {user.avatar ?
            <Avatar src={user.avatar}>
            
            </Avatar>
            : 
            <Avatar src={user.avatar} ></Avatar>
          
          }
             
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting.ad}</Typography>
                </MenuItem>
              ))}
              
              <MenuItem onClick={logoutHandle} >
             
         
         <Typography textAlign="center" > <LogoutOutlined /> Logout</Typography>
           
                </MenuItem>
             
            </Menu>
         
                </ListItem>
                </Box> 

              </List>
            }
          /> 
        
      
                 
    
                 
                 
      </div>
          <AddPostForm  open={open} handleClose={handleClose} />
          </>
  );
}

