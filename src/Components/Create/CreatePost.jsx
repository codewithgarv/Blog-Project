import React, { useEffect, useState ,useContext} from 'react'
import { Box,styled,FormControl,InputBase, Button,TextareaAutosize } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";
const Container =styled(Box)`
margin:50px 100px;
`
const Image = styled('img')({
    width:'100%',
    height:'50vh',
    objectFit:'cover',

})
const StyledFormControl = styled(FormControl)`
margin-top:10px;
display:flex;
flex-direction:row;
`
const InputTexField = styled(InputBase)`
flex:1;
margin:0 30px;
font-size:25px
`
const Textarea =styled(TextareaAutosize)`
width:100%;
margin-top:50px;
font-size:18px;
border:1px solid black;
border-radius:9px;
&:focus-visible:{
    outline:none;
    border:2px solid black;
}
`
const initialvalues = {
  title:'',
  description:'',
  picture:'',
  username:'',
  categories:'',
  createDate: new Date(),


}
const CreatePost = () => {
   
    const [post,setPosts] = useState(initialvalues);
    const navigate = useNavigate();

    const[file,setFile] = useState('');
    const [searchParams] = useSearchParams();
    const{account} = useContext(AppContext);
    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

    function changeHandler(event){
      setPosts((prev)=>{
        const {name,value} = event.target;
        return{
          ...prev,
          [name]:value,

        }
      });
    }
    function fileUploader(event){
       event.preventDefault();
      setFile(event.target.files[0]);
           console.log(file);
    }
    useEffect(()=>{
    const getImage = async () => {
      if(file){
        const data = new FormData();
        // data.append('name',file.name);
        data.append('file',file);

        // API call
        try{
          const response = await fetch("http://localhost:8000/file/upload", {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body:data,
      });
      const result = await response.json();
      console.log(result);
      post.picture = result.url;

    
      if(result.success === 200){
        toast.success('file uploaded successfully');
      }else{
        toast.error('Unable to upload file,Please try again');
      }

        }
        catch(error){
          toast.error('Only images are allowed');
          console.log('something went wrong in the backend,Please try again later');

        }
      }
      
    }
    getImage();
    const category = searchParams.get('category');
    post.categories = category;
    post.username = account.username;

    },[file]);

   async function savePost(){
      console.log(post);
      const postsaver = await fetch("http://localhost:8000/createpost",{
        method:"POST",
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify({
          data:post,
        }),
      })

      const data = await postsaver.json();
      if(data.success === 200){
        toast.success("Post Saved Successfully");
        navigate('/');
      }else{
        toast.error("Something went wrong,Please try again");
      }

    }


  return (
   
    <Container>
      <Image src={url}/>
      <StyledFormControl>
        <label htmlFor='fileInput'><AddCircleIcon fontSize='large' color='action'/></label>
        <input type='file' id='fileInput' style={{display:'none'}} onChange={fileUploader}/>
        <InputTexField placeholder='Title' name='title' onChange={changeHandler}/>
        <Button variant='contained' onClick={savePost}>Publish</Button>
      </StyledFormControl>
      <Textarea minRows={5} placeholder=' Tell your Story...' name='description' onChange={changeHandler}/>
    </Container>
  )
}

export default CreatePost
