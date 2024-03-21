import "./App.css";
import Login from "./Components/Account/Login";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import { useState } from "react";
import CreatePost from "./Components/Create/CreatePost";

// Private Routing

const PrivateRoute = ({ loggedIn, ...props }) => {
  return (loggedIn ? 
    <>
     <Header />
      <Outlet />
    </>
   : 
    <Navigate replace to="/login"></Navigate>
   ) ;
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
     
      <div className="mt-16">
        <Routes>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />}></Route>

          <Route path="/" element={<PrivateRoute loggedIn={loggedIn}/>}>
            <Route path="/" element={<Home />}></Route>
          </Route>

          <Route path="/create" element={<PrivateRoute loggedIn={loggedIn}/>}>
            <Route path="/create" element={<CreatePost />}></Route>
          </Route>

        </Routes>
      </div>
    </div>
  );
}

export default App;
