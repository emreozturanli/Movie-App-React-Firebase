import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AppContext } from '../context/AppContext';

// MATERIAL UI STARTS HERE
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
// MATERIAL UI ENDS HERE

export default function PrimarySearchAppBar() {
  // PAGE STATES FUNCTIONALITIES HERE
  const navigate = useNavigate()
  const { search, setSearch, handleSearch, handleLogout, user, getMovies } = React.useContext(AppContext)

  const loginClick = () => {
    setAnchorEl(null);
    navigate('/login')
  };
  const registerClick = () => {
    setAnchorEl(null);
    navigate('/register')
  };
  const logoutClick = () => {
    setAnchorEl(null);
    handleLogout(navigate)
  };

  // MATERIAL UI STARTS HERE
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ?
        <>
          <MenuItem sx={{ display: { md: 'none' } }}>
            {user.slice(0, user.indexOf('@'))}
          </MenuItem>
          <MenuItem
            sx={{ display: { md: 'none' } }}
            onClick={() => { navigate('/'); getMovies() }}>
            Home
          </MenuItem>
          <MenuItem onClick={logoutClick}>Logout</MenuItem>
        </>
        :
        <>
          <MenuItem onClick={loginClick}>Login</MenuItem>
          <MenuItem onClick={registerClick}>Register</MenuItem>
        </>
      }
    </Menu>
  );


  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="fixed" >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', cursor: 'pointer' } }}
            onClick={() => { navigate('/'); getMovies() }}
          >
            MOVIE APP
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={handleSearch}>
              <StyledInputBase
                placeholder="Search for a movie…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </form>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body1"
            noWrap
            component="h3"
            sx={{ display: { xs: 'none', md: 'block' } }}>{user.slice(0, user.indexOf('@'))} </Typography>
          <Box sx={{ display:'flex'}}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
