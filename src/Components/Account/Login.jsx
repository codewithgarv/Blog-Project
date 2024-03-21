import React, { useContext, useState } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
`;
const Image = styled("img")({
  width: "100px",
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;

  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;
const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
`;
const Text = styled(Typography)`
  font-size: 16px;
  color: #878787;
`;

const Login = ({setLoggedIn}) => {
  const imageUrl =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const {setAccount} = useContext(AppContext);
  const navigate = useNavigate();
  const [account, toggleAccount] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginuser,setloginUser] = useState({email:"",password:""});

  function toggleAccountType() {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  }
  function submitHandler(event) {
    setFormData((prev) => {
      const { name, value } = event.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  async function signupuser(event) {
    event.preventDefault();
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      toast.error("Please fill all fields!");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password strength validation (example: at least 6 characters)
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    } else {
      const data = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const result = await data.json();
      if(result.success === 200){
        toast.success(result.message);
        setFormData({username:"",email:"",password:""});
        return;
      }
      if(result.success === 400){
        toast.error(result.message);
        return;
      }
    }
  }

  async function loginHandler(event){
    // event.preventDefault();
    setloginUser((prev)=>{
      const {name,value} = event.target;
      return{
        ...prev,
        [name]:value,
      }
    });
   
  }

async function setlogin(event) {
  const { email, password } = loginuser;
  if (!email || !password) {
    toast.error("Please fill all fields!");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  if (password.length < 6) {
    toast.error("Password should be at least 6 characters long");
    return;
  } else {
    try {
      const token = sessionStorage.getItem('accesstoken');
      // console.log(token);
      const data = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          
        },
        
        body: JSON.stringify({
          email,
          password
        }),
      });
      const result = await data.json();

      console.log("Server response:", result); // Log the server response

      if (result.status === 200) {
        toast.success("Logged In Successfully");
        sessionStorage.setItem('accesstoken', result.access_token);
        sessionStorage.setItem('refreshtoken', result.refresh_token);

        setAccount({
          username: result.username,
          email: result.email
        });
        setLoggedIn(true);
        navigate('/');
      }else { 
        toast.error("Invalid email or password. Please try again.");
       
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
     
    }
  }
}


  return (
    <Component>
      <Box>
        <Image src={imageUrl} alt="login" />
        {account === "login" ? (
          <Wrapper>
            <TextField variant="standard" onChange={loginHandler} label="Enter email" type="email" name="email" value={loginuser.email}/>
            <TextField variant="standard" onChange={loginHandler} label="Enter password" type="password" name="password"value={loginuser.password} />
            <LoginButton variant="contained" onClick={setlogin}>Login</LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton onClick={toggleAccountType}>
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              name="username"
              onChange={submitHandler}
              value={formData.username || ""}
              label="Enter Username"
            />
            <TextField
              variant="standard"
              name="email"
              onChange={submitHandler}
              value={formData.email || ""}
              label="Enter Email"
            />
            <TextField
              variant="standard"
              name="password"
              onChange={submitHandler}
              value={formData.password || ""}
              label="Enter Password"
              type="password"
             
            />
            <SignupButton onClick={signupuser}>Sign Up</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={toggleAccountType}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
