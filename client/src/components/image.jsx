



import * as React from 'react';

import ImageListItem from '@mui/material/ImageListItem';
import man from "../images/man.jpg"


export default function CustomImageList() {
  return (
    
      <ImageListItem   sx={{ width: 400,margin:5,left:100 }}>
        <img
        
        src={man}
        
        />
      
      </ImageListItem>
  )
}



