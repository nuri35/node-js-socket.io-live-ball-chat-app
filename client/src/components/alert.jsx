import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';


export default function SimpleSnackbar({opens,handleCloses,message}) {
 


  return (
    <div>
     
      <Snackbar
        open={opens}
        autoHideDuration={6000}
        onClose={handleCloses}
        message={message}
       
      />
    </div>
  );
}