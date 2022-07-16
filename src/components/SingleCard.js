import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from "react"
import {AppContext} from "../context/AppContext"
import {useNavigate} from 'react-router-dom';
// import { CardContent } from '@mui/material';
import backupImage from '../assets/tmdb.jfif'
import spinner from '../assets/spinner.gif'

const IMG_API = "https://image.tmdb.org/t/p/w1280";

export default function SingleCard({title,poster_path,overview,vote_average,id}) {

  const {getMovieDetails} = useContext(AppContext);
  const navigate = useNavigate();
  const [loaded,setLoaded] = React.useState(false)

const onImageLoaded = () =>{
  setLoaded(true)
}

  return (
    <div>
    <Card sx={{ maxWidth: 300, margin: 'auto' }}>
      <CardMedia
        component="img"
        height="300"
        onLoad={onImageLoaded}
        image={loaded ? (poster_path ? (IMG_API + poster_path ) : backupImage) : spinner }
        alt={title}
        sx={{objectFit : 'contain'}}
      />
      {/* <CardContent >
        <Typography  variant="h5" component="div">
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