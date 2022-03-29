
import * as React from 'react';

import SearchOffSharp from '@mui/icons-material/SearchOffSharp';

import Grid from '@mui/material/Grid';

export default function CustomImageList() {
  return (
  
    <Grid item xs={8} md={8}>
    <div className='Nores'>
    <SearchOffSharp  fontSize='large'/>
         <p className='nop'>No Result</p>
        
        </div>
        
        </Grid>
  )
}


