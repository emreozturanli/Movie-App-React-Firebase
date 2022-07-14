import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from "react"
import {AppContext} from "../context/AppContext"
import {useNavigate} from 'react-router-dom';

const IMG_API = "https://image.tmdb.org/t/p/w1280";

export default function SingleCard({title,poster_path,overview,vote_average,id}) {

  const {getMovieDetails} = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
    <Card sx={{ maxWidth: 300, margin : 'auto' }}>
      <CardMedia
        component="img"
        height="300"
        image={IMG_API + poster_path}
        alt={title}
        sx={{objectFit : 'contain'}}
      />
      {/* <CardContent sx={{height:'100px', overflow: 'auto'}}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{textOverflow:'ellipsis'}} >
          {overview}
        </Typography>
      </CardContent> */}
      <CardActions >
        <Button size="small" onClick={()=>getMovieDetails(id,navigate,title)}>DETAILS</Button>
        <Typography variant="h4" color="primary" sx={{marginLeft: 'auto'}} >
          {vote_average}
        </Typography>
      </CardActions>
    </Card>
    </div>
  );
}