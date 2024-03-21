require('dotenv').config();
const express = require('express');
const Connection = require('./Database/Connection');
var cors = require('cors')
const app = express();
const PORT = process.env.PORT || 8000;


const routes = require('./Routes/Routes');

app.use(cors());
app.use(express.json());
app.use('/',routes);

app.listen(PORT,()=>{
    console.log("Server is live now...");
    Connection();
});