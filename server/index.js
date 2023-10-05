const dbConnect = require("./dbConnect");
const express = require("express");
const productRouter=require('./Routers/productRouter')
const cors = require("cors");
const { success } = require("./Utils/resWrapper");
const cloudinary = require('cloudinary').v2;
const app = express();
//created an express app and imported some packages like cors,cloudinary
app.use(express.json({ limit: "30mb" }));//sets the limit to amount of data i can share in api calls

app.use(
  cors({
    origin: "http://localhost:3000",//allowing this address to communicate with server
  })
);

cloudinary.config({
  cloud_name: 'dcza0d7op',
  api_key: '228465731279615',
  api_secret: 'apCFsCV8Rnk9vHCECPu51DuMIno',
});//using cloudinary for image uploading and fetching 

app.get("/", (req, res) => {
  res.send(success(200, "ok"));//test api
});

app.use('/products',productRouter)//route called /products




dbConnect();//connecting with database

const port = 4000;

app.listen(port, () => {
  console.log(`Listening at port ${port}`);//server starts here
});
