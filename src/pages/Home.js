import { Container, Grid } from "@mui/material"
import SingleCard from "../components/SingleCard"
import { useContext } from "react"
import {AppContext} from "../context/AppContext"
import Header from "../components/Header"


const Home = () => {
  const {movies} = useContext(AppContext)

  return (
    <Container  sx={{marginTop : '4rem'}}>
      <Header/>
      <Grid container justifyContent="center" spacing={4} sx={{paddingTop:'2rem'}}>
        { 
          
          movies.map((movie)=>{
            return  <Grid key={movie.id} item  xs={12}  sm={6} md={4}lg={3} >
                      <SingleCard {...movie}/>
                    </Grid>
          })
          
        }
       
      </Grid>
    </Container>
  )
}

export default Home