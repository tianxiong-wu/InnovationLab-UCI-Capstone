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
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ReactPlayer from "react-player";


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

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
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

    const [navValue, setNavValue] = useState(0);
    const handleNavChange = (event, newValue) => {
        setNavValue(newValue);
    }

    const [pausePlay, setPausePlay] = useState(true);
    const handlePause = (event) => {
        setPausePlay(!pausePlay);
    }

    const [descOpen, setOpenDesc] = React.useState(false);
    const handleClickOpenDesc = () => {
        setOpenDesc(true);
    }
    const handleCloseDesc = () => {
        setOpenDesc(false);
    }

    const [stepOpen, setOpenStep] = React.useState(false);
    const handleClickOpenStep = () => {
        setOpenStep(true);
    };
    const handleCloseStep = () => {
        setOpenStep(false);
    };

    const [notesOpen, setOpenNotes] = React.useState(false);
    const handleClickOpenNotes = () => {
        setOpenNotes(true);
    };
    const handleCloseNotes = () => {
        setOpenNotes(false);
    };

    const videoArray = [
        "https://www.youtube.com/watch?v=-omGy5hsmMM&amp;list=PLKpKgq-_PAE_deDWtgdr3mjPJx-G6Bq3i&amp;index=1",
        "https://www.youtube.com/watch?v=xkKLs2gao34&amp;list=PLKpKgq-_PAE_deDWtgdr3mjPJx-G6Bq3i&amp;index=2",
        "https://www.youtube.com/watch?v=KD9HdDpDXwA&amp;list=PLKpKgq-_PAE_deDWtgdr3mjPJx-G6Bq3i&amp;index=3",
        "https://www.youtube.com/watch?v=Kl9uvkkRJ5g&amp;list=PLKpKgq-_PAE_deDWtgdr3mjPJx-G6Bq3i&amp;index=4",
        "https://www.youtube.com/watch?v=MF9EubHp7bM&amp;list=PLKpKgq-_PAE_deDWtgdr3mjPJx-G6Bq3i&amp;index=5",
        "https://www.youtube.com/watch?v=y1VA35aPVZM&amp;list=PLKpKgq-_PAE_deDWtgdr3mjPJx-G6Bq3i&amp;index=6",
        "https://www.youtube.com/watch?v=iJtk2s1ru2Q&amp;list=PLKpKgq-_PAE_deDWtgdr3mjPJx-G6Bq3i&amp;index=7",
        "https://www.youtube.com/watch?v=Itpv9XrS0m8&amp;list=PLKpKgq-_PAE_deDWtgdr3mjPJx-G6Bq3i&amp;index=8",
        "https://www.youtube.com/watch?v=h84wymxoBXI&amp;list=PLKpKgq-_PAE_deDWtgdr3mjPJx-G6Bq3i&amp;index=9",
        "https://www.youtube.com/watch?v=-er0hrmeMkI&amp;list=PLKpKgq-_PAE_deDWtgdr3mjPJx-G6Bq3i&amp;index=10"
    ]

    const [videoCounter, setVideoCounter] = useState(videoArray.length - videoArray.length);
    const [currentVideo, setCurrentVideo] = useState(videoArray[videoCounter]);

    const handleNextVideo = () => {
        if (videoCounter < videoArray.length-1){
            let newCount = videoCounter + 1;
            setVideoCounter(newCount);
            setCurrentVideo(videoArray[newCount]);
        }
        else {
            alert('No more videos to play');
        }
    }

    const handlePrevVideo = () => {
        if (videoCounter > 0){
            let newCount = videoCounter - 1;
            setVideoCounter(newCount);
            setCurrentVideo(videoArray[newCount]);
        }
        else {
            alert('No more videos to play');
        }
    }

    return(
        <Grid container>
            <Grid xs={1}></Grid>
            <Grid xs={10} container className="centralContainer">
                <Grid xs={0} md={6} container>
                    <div className="infusionContainer">
                        <div>
                            <Typography variant="h5" align="center" className="infusionTitle">IV Push: ({videoCounter+1}/{videoArray.length})</Typography>
                        </div>
                        <div className="videoContainer">
                            <ReactPlayer className="video" url={currentVideo}/>
                        </div>
                    </div>
                    <div className="videoAndDesc">
                        <div className="videoButtonsContainer">
                            <Button variant="contained" className="videoButtons" onClick={handlePrevVideo}><KeyboardArrowLeftIcon/></Button>
                            <Button variant="contained" className="videoButtons" onClick={handlePause}>{pausePlay === true ? <PlayArrowIcon/> : <PauseIcon/>}</Button>
                            <Button variant="contained" className="videoButtons" onClick={handleNextVideo}><KeyboardArrowRightIcon/></Button>
                        </div>
                        <Typography variant="body1" className="description desktopInteraction">Description: </Typography>
                    </div>
                </Grid>
                <Grid sm={1}></Grid>
                <Grid xs={0} md={5} container className="desktopInteraction">
                    <div className={classes.root}>
                        <div className="noteContainer">
                            <AppBar position="static" className="no teTabs" fullWidth>
                                <Tabs value={value} onChange={handleChange} centered className="tabsColor" aria-label="simple tabs example">
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

            <BottomNavigation
                value={navValue}
                onChange={handleNavChange}
                showLabels
                className="bottomNav mobileInteraction"
            >
                <BottomNavigationAction className="bottomNavItem" onClick={handleClickOpenDesc} label="Description"/>
                <BottomNavigationAction className="bottomNavItem" onClick={handleClickOpenStep} label="Step List"/>
                <BottomNavigationAction className="bottomNavItem" onClick={handleClickOpenNotes} label="Notes"/>    
                <BottomNavigationAction className="bottomNavItem" label="Download Text"/>        
            </BottomNavigation> 
            <Dialog
                open={descOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDesc}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Description"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Infusion description here
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDesc} color="primary">
                    Close
                </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={stepOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseStep}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Step List"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Step List here
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseStep} color="primary">
                    Close
                </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={notesOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseNotes}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Notes"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Notes here
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseNotes} color="primary">
                    Close
                </Button>
                </DialogActions>
            </Dialog>
            <Grid xs={1}></Grid>
        </Grid>
    )
}