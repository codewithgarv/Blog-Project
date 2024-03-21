// import React from 'react'
// import { Box,Typography,styled } from '@mui/material'

// const Container = styled(Box)`
// border:1px solid #d3cede;
// border-radius:10px;
// margin:10px;
// height:350px;
// display:flex;
// align-items:center;
// flex-direction:column;
// &>p{
//     padding:0 5px 5px 5px;
// }
// `;

// const Image = styled('img')({
//     width:'100%',
//     borderRadius:'10px 10px 0 0',
//     objectFit:'cover',
//     height:150,
    
// })
// const Text = styled(Typography)`
// color:#878787;
// font-size:12px;
// `
// const Heading = styled(Typography)`
// font-size:18px;
// font-weight:600;
// `
// const Detailed = styled(Typography)`
// font-size:14px;

// `
// const truncateText = (text, maxLength = 100) => {
//     if (text.length <= maxLength) {
//       return text;
//     }
//     return `${text.slice(0, maxLength)}...`;
//   };

// const Post = ({post}) => {
//     const truncatedTitle = truncateText(post.title);
//     const truncatedDescription = truncateText(post.description);
//   return (
//     <Container>
//       <Image src={post.picture} alt='blog'/>
//       <Text>{post.categories}</Text>
//       <Heading>{truncatedTitle}</Heading>
//       <Text>{post.username}</Text>
//       <Detailed>{truncatedDescription}</Detailed>
//     </Container>
//   )
// }

// export default Post
import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const Container = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 10px;
  height: 350px;
  display: flex;
  align-items: center;
  flex-direction: column;
  & > p {
    padding: 0 5px 5px 5px;
  }
`;

const Image = styled('img')({
  width: '100%',
  borderRadius: '10px 10px 0 0',
  objectFit: 'cover',
  height: 150,
});

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;


const Heading = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  word-break:break-word;
`;

const Detailed = styled(Typography)`
  font-size: 14px;
  word-break:break-word;
  
`;

// Function to truncate the title and description
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const Post = ({ post }) => {
  const truncatedTitle = truncateText(post.title, 20); // Approximate word length in 20 words
  const truncatedDescription = truncateText(post.description, 100);
  
  return (
    <Container>
      <Image src={post.picture} alt='blog' />
      <Text>{post.categories}</Text>
      <Heading>{truncatedTitle}</Heading>
      <Text>{post.username}</Text>
      <Detailed>{truncatedDescription}</Detailed>
    </Container>
  );
};

export default Post;
