import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import '../nav/nav.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  m: {
    marginTop: 50,
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

// replace all the <a> tags with <Link> to use react routing once the other pages are built.
// add a react conditional rendering: if not logged in, only show the logo on the nav bar.
// currently developed for desktop pov. Add css media queries to show a different nav format 
// if the size of the window is larger than a mobile size.

  return (
    <div className={classes.root}>

      <AppBar position="static">
        <Toolbar className="navStyling">
        <IconButton edge="start" className={classes.menuButton} color="#00529b" aria-label="menu">
            Icon
        </IconButton>
        <Typography variant="h6" className={classes.title}>
            <Link className="navItem" to="/">Home</Link>
        </Typography>
        <Typography variant="h6" className={classes.title}>
            <Link className="navItem" to="/Tutorials">Tutorials</Link>
        </Typography>
        <Typography variant="h6" className={classes.title}>
            <Link className="navItem" to="/schedule">Schedule</Link>
        </Typography>
        <Typography variant="h6" className={classes.title}>
            <Link className="navItem"  to="/faq">FAQ</Link>
        </Typography>
        <Typography variant="h6" className={classes.title}>

            <Link className="navItem" to = "/contact">Contact</Link>
        </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu 
                className={classes.m}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem class="profileItem" onClick={handleClose}>Jasmine Miller</MenuItem>
                <MenuItem class="profileItem" onClick={handleClose}>Profile</MenuItem>
                <MenuItem class="profileItem" onClick={handleClose}>Settings</MenuItem>
                <MenuItem class="profileItem" onClick={handleClose}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

/**
       <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
 */