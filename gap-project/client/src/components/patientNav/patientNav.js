import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import "./patientNav.css"
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title:{
        flexGrow: 1,
    }
}));

export default function PatientNav(){
    const classes = useStyles();
    const [auth, setAuth] = useState(true);
    const [profileAnchor, setProfileAnchor] = React.useState(null);
    const [hamburgerAnchor, setHamburgerAnchor] = React.useState(null);
    const openProfile = Boolean(profileAnchor);
    const openHamburger = Boolean(hamburgerAnchor);
    const [hbIcon, setHbIcon] = React.useState(true);
    const [closeIcon, setCloseIcon]= React.useState(false);

    const handleProfile = (event) => {
        setProfileAnchor(event.currentTarget);
    };

    const handleCloseProfile = () => {
        setProfileAnchor(null);
    };

    const handleHamburger = (event) => {
        setHamburgerAnchor(event.currentTarget);
        setHbIcon(false);
        setCloseIcon(true);
    };

    const handleHamburgerClose = () => {
        setHamburgerAnchor(null);
        setHbIcon(true);
        setCloseIcon(false);

    }


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className="navStyling">
                    <div>
                        <IconButton
                            aria-label="hamburger list of pages"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleHamburger}
                            color="inherit">
                                {hbIcon === true ? <MenuIcon className="hamburger"/> : null}
                                {closeIcon === true ? <CloseIcon className="close"/> : null}
                        </IconButton>
                        <Menu
                            id="menu-hamburger"
                            anchorEl={hamburgerAnchor}
                            keepMounted
                            open={openHamburger}
                            onClose={handleHamburgerClose}
                            PaperProps={{
                                style: {
                                     width: "100%",
                                     maxWidth: "100%",
                                     maxHeight: "100%",
                                     left: 0,
                                     right: 0,
                                   }
                                 }}
                                 marginThreshold={0}
                        >
                            <Link className="burgerItem" onClick={handleHamburgerClose} to="/">Home</Link>
                            <Link className="burgerItem" onClick={handleHamburgerClose} to="/Tutorials">Tutorials</Link>
                            <Link className="burgerItem" onClick={handleHamburgerClose} to="/Schedule">Schedule</Link>
                            <Link className="burgerItem" onClick={handleHamburgerClose} to="/faq">FAQ</Link>
                            <Link className="burgerItem" onClick={handleHamburgerClose} to="/contact">Contact</Link>
                        </Menu>
                    </div>
                    <IconButton edge="start" id="logoIcon" color="#00529b" aria-label="menu">
                        Icon
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link className="navItem" to="/">Home</Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link className="navItem" to="/Tutorials">Tutorials</Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link className="navItem" to="/Schedule">Schedule</Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link className="navItem" to="/faq">FAQ</Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link className="navItem" to="/contact">Contact</Link>
                    </Typography>
                        {auth && (
                           <div>
                               <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleProfile}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={profileAnchor}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={openProfile}
                                    onClose={handleCloseProfile}
                                >
                                    <MenuItem className="profileMenu" onClick={handleCloseProfile}>Jasmine Miller</MenuItem>
                                    <MenuItem className="profileMenu" onClick={handleCloseProfile}>Profile</MenuItem>
                                    <MenuItem className="profileMenu" onClick={handleCloseProfile}>Settings</MenuItem>
                                    <MenuItem className="profileMenu" onClick={handleCloseProfile}>Log Out</MenuItem>
                                </Menu>
                           </div> 
                        )}
                </Toolbar>
            </AppBar>
        </div>
    )
}