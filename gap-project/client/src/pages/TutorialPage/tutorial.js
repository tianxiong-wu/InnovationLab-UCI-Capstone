import React, {useState} from "react";
import {Grid, Typography, Button} from "@material-ui/core";
import "./tutorial.css"
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background,
    },
    buttonContainer: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
    },
    infusionTitleContainer: {
        width: "100%"
    },
  }));

export default function TutorialPage(){
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const [pausePlay, setPausePlay] = useState(true);
    const handlePause = (event) => {
        setPausePlay(!pausePlay);
    }

    return(
        <Grid container>
            <Grid xs={1}></Grid>
            <Grid xs={10} container className="centralContainer">
                <Grid xs={0} md={6} container>
                    <div className="infusionContainer">
                        <div>
                            <Typography variant="h5" align="center" className="infusionTitle">Infusion Name: (1/6)</Typography>
                        </div>
                        <div className="videoContainer"></div>
                    </div>
                    <div className="videoAndDesc">
                        <div className="videoButtonsContainer">
                            <Button variant="contained" className="videoButtons"><KeyboardArrowLeftIcon/></Button>
                            <Button variant="contained" className="videoButtons" onClick={handlePause}>{pausePlay === true ? <PlayArrowIcon/> : <PauseIcon/>}</Button>
                            <Button variant="contained" className="videoButtons"><KeyboardArrowRightIcon/></Button>
                        </div>
                        <Typography variant="body1" className="description">Description: </Typography>
                    </div>
                </Grid>
                <Grid sm={1}></Grid>
                <Grid xs={0} md={5} container className="">
                    <div className={classes.root}>
                        <div className="noteContainer">
                            <AppBar position="static" className="noteTabs" fullWidth>
                                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                    <Tab wrapped label="Pharmacist Notes" {...a11yProps(0)} />
                                    <Tab wrapped label="Text-Only Step List" {...a11yProps(1)} />
                                    <Tab wrapped label="Infusion Notes" {...a11yProps(2)} />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0}>
                                <Typography align="center">Pharmacist Notes Here</Typography>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Typography align="center">Step List</Typography>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <Typography align="center">Infusion Notes Here</Typography>
                            </TabPanel>
                        </div>
                        <Button variant="contained" className="desktopButtons">Text-to-Speech</Button>
                        <Button variant="contained" className="desktopButtons">Download Full Text</Button>
                    </div>   
                </Grid>
            </Grid>
            <Grid xs={1}></Grid>
        </Grid>
    )
}