require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


          
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret, 
});

// const uploadOnCloudinary = async (req,res) => {
//     try{
//         const localFilePath = req.file.path;
//         console.log(localFilePath);
//         if(!localFilePath) return null

//         const response = await cloudinary.uploader.upload(localFilePath,{
//             resource_type:"auto",
//         })
//         console.log("File upload successfully:",response.url
//         );
//         return response

//     }
//     catch(error){
//         console.log("cannot upload file");
//         return null;
//     }

// }

module.exports ={cloudinary}