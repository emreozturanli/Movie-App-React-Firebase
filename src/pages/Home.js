import { Container, Grid } from "@mui/material"
import SingleCard from "../components/SingleCard"
import { useContext } from "react"
import {AppContext} from "../context/AppContext"


const Home = () => {
  const {movies} = useContext(AppContext)

  return (
    <Container  sx={{marginTop : '2rem'}}>
      <Grid container justifyContent="center" spacing={4}>
        { 
          
          movies.map((movie)=>{
            return  <Grid key={movie.id} item  xs={12} sm={6} md={3}>
                      <SingleCard {...movie}/>
                    </Grid>
          })
          
        }
       
      </Grid>
    </Container>
  )
}

export default Home