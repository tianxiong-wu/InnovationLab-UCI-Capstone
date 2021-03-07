import React, {useState, useContext} from 'react';
import { UserContext } from "../../UserContext";
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
import logo from "../../innovation.png";
import "../patientNav/patientNav.css"
import axios from 'axios';
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
                    <Link to="/loginSignup"><IconButton edge="start" id="logoIcon" color="#00529b" aria-label="menu">
                        <img src={logo} alt="Logo" className="siteIcon"/>
                    </IconButton></Link>
                </Toolbar>
            </AppBar>
        </div>
    )
}