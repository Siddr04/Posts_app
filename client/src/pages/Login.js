import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

import axios from "axios"
const Login = () => {
  const navigate = useNavigate();

  const[username,setUsername]=useState("");
  const[password,setPassword]=useState("");
  const [auth,setAuth]=useState(-1);
  const login=()=>{

    axios.post("http://localhost:3024/users/login",{Username:username,Password:password}).then((response)=>{
      console.log(response.data);
      setAuth(response.data.status);
      // setListofposts(response.data);
    })
  }
  if(auth===0)
  {
    navigate("/");
  }  

  return (
    
    <div className='loginContainer'>
      {auth===1 && <h3>Incorrect Username or password</h3>}
      <input type="text" value={username} placeholder="Your username.." onChange={(event)=>setUsername(event.target.value)}/>
      <input type="password" value={password} placeholder="Your password.." onChange={(event)=>setPassword(event.target.value)}/>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login