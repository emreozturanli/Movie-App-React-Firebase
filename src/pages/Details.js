import { Box, Button, Container, useMediaQuery } from '@mui/material'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import backupImage from '../assets/tmdb.jfif'
import Header from '../components/Header';

const IMG_API = "https://image.tmdb.org/t/p/w1280";

function Details() {
    const { details } = useContext(AppContext)
    const { original_title, overview, release_date, vote_average, poster_path } = details

    const navigate = useNavigate();

    const theme = useTheme();
     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Container maxWidth='md' sx={{ marginTop: '4rem' }}>
            <Header/>
            <Card sx={{ display: 'flex', marginTop:isMobile ? '3rem': '8rem', flexDirection: isMobile ? 'column': 'row'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h4">
                            {original_title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {overview}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" component="div" sx={{marginTop: '1rem'}}>
                            <span style={{color:'orangered',}}>Release Date :</span>  {release_date}
                        </Typography>
                        <Typography variant="h5" color="text.secondary" component="div" sx={{marginTop: '1rem', marginBottom: '1rem'}}>
                        <span style={{color:'orangered'}}>Rate :</span> {vote_average}
                        </Typography>
                        <Button variant="contained" color='secondary' onClick={()=>navigate(-1)}>Back</Button>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ maxWidth:300, height: 400, objectFit: 'contain',display:'block',margin:'auto', order: isMobile ? '-1': '1' }}
                    image={poster_path ? (IMG_API + poster_path ) : backupImage}
                    alt="Live from space album cover"
                />
            </Card>
        </Container>
    );
}

export default Details