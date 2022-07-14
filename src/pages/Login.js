import React from 'react'
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import { useContext } from "react"
import {AppContext} from "../context/AppContext"
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const {email,password,setEmail,setPassword, handleLogin, handleGoogle} = useContext(AppContext)
  const navigate = useNavigate();

  return (
    <Container>
      <form onSubmit={(e)=>handleLogin(e,navigate)} style={{maxWidth:'500px', width:'100%', margin:'3rem auto', textAlign:'center'}}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          name='email'
          margin='normal'
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />
        <br />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          name='password'
          margin='normal'
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        /> <br />
        <div style={{margin:'1rem 0 2rem'}}>
        <Button variant="contained" onClick={(e)=>handleGoogle(e,navigate)} >Login with Google</Button> </div>
        <Button variant="contained" type='submit'>Login</Button>
      </form>
    </Container>
  )
}

export default Login