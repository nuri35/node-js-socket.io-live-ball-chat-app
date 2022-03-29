import React from "react"
 import ReactDOM from "react-dom"
import "./index.css"
import "./App.scss"
import App from "./App.js"

import AuthProvider from './components/Context';



import {Provider} from "react-redux"
import store from "./store"

ReactDOM.render(

  <Provider store={store}>

   <AuthProvider>
<App/>
</AuthProvider> 

  </Provider>
 ,

  
    document.getElementById("root")
);


