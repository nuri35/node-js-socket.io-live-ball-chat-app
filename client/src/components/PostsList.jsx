
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
const sidebar = {
  
    title: 'Think',
    description:
      'A man"s homeland is wherever he prospers. Aristophanes.',
     
    tags: [
      { title: 'Sport', url: 'Sport' },
      { title: 'Fitness', url: 'Fitness' },
      { title: 'Programming ', url: 'Programming' },
      { title: 'Health ', url: 'Health' },
      { title: 'Science ', url: 'Science' },
      { title: 'Culturel ', url: 'Culturel' },
      { title: 'Technology ', url: 'Technology' },
      { title: 'Business ', url: 'Business' },
      { title: 'Politics', url: 'Politics' },
      { title: 'Foods', url: 'Foods' },
      { title: 'Other', url: 'Other' },
      { title: 'Self-improvement', url: 'Self-improvement' },
      { title: 'Nature', url: 'Nature' },

    ],
   
  };


  const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    
    ...theme.typography.body2,
    '& [role="separator"]': {
      margin: theme.spacing(0, 2),
    },
  }));
  
  import InputBase from '@mui/material/InputBase';
      
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));



  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
   

  const theme = createTheme();
  
const PostsList =  ()=>{


  const [query,setQuery] = useState("")
  const [pageNumber,setPageNumber] = useState(1)

  
  
  const {blogs,hasMore,loading,error,userInfo} =  searchPost(query,pageNumber)



  
 
  const observer = useRef()
  const lastBlogElementRef = useCallback(node =>{
if(loading) return 
if(observer.current) observer.current.disconnect()
observer.current = new IntersectionObserver(entries =>{
    if(entries[0].isIntersecting && hasMore){ //burda verıyı gecıp gecmedıgını kontrol etmelıyız
      setPageNumber(prevPageNumber => prevPageNumber + 1)

    }
 
    
})
if(node) observer.current.observe(node)
  },[loading,hasMore])

  function handleSearch(e){

    setQuery(e.target.value)
    setPageNumber(1)

  
   
  
  }

  



  const {user,ısAuthenticated,setUser,setIsAuthenticated} = useContext(AuthContext)
 
  return (
      
   
    


          <ThemeProvider theme={theme}>
        
           {ısAuthenticated ?
            <AuthenticatedNav >

</AuthenticatedNav>
           
            : 
            <Nav  >
           
            </Nav>
          
          }
            

                <Toolbar>
      <Search   >
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                         value={query}
                     onChange={handleSearch}
                  
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </Search>
                    </Toolbar> 

          
    <div className="home">

    
     
        
          <Grid    columns={{ xs: 4, sm: 8, md: 10 }} >
          
          
        {
        blogs.length > 0 &&
        
        blogs.map((post,index) => {
          
      return blogs.length === index + 1  ?
        <FeaturedPost  inputRef={lastBlogElementRef} loading={loading} post={post}  />
        // ref={lastBlogElementRef}   
    :
    <FeaturedPost   post={post}  />

        })
       
     
        }
      

      {blogs.length == 0 &&

    <NoRresult />
              
              }

    </Grid>
  
    <Sidebar
          title={sidebar.title}
          description={sidebar.description}      
      tags={sidebar.tags}
    
   
            />   


</div>

    </ThemeProvider>
  
 
  );
}

export default PostsList





    