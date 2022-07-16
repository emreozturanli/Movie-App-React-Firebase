import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate()
  return (
    <div style={{display:'grid', placeItems:'center', marginTop:'8rem'}}>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://i.imgflip.com/3b0s3p.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Page Not Found
          </Typography>
            <p>Below are the possible reasons of this error.</p>
            <ul>
                <li>Wrong URL</li>
                <li>Unstable Internet connection</li>
                <li>API Connection problems</li>
            </ul>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant='contained' color="secondary" onClick={()=> navigate('/')}>
          Home
        </Button>
      </CardActions>
    </Card>
    </div>
  );
}

export default NotFound