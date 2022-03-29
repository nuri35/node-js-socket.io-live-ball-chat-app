
import { styled,alpha } from '@mui/material/styles';
import Sidebar from './Sidebar';
import React,{useState,useRef,useCallback,useContext,useEffect} from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FeaturedPost from './FeaturedPost';
import NoRresult from "./NoRresult"
import MuiGrid from '@mui/material/Grid';
import SimpleSnackbar from "./alert"
import { useParams } from "react-router-dom";
import axios from "axios"
import {
  Typography,
  Button,
  Toolbar,
  IconButton,
  Avatar,
    Chip,
    Badge,

} from "@material-ui/core"
import { searchPost } from '../actions/post';

import { AuthContext } from "./Context";
import Nav from "./Nav"
import AuthenticatedNav from "./AuthenticatedNav"

import SearchIcon from '@mui/icons-material/Search';

  
const PostsList =  ()=>{



  return (
      
   <div>Ana sayfa </div>
  
 
  );
}

export default PostsList





    