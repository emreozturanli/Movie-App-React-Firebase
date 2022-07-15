import React,{useContext} from 'react'
import {AppContext} from "../context/AppContext"
import { useNavigate } from "react-router-dom"
import { Typography } from '@mui/material'

const Header = () => {
    const {getMovies} = useContext(AppContext)
    const navigate = useNavigate()
  return (
    <Typography
            variant="h3"
            noWrap
            component="div"
            color='primary'
            textAlign='center'
            sx={{ display: { xs: 'block', sm: 'none', cursor:'pointer'  } }}
            onClick={()=> {navigate('/'); getMovies()}}
          >
            MOVIE APP
    </Typography>
  )
}

export default Header