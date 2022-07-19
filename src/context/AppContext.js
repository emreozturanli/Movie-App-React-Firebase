import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { register, login, logout, currentUser, googleSignIn} from '../firebase/firebase';

const API_KEY = process.env.REACT_APP_MOVIE_KEY;

const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`

const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`

// const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`


//creating a context object
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    //states
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [user, setUser] = useState('');
    const [details, setDetails] = useState('');
    const [videoKey, setVideoKey] = useState('');

    // getting featured movies for the home page
    const getMovies = async () => {
        try {
            const { data } = await axios.get(discoverUrl);
            setMovies(data.results)
        } catch (err) {
            toast.error(err)
        }
    }

    // when user search a movie this function gets triggered
    const searchMovies = async () => {
        // if user not logged in search function is disabled
        if (user) {
            try {
                const { data } = await axios.get(searchUrl + search);
                if (data.results.length === 0) {
                    toast.error('Nothing matches with this search!!!')
                } else {
                    setMovies(data.results)
                    setSearch('')
                }
            } 
            catch (err) {
                toast.error(err)
            }
        }else{
            toast.error('You should login!!!')
        }
    }

    //getting details of the single movie from the API 
    const getMovieDetails = async (id, navigate, title) => {
        if(user){
            try {
                const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
                setDetails(data)
                const res = await axios.get(` https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
                setVideoKey(res.data.results[0].key)
                navigate(`/details/${title}`)
            } catch (err) {
                toast.error(err)
            }
        }else{
            toast.error('You should login!!!')
        }
    }

    // when the page is first opened getting the features movies
    useEffect(() => {
        getMovies();
    }, [])

    // search function
    const handleSearch = (e) => {
        e.preventDefault();
        search ? searchMovies(search) : getMovies()
    }

    // when user hits login button this function invokes and redirects necessary  datas to firebase.js (login function)
    const handleLogin = async (e, navigate) => {
        e.preventDefault();
        await login(email, password, navigate)
        resetInputs();
    }

    // when user hits login with google button this function invokes and redirects necessary  datas to firebase.js (googleSignIn function)
    const handleGoogle =  (e,navigate) => {
        e.preventDefault();
        googleSignIn(navigate)
        resetInputs();
    }

     // when user registers this function invokes and redirects necessary  datas to firebase.js (register function)
    const handleRegister = async (e, navigate) => {
        e.preventDefault();
        await register(email, password, fname, lname, navigate)
        resetInputs();
    }

    // when user logs out this function invokes and redirects necessary  datas to firebase.js (logout function)
    const handleLogout = async (navigate) => {
        await logout(navigate)
    }

    // when the page is opened, setting user to the currentusers info
    useEffect(() => {
        currentUser(setUser)
    }, [])

    //resetting input fields after register
    const resetInputs = () => {
        setEmail('')
        setPassword('')
        setFname('')
        setLname('')
    }

    return (
        <AppContext.Provider value={{
            movies,
            search,
            setSearch,
            handleSearch,
            handleLogin,
            handleRegister,
            handleLogout,
            email,
            password,
            fname,
            lname,
            user,
            setEmail,
            setPassword,
            setFname,
            setLname,
            details,
            getMovieDetails,
            handleGoogle,
            getMovies,
            videoKey
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider