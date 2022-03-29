const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")

require('dotenv').config();
const cookieParser = require('cookie-parser')




app.use(cors({origin:"http://localhost:3000",credentials:true})) 

app.use(cookieParser())
 app.use(bodyParser.json({limit:"50mb",extended:true})) 


app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use('/blogs',blogRouter)





const server = app.listen(process.env.PORT,()=>{
    console.log("bu port dınlenıyor: " + process.env.PORT)
})


module.exports = server