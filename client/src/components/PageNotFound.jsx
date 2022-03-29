import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { Result, Button } from 'antd';


const PageNotFound = () => {
    return (
      


            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={ <Button simple color="primary" size="md"
              component={Link}
              to="/forget-password"
             >
            Back Home
             </Button>}
            />
         
        
               
       
    )
}

export default PageNotFound;