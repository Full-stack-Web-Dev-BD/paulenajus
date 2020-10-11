
import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import EvStationIcon from '@material-ui/icons/EvStation';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil'
import { searchLocationState, userState } from '../../recoilState'

const useStyles = makeStyles((theme) => ({

  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Navbar({ title }) {
  const [auth, setAuth] = useState(false)
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [locationName, setLocationName] = useState('')
  const [isShowButton, setIsShowButton] = useState(false)
  const [error, setError] = useState(false)
  const [getSearchLocationState, setSearchLocationState] = useRecoilState(searchLocationState)
  const [iTitle, setITitle] = useState('')
  const getUserInfo = useRecoilValue(userState)
  useEffect(() => {

    if ((window.location.pathname === '/viewalllocation' || (window.location.pathname === '/public')) ) {
      setIsShowButton(true)
    } else {
      setIsShowButton(false)
    }

    if (localStorage.getItem('car-app')) {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }, [])
  const searchLocation = () => {
    Axios.post('/findlocation', {
      keyword: locationName
    })
      .then(res => {
        setSearchLocationState(res.data.location)
        setITitle(`Search Result for "${locationName}"`)
      })
  }
  const changeHandler = (e) => {
    if (!(window.location.pathname === '/viewalllocation' || (window.location.pathname === '/public') )) {
      window.location.href = '/viewalllocation'
    } else {
      setLocationName(e.target.value)
    }
  }


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const logout = () => {
    window.localStorage.removeItem('car-app')
    window.location.href = '/public'
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { window.location.href = '/profile' }}>Profile</MenuItem>
      <MenuItem onClick={() => { window.location.href = '/chartStatus' }}>Charging Status</MenuItem>
      <MenuItem onClick={() => logout()}>Log Out</MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Link to='/viewalllocation' style={{ color: 'white' }}>
              <EvStationIcon style={{ color: 'white' }} />
            </Link>

          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {iTitle ? iTitle : title}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Location"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={e => changeHandler(e)}
              inputProps={{ 'aria-label': 'search' }}
            />
            {
              isShowButton ?
                <Button onClick={() => searchLocation()} style={{ marginLeft: '20px' }} variant="contained" color="primary" >Search</Button> : ''
            }
          </div>
          <div className={classes.grow} />
          {
            auth ?
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge color="secondary">
                    <h4>
                      {getUserInfo.email}
                    </h4>
                  </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge color="primary">
                    <Link to='/' >
                      <Button variant="contained" color="primary">
                        Home
                    </Button>
                    </Link>
                  </Badge>
                </IconButton>
                {
                  getUserInfo.type === 'user' ?
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                      <Badge color="primary">
                        <Link to={`/chistory/?uid=${getUserInfo._id}`} >
                          <Button variant="contained" color="primary">My History</Button>
                        </Link>
                      </Badge>
                    </IconButton> : ''
                }
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge color="primary">
                    <Button onClick={() => { logout() }} variant="contained" size="small" color="secondary">
                      Logout
                    </Button>
                  </Badge>
                </IconButton>
              </div> :
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge color="primary">
                    <Link to='/login'>
                      <Button variant="contained" color="primary">
                        LOGIN
                      </Button>
                    </Link>
                  </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge color="primary">
                    <Link to='/signup' >
                      <Button variant="contained" color="primary">
                        SIGN UP
                    </Button>
                    </Link>
                  </Badge>
                </IconButton>
              </div>
          }
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
