require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const { signupUser, loginUser } = require("../Controllers/Usercontrol");
const { cloudinary } = require("../Controllers/Cloudinary");
const { upload } = require("../middleware/multer.middleware");
const { Image_model } = require("../Models/Image-Model");
const { createPost,showPost } = require("../Controllers/createPost");


const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/file/upload", upload.single("file"), async (req, res) => {
  try {
    if (req.file.path === "") {
      res.status(400).json({
        success: 400,
        message: "file path cannot be empty",
      });
    } else {
      const response = await cloudinary.uploader.upload(req.file.path);
    //   console.log(response.secure_url);
      const Image_url = await Image_model.create({ url: response.url });

      fs.unlinkSync(req.file.path);

      res.status(200).json({
        success: 200,
        message: "file uploded into DB",
        url: response.secure_url,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error uploading file" });
  }
});
router.post("/createpost",createPost);
router.get("/showPosts",showPost);

module.exports = router;
