import React, { useEffect, useState, useContext } from 'react';
import {TutorialContext} from "../../TutorialContext";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Grid from '@material-ui/core/Grid';
import {Button} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const useStyles = makeStyles((theme) => ({
    box:{
        width :'100%',
        height: '100vh',
        display: 'inline-block',
    },
    root: {
        display:'inline-block',
        margin:'2vw',
        marginLeft: '8vw',
        backgroundColor: '#3F51B5',
        width: "35vw",
        height: "216px",
        marginTop: '33px',
        borderRadius: 20,
        color: 'white',
        backgroundColor: '#00529b',
    },
    details: {
        verticalAlign:'top',
        display: 'inline-block',
        width: '60%',
    },
    content: {
        flex: '1 0 auto',

        marginTop: 25,
        marginLeft: 3,
    },
    buttonContent: {
        flex: '1 0 auto',
        justify: 'center',
        marginLeft: '7.5vw',
        marginTop: '7vh'
    },
    cover: {
        marginTop:'4%',
        width: '20%',
        height: 150,
        display:'inline-block',
        margin: 'auto 31px',
        marginRight: 0,
    },
    summary: {
        overflowY: 'hidden',
        height: '80px',
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    btn: {
        display:'inline-block',
        verticalAlign:'top',
        fontSize: 40,
        width:'10%',
        marginTop:'80px',
    },
    formButtons: {
        width: '17vw',
        height: '6vw',
        color: 'white',
        cursor: 'pointer',
        fontSize: '10rem',
        marginTop: '-10vh'
    }
}));
export default function PharmTutorialList(){
    const classes = useStyles();
    const {tutorial, setTutorial} = useContext(TutorialContext);
    const [tutorialArchive, setArchive] = useState([]);
    const [tutorialName, setTutorialName] = useState("");
    const [tutorialDescription, setTutorialDescription] = useState("");
    const [tutorialDuration, setTutorialDuration] = useState("");
    const [tutorialPlaylist, setTutorialPlaylist] = useState([
        {
        "name": "", 
        "description": "", 
        "pharmacistNotes": "", 
        "infusionNotes": "", 
        "stepList": "", 
        "video": 
            {"url": "", "order":"", "videoDescription":"", "thumbnail":""}
        },]);
    const [gridBools, setGridBools] = useState(["false"])
    const [openTutorialForm, setOpenTutorialForm] = useState(false);
    const [openTutorialFormTwo, setOpenTutorialFormTwo] = useState(false);
    const [tutorialSelect, setTutorialSelect] = useState(null);
    const [openTutorialPrompt, setTutorialPrompt] = useState(false);

    const handleTutorialPrompt = (event) => {
        tutorialArchive.map(tutorial => {
            if (tutorial._id === event.target.id){
                setTutorialSelect(tutorial.name);
                setTutorial(tutorial);
            }
        })
        setTutorialPrompt(!openTutorialPrompt);
    }
    const handleTutorialForm = () => {
        setOpenTutorialForm(!openTutorialForm);
    }
    const handleTutorialFormTwo = () => {
        setOpenTutorialForm(!openTutorialForm);
        setOpenTutorialFormTwo(!openTutorialFormTwo);
    }
    const handleTutorialName = (event) => {
        setTutorialName(event.target.value);
    }
    const handleTutorialDescription = (event) => {
        setTutorialDescription(event.target.value);
    }
    const handleTutorialDuration = (event) => {
        setTutorialDuration(event.target.value);
    }
    const handleChangeInput = (index, event) => {
        const values = [...tutorialPlaylist];
        if (event.target.name === "url" || event.target.name === "videoDescription"){
            values[index]["video"][event.target.name] = event.target.value
        }
        else {values[index][event.target.name] = event.target.value;}
        setTutorialPlaylist(values);
        console.log(tutorialPlaylist);
    }
    const parseThumbnail = (url) => {
        let https = url.slice(0, 8); // https://
        let site = `img.youtube.com/vi/`; // img.youtube.com/vi/
        let keyStartIndex = url.length-11;
        let videoKey = url.slice(keyStartIndex); // 11 char key
        let thumbnailRes = '/maxresdefault.jpg';

        return `${https}${site}${videoKey}${thumbnailRes}`;
    }

    const handleAddTutorialField = () => {
        setTutorialPlaylist([...tutorialPlaylist, 
            {"name": "", "description": "", "pharmacistNotes": "", "infusionNotes": "", 
            "stepList": "", 
            "video": 
                {"url": "", "order":"", "videoDescription":"", "thumbnail":""}
            },])
    }

    const handleRemoveFields = (index) => {
        console.log(index);
        const values = [...tutorialPlaylist];
        values.splice(index, 1);
        setTutorialPlaylist(values);
    }

    const toggleGridBools = (index) => {
        const values = [...gridBools];
        values[index] = !values[index];
        setGridBools(values);
    }

    const handleAddPatientTutorial = () => {
        const values = {
            name: tutorialName,
            description: tutorialDescription,
            duration: tutorialDuration,
            tutorials: [...tutorialPlaylist]
            }
        for (let i = 0; i < values["tutorials"].length; i++){
            values["tutorials"][i]["stepList"] = values["tutorials"][i]["stepList"].split(';');
            values["tutorials"][i]["video"]["order"] = i;
            values["tutorials"][i]["video"]["thumbnail"] = parseThumbnail(values["tutorials"][i]["video"]["url"]);
        }
        axios.post(`http://localhost:5000/tutorials/add`, values).then(res => {
        });
        setOpenTutorialFormTwo(!openTutorialFormTwo);
    }

    useEffect ( () => {
        axios.get('http://localhost:5000/tutorials/all').then(res => {
            setArchive(res.data);
        })
    },[])

        return <div className={classes.box}>
            <Card className={classes.root}>
                <CardContent className={classes.buttonContent}>
                    <Typography variant="h1" className={classes.formButtons} onClick={handleTutorialForm} align="center">+</Typography>
                </CardContent>
            </Card>
            {tutorialArchive.length !== 0 ? tutorialArchive.map((item) => {
                return  <Card className={classes.root}>
                            <CardMedia
                                className={classes.cover}
                                image={item.tutorials[0].video.thumbnail}
                                title="Live from space album cover"
                            />
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="h5" variant="h5">
                                        {item.name}
                                    </Typography>
                                    <Typography className={classes.summary} variant="subtitle1" >
                                        {item.description}
                                    </Typography>
                                    <Typography variant="subtitle1" >
                                        Duration: {item.duration}
                                    </Typography>
                                </CardContent>
                            </div>
                            <ArrowForwardIosIcon onClick={handleTutorialPrompt} id={item._id} className={classes.btn}></ArrowForwardIosIcon>
                        </Card>
            })
        : "Loading..."}
        <Dialog
            open={openTutorialForm}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleTutorialForm}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Add Tutorial Form - Playlist Summary</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    <TextField name="tutorialName" label="Tutorial Name" variant="outlined" value={tutorialName} onChange={handleTutorialName} fullWidth required />
                    <TextField name="tutorialDescription" label="Tutorial Description" variant="outlined" value={tutorialDescription} onChange={handleTutorialDescription} fullWidth required />
                    <TextField name="tutorialDuration" label="Tutorial Duration" variant="outlined" value={tutorialDuration} onChange={handleTutorialDuration} fullWidth required />
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleTutorialForm} color="primary">
                    Close
                </Button>
                <Button onClick={handleTutorialFormTwo} variant="contained" color="primary">
                    Next
                </Button>
                </DialogActions>
        </Dialog>
        <Dialog
            open={openTutorialFormTwo}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleTutorialFormTwo}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Add Tutorial Form - Playlist Videos</DialogTitle>
                <DialogContent>
                <DialogContentText>
                {tutorialPlaylist.map((video, index) => {
                        return <Grid container>
                        {gridBools[index] === false ? <Grid xs={11}>
                            <Typography variant="subtitle2" fullWidth>{`${video.name === "" ? "New Video" : video.name }`}</Typography>
                            <TextField className="videoInput" required fullWidth name="name" label="Name of Video" variant="outlined" value={video.name} onChange={event => handleChangeInput(index, event)}/>
                            <TextField className="videoInput" required fullWidth name="description" label="Video description" variant="outlined" value={video.description} onChange={event => handleChangeInput(index, event)}/>
                            <TextField className="videoInput" required fullWidth name="pharmacistNotes" label="Pharmacist Notes" variant="outlined" value={video.pharmacistNotes} onChange={event => handleChangeInput(index, event)}/>
                            <TextField className="videoInput" required fullWidth name="infusionNotes" label="Infusion Notes" variant="outlined" value={video.infusionNotes} onChange={event => handleChangeInput(index, event)}/>
                            <TextField className="videoInput" required fullWidth name="stepList" label="Instructions separated by a semi-colon" variant="outlined" value={video.stepList} onChange={event => handleChangeInput(index, event)}/>
                            <TextField className="videoInput" required fullWidth name="url" label="Single Youtube Video URL" variant="outlined" value={video.video.url} onChange={event => handleChangeInput(index, event)}/>
                            <TextField className="videoInput" required fullWidth name="videoDescription" label="Description of video" variant="outlined" value={video.video.description} onChange={event => handleChangeInput(index, event)}/>
                        </Grid> : <Grid xs={11}><Typography variant="subtitle2" fullWidth>{`${video.name === "" ? "New Video" : video.name }`}</Typography></Grid>}
                        {gridBools[index] === false ? <Grid xs={1}><Button onClick={() => toggleGridBools(index)}><ExpandMoreIcon/></Button></Grid> :
                        <Grid xs={1}>
                            <Button onClick={() => toggleGridBools(index)}><KeyboardArrowRightIcon/></Button>
                            <Button disabled={tutorialPlaylist.length === 1} onClick={() => handleRemoveFields(index)}><RemoveIcon/></Button>
                            <Button onClick={handleAddTutorialField}><AddIcon/></Button>
                        </Grid>}
                        </Grid>
                    })}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleTutorialFormTwo} color="primary">
                    Back
                </Button>
                <Button onClick={handleAddPatientTutorial} variant="contained" color="primary">
                    Submit
                </Button>
                </DialogActions>
        </Dialog>
        <Dialog
            open={openTutorialPrompt}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleTutorialPrompt}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Tutorial Select</DialogTitle>
            <DialogContent>
            <DialogContentText>
                <Typography>Go to {tutorialSelect} Tutorial? </Typography>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleTutorialPrompt} color="primary">
                Close
            </Button>
            <Link to="/tutorialPage"><Button disabled={tutorial === null} variant="contained" color="primary">
                View
            </Button></Link> 
            </DialogActions>
        </Dialog>
        </div>
}