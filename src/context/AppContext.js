import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { register, login, logout, currentUser, googleSignIn} from '../firebase/firebase';

const API_KEY = process.env.REACT_APP_MOVIE_KEY;

const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`

const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`

// const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [user, setUser] = useState('');
    const [details, setDetails] = useState('');


    const getMovies = async () => {

        try {
            const { data } = await axios.get(discoverUrl);
            setMovies(data.results)
        } catch (err) {
            toast.error(err)
        }

    }
    const searchMovies = async () => {
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

    const getMovieDetails = async (id, navigate, title) => {
        if(user){

            try {
                const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
                setDetails(data)
                navigate(`/details/${title}`)
            } catch (err) {
                toast.error(err)
            }
        }else{
            toast.error('You should login!!!')
        }
    }

    useEffect(() => {
        getMovies();
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        search ? searchMovies(search) : getMovies()
    }

    const handleLogin = async (e, navigate) => {
        e.preventDefault();
        await login(email, password, navigate)
        resetInputs();
    }

    const handleGoogle =  (e,navigate) => {
        e.preventDefault();
        googleSignIn(navigate)
        resetInputs();
    }

    const handleRegister = async (e, navigate) => {
        e.preventDefault();
        await register(email, password, fname, lname, navigate)
        resetInputs();
    }
    const handleLogout = async (navigate) => {
        await logout(navigate)
    }

    useEffect(() => {
        currentUser(setUser)
    }, [])

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
            getMovies
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider