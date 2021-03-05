import React, { useState, useEffect, useContext } from "react";
import {UserContext} from "../../UserContext";
import {PatientContext} from "../../PatientContext";
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import ScheduleEvent from "../../components/scheduleEvent/scheduleEvent";
import { makeStyles, useTheme, withTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import axios from 'axios';
import './pharmAssign.css'
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1, },
    box: {
        display: 'flex',
        backgroundColor: '#3F51B5',
        width: "90%",
        height: "200px",
        margin: '0 auto',
        marginTop: '33px',
        borderRadius: 20,
        color: 'white',
        backgroundColor: '#00529b',
        textAlign: 'left',
        fontSize: '14px',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '60%',
    },
    content: {
        flex: '1 0 auto',
        marginTop: 5,
        marginLeft: 3,
    },
    cover: {
        width: 100,
        height: 100,
        margin: 'auto 31px',
        marginRight: 0,
    },
    summary: {
        //marginBottom: 30,
        overflowY: 'hidden',
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));


let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const TutorialsList = ()=>{
    const {patient, setPatient} = useContext(PatientContext);
    const classes = useStyles();
   return <>{patient !== null ? patient.infusionArray.map((item) => {
        return <Card className={classes.box}>
            <CardMedia
                className={classes.cover}
                image={item.tutorials[0].video.thumbnail}
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
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
            <ArrowForwardIosIcon className="arrowIcon" style={{border:'none'}}></ArrowForwardIosIcon>
        </Card>
    }):"Loading..."}</>
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function PharmAssign() {
    const classes = useStyles();
    const {user, setUser} = useContext(UserContext); // pharmacist account context
    const {patient, setPatient} = useContext(PatientContext); // current patient in focus, context
    const [todaysSchedule, setTodaysSchedule] = useState([]); // today's schedule for the patient
    // Dialog States
    const [openEventForm, setOpenEventForm] = useState(false);
    const [openTutorialForm, setOpenTutorialForm] = useState(false);
    const [openTutorialFormTwo, setOpenTutorialFormTwo] = useState(false);
    const [openDeleteEventForm, setOpenDeleteEventForm] = useState(false);
    // Delete Event States
    const [eventId, setEventId] = useState("");
    // Add Event States
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [patientEvents, setPatientEvents] = useState([]);
    // Tutorial States
    const [tutorialName, setTutorialName] = useState("");
    const [tutorialDescription, setTutorialDescription] = useState("");
    const [tutorialDuration, setTutorialDuration] = useState("");
    const [tutorialPlaylist, setTutorialPlaylist] = useState([
        {"name": "", "description": "", "pharmacistNotes": "", "infusionNotes": "", 
        "stepList": "", 
        "video": 
            {"url": "", "order":"", "videoDescription":"", "thumbnail":""}
        },]);
    const [gridBools, setGridBools] = useState(["false"])

    const theme = useTheme();

    const formatTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+ minutes: minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime
    }
    const dayMonthYear = (date) => {
        let dd = String(date.getDate());
        let mm = String(date.getMonth()+1);
        let yy = String(date.getFullYear());
        let dateString = `${mm}/${dd}/${yy}`;
        return dateString;
    }
    const getTodaysSchedule = () => {
        let today = new Date();
        let scheduleArr = [];
        for (let i = 0; i < patient.events.length; i++){
            if (dayMonthYear(today) ===  dayMonthYear(new Date(patient.events[i].notifyAt))){
                scheduleArr.push(patient.events[i]);
            }
        }
        return scheduleArr;
    }

    /*
    * Event handlers for event object state
    */
    const handleTitleChange = (event) => {
        setEventTitle(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setEventDescription(event.target.value);
    }
    const handleSelectedDate = (date) => {
        console.log(date)
        console.log(date.getDate())
        setSelectedDate(date);
    }
    const handleSelectedTime = (date) => {
        setSelectedTime(date);
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
    const handleNewEventId = (event) => {
        setEventId(event.target.value);
    }
    const handleChangeInput = (index, event) => {
        console.log(index, event);
        const values = [...tutorialPlaylist];
        if (event.target.name === "url" || event.target.name === "videoDescription"){
            values[index]["video"][event.target.name] = event.target.value
        }
        else {values[index][event.target.name] = event.target.value;}
        setTutorialPlaylist(values);
    }

    const handleEventForm = () => {
        setOpenEventForm(!openEventForm);
    }
    const handleTutorialForm = () => {
        setOpenTutorialForm(!openTutorialForm);
    }
    const handleTutorialFormTwo = () => {
        setOpenTutorialForm(!openTutorialForm);
        setOpenTutorialFormTwo(!openTutorialFormTwo);
    }
    const handleDeleteEventForm = () => {
        setOpenDeleteEventForm(!openDeleteEventForm);
    }
    const handleAddPatientEvent = () => {
        let dateObj = (`${dayMonthYear(selectedDate)} ${selectedTime.toLocaleTimeString(navigator.language, {
            hour: '2-digit',
            minute:'2-digit'
          })}`);
        let patientEventsArr = patient.events;  
        const event = {
            "events": [
                {
                title: eventTitle,
                start: dateObj,
                end: dateObj,
                notifyAt: dateObj,
                description: eventDescription
                }
            ]}
        patientEventsArr.map(item => {
            event["events"].unshift(item);
        })  
        axios.post(`http://localhost:5000/patients/updateEvents/${patient._id}`, event).then(res => {
        })
        handleEventForm();
    }
    const handleDeletePatientEvent = () => {
        let patientEventsArr = patient.events;
        const event = {"events": []}
        patientEventsArr.map(item => {
            if (item._id !== eventId){
                event["events"].push(item);
            }
        })
        axios.post(`http://localhost:5000/patients/updateEvents/${patient._id}`, event).then(res => {
        })
        handleDeleteEventForm();
    }

    const handleAddPatientTutorial = () => {
        // axios put a tutorial object
    }
    
    const handleAddTutorialField = () => {
        setTutorialPlaylist([...tutorialPlaylist, 
            {"name": "", "description": "", "pharmacistNotes": "", "infusionNotes": "", 
            "stepList": "", 
            "video": 
                {"url": "", "order":"", "videoDescription":"", "thumbnail":""}
            },])
        console.log(tutorialPlaylist);
    }

    const handleRemoveFields = (index) => {
        console.log(index);
        const values  = [...tutorialPlaylist];
        values.splice(index, 1);
        setTutorialPlaylist(values);
    }

    const toggleGridBools = (index) => {
        const values = [...gridBools];
        values[index] = !values[index];
        setGridBools(values);
    }
    
    useEffect(() => {
        setTodaysSchedule(getTodaysSchedule);
        if (patient.hasOwnProperty('events')){
            setPatientEvents(patient.events);
        }
        else {
            setPatientEvents([]);
        }
    },[])

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <Grid container justify="center" spacing={0}>
                    <Grid item xs={8} sm={8} md={5} className="">
                        <div>
                            <div style={{ textAlign: "left", height: '30vh' }}>
                                <br />
                                <Typography variant="h2">{patient !== null ? `${patient.firstName} ${patient.lastName}` : "No User Selected"}</Typography>
                                <br />
                                <br />
                                <br />
                                <Typography variant="h6">Phone: {patient !== null ? `(${patient.phoneNumber.slice(0,3)}) ${patient.phoneNumber.slice(3,6)}-${patient.phoneNumber.slice(6)}` : "Loading..."}</Typography>
                                <Typography variant="h6">Email: {patient !== null ? patient.email : "Loading..."}</Typography>

                            </div>
                            <div className="">
                                <div className="notificationLabel">
                                    <Typography variant="h4">
                                        Today's Schedule <Button variant="outlined" className="addMinusBtns" onClick={handleEventForm}><AddIcon/></Button>
                                        <Button variant="outlined" className="addMinusBtns" onClick={handleDeleteEventForm}><RemoveIcon/></Button>
                                    </Typography>                                
                                </div>
                                <div className="notificationContainer">
                                {todaysSchedule.length === 0 ? <Typography variant="h4" align="center" className="noInfusions">No Infusions Today</Typography> 
                                : todaysSchedule.map((item => {
                                    return <ScheduleEvent time={formatTime(new Date(item.notifyAt))} name={item.title}/>
                                }))}
                                </div>
                                <Dialog
                                    open={openEventForm}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleEventForm}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <DialogTitle>Add Notification Event Form</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                        <TextField label="Title" variant="outlined" onChange = {handleTitleChange} fullWidth required />
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Select a Date"
                                                format="MM/dd/yyyy"
                                                value={selectedDate}
                                                fullWidth
                                                onChange={handleSelectedDate}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}/>
                                            <KeyboardTimePicker
                                            margin="normal"
                                            id="time-picker"
                                            label="Select a Time"
                                            value={selectedTime}
                                            fullWidth
                                            onChange={handleSelectedTime}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}/>
                                        </MuiPickersUtilsProvider>
                                        <TextField label="Description" variant="outlined" onChange = {handleDescriptionChange} fullWidth required />
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleEventForm} color="primary">
                                        Close
                                    </Button>
                                    <Button onClick={handleAddPatientEvent} variant="contained" color="primary">
                                        Submit
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                                <Dialog
                                    open={openDeleteEventForm}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleDeleteEventForm}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <DialogTitle>Delete Notification Event Form</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                    <FormControl className="selectInput">
                                        <InputLabel>Select an event...</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        value={eventId}
                                        onChange={handleNewEventId}
                                        >
                                        {patientEvents.length !== 0 ? patientEvents.map((event) => {
                                            return <MenuItem value={event._id}>{`${event.title} at ${dayMonthYear(new Date(event.notifyAt))} ${new Date(event.notifyAt).toLocaleTimeString(navigator.language, {
                                                hour: '2-digit',
                                                minute:'2-digit'
                                              })}`}</MenuItem>
                                        }): "No Events Found"}
                                        </Select>
                                    </FormControl>
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleDeleteEventForm} color="primary">
                                        Close
                                    </Button>
                                    <Button onClick={handleDeletePatientEvent} variant="contained" color="primary">
                                        Delete
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={8} sm={8} md={5} style={{marginLeft:'50px'}} className="widgetContainer">
                        <div className="scheduleLabel">
                            <Typography variant="h4">
                                Assigned Tutorials<Button variant="outlined" className="addMinusBtns" onClick={handleTutorialForm}><AddIcon/></Button>
                                <Button variant="outlined" className="addMinusBtns"><RemoveIcon/></Button>
                            </Typography>  
                        </div>
                        <div className="scheduleWidget">
                            {<TutorialsList classes={classes}></TutorialsList>}
                            <Dialog
                                    open={openTutorialForm}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleTutorialForm}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle>Add Tutorial Form - Tutorial Info</DialogTitle>
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
                                <DialogTitle>Add Tutorial Form - Tutorial Info</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                    {tutorialPlaylist.map((video, index) => {
                                            return <Grid container>
                                            {gridBools[index] === false ? <Grid xs={11}>
                                                <Typography variant="subtitle2" fullWidth>{`${video.name === "" ? "New Video" : video.name }`}</Typography>
                                                <TextField required fullWidth name="name" label="Name of Video" variant="outlined" value={video.name} onChange={event => handleChangeInput(index, event)}/>
                                                <TextField required fullWidth name="description" label="Tutorial Summary" variant="outlined" value={video.description} onChange={event => handleChangeInput(index, event)}/>
                                                <TextField required fullWidth name="pharmacistNotes" label="Pharmacist Commentary" variant="outlined" value={video.pharmacistNotes} onChange={event => handleChangeInput(index, event)}/>
                                                <TextField required fullWidth name="infusionNotes" label="Infusion Notes" variant="outlined" value={video.infusionNotes} onChange={event => handleChangeInput(index, event)}/>
                                                <TextField required fullWidth name="stepList" label="Instructions separated by a semi-colon" variant="outlined" value={video.stepList} onChange={event => handleChangeInput(index, event)}/>
                                                <TextField required fullWidth name="url" label="Single Youtube Video URL" variant="outlined" value={video.video.url} onChange={event => handleChangeInput(index, event)}/>
                                                <TextField required fullWidth name="videoDescription" label="Description of video" variant="outlined" value={video.video.description} onChange={event => handleChangeInput(index, event)}/>
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
                        </div>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    )
}
/**

 */