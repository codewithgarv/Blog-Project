require('dotenv').config();
const { user } = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const {token_schema} = require("../Models/tokens");
const jwt = require('jsonwebtoken');

const signupUser = async (req, res) => {
  // console.log(req.body);
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(204).json({
        success: 204,
        message: "Please enter required fields",
      });
    }
    const existUser = await user.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: 400,
        message: "User is already registered,please login",
      });
    } else {
      let hashed_password = await bcrypt.hash(password,10);
      try {
        const saved_user = await user.create({ username, email, password:hashed_password });
        return res.status(200).json({
          success: 200,
          message: "User is registered successfully",
        });
      } catch (error) {
        console.log("Error while hashing password");
      }
    }
  } catch (error) {
    res.status(400).json({
      success: 400,
      message: "Something went wrong,Please try again later",
    });
  }
};

const loginUser = async (req,res) => {
  // console.log(req.body);
  const {email,password} = req.body;
  try{
    if(!email || !password){
      return res.status(204).json({
        success:204,
        message:"Please enter all fields",
      });
    }
    const existUser = await user.findOne({email});
    if(!existUser){
      return res.status(400).json({
        success:400,
        message:"User is not registered,Please sign up first",
      });
    }else{
      try{
        let decrypt_password = await bcrypt.compare(password,existUser.password);
        if(!decrypt_password){
          return res.status(400).json({
            success:400,
            message:"Password not matched,Please recheck your entered password",
          });
        }
        else{
          let payload = {
            email,password
          }
          const access_token = jwt.sign(payload,process.env.JWT_KEY,{expiresIn:"15m"});
          const refresh_token = jwt.sign(payload,process.env.JWT_REFRESH_TOKEN,{expiresIn:"15m"})

          // saving refresh token into db

          const saved_refresh_token = await token_schema.create({token:refresh_token});
          return res.status(200).json({
            status:200,
            access_token:access_token,
            refresh_token:refresh_token,
            email,
            username:existUser.username,
          });

        }
      }
      catch(error){
        console.log('Something went wrong,Try again')

      }
    }

  }
  catch(error){
    console.log("Something went wrong,Please try again after sometime");
  }

}

module.exports = { signupUser,loginUser };
