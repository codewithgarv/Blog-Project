const {post} = require("../Models/Post_model");

const createPost = async (req, res) => {
  try {
    console.log(req.body.data);
    const { title, description, picture, username, createDate } = req.body.data;

    if (!title || !description || !picture || !username || !createDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newPost = await post.create({
        title,
        description,
        picture,
        username,
        createDate,
    });
    // console.log("New post saved:", newPost);
    return res.status(200).json({
        success:200,
        message:"Post saved successfully"
    });

  } catch (error) {
    return res.status(400).json({message:"Something went wrong"});
  }
};

const showPost = async (req,res) => {
  try{
    let response = await post.find({});
    console.log(response);
    return res.status(200).json({
      success:200,
      response:response
    });
  }
  catch(error){
    console.log("Something went wrong");

  }

}


module.exports = { createPost,showPost };
