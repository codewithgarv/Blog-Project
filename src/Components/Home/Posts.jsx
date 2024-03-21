import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import Post from "./Post";

const Posts = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("http://localhost:8000/showPosts", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success === 200) {
        setPost(data.response);
      }
    };
    fetchData();
    console.log(post);
  }, []);

  return (
    <div style={{display:"flex", flexWrap: "wrap"}}>
      {post && post.length > 0 ? (
        post.map((postItem, index) => (
          <Grid item lg={3} xs={12} sm={4} >
            <Post post={postItem} key={index}/>
          </Grid>
        ))
      ) : (
        <Box style={{ color: "#878787", margin: "30px 80px", fontSize: 18 }}>
          No Data Available
        </Box>
      )}
    </div>
  );
};

export default Posts;
