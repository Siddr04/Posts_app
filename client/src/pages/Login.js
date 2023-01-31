import React,{useState} from 'react'

import axios from "axios"
const Login = () => {
  const[username,setUsername]=useState("");
  const[password,setPassword]=useState("");
  const login=()=>{

    axios.post("http://localhost:3024/users/login",{Username:username,Password:password}).then((response)=>{
      console.log(response.data);
      // setListofposts(response.data);
      // navigate("/");
    })
  }
  return (
    <div className='loginContainer'>
      <input type="text" value={username} placeholder="Your username.." onChange={(event)=>setUsername(event.target.value)}/>
      <input type="password" value={password} placeholder="Your password.." onChange={(event)=>setPassword(event.target.value)}/>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login