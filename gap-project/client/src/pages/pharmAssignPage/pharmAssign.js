import React, { useState, useEffect, useContext } from "react";
import {UserContext} from "../../UserContext";
import {PatientContext} from "../../PatientContext";
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import ScheduleEvent from "../../components/scheduleEvent/scheduleEvent";
import Notifications from "../../components/notifications/notifications";
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
import { set } from "date-fns";

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
    const [selectedArchive, setSelectedArchive] = useState(null);
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
    const [selectedTutorial, setSelectedTutorial] = useState("");
    const [deleteTutorialForm, setDeleteTutorialForm] = useState(false);
    const [patientTutorials, setPatientTutorials] = useState([]);
    const [addTutorial, setAddTutorial] = useState("");
    const [availableTutorials, setAvailableTutorials] = useState([]);
    // Notification States
    const [openAddNotification, setOpenAddNotification] = useState(false);
    const [openDeleteNotification, setOpenDeleteNotification] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState("");
    const [notifTitle, setNotifTitle] = useState("");
    const [notifDescription, setNotifDescription] = useState("");

    const handleNotifTitle = (event) => {
        setNotifTitle(event.target.value);
    }
    const handleNotifDescription = (event) => {
        setNotifDescription(event.target.value);
    }
    const handleAddNotificationForm = () => {
        setOpenAddNotification(!openAddNotification);
    }
    const handleDeleteNotificationForm = () => {
        setOpenDeleteNotification(!openDeleteNotification);
    }

    const handleAddNotifications = () => {
        let pastNotifs = patient.notification;
        let notificationObj = { "notification" : [{
            title: notifTitle,
            description: notifDescription
        }]}
        pastNotifs.map((notif) => {
            notificationObj["notification"].push(notif);
        })
        axios.post(`http://localhost:5000/patients/updateNotification/${patient._id}`, notificationObj);
        setOpenAddNotification(!openAddNotification);
    }
     // Patient Info States
    const [infoSelection, setInfoSelection] = useState("Schedule");
    const handleInfoSelection = (event) => {
        setInfoSelection(event.target.value);
    }

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
    const handleNewEventId = (event) => {
        setEventId(event.target.value);
    }

    const handleEventForm = () => {
        setOpenEventForm(!openEventForm);
    }
    const handleTutorialForm = () => {
        setOpenTutorialForm(!openTutorialForm);
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
                description: eventDescription,
                tutorialId: selectedArchive
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

    const handleSelectedArchive = (event) => {
        setAddTutorial(event.target.value);
    }

    const handleAddPatientTutorial = () => {
        // get current infusion array of patient, add the selected one, post to route
        let currentArr = patient.infusionArray;
        currentArr.push(addTutorial);
        let values = { "infusionArray": currentArr }
        axios.post(`http://localhost:5000/patients/updateInfusion/${patient._id}`, values);
        setOpenTutorialFormTwo(!openTutorialFormTwo);
    }
    const handleDeleteTutorialForm = () => {
        setDeleteTutorialForm(!deleteTutorialForm);
    }
    const handleDeletePatientTutorial = () => {
        let patientTutorialsArr = patient.infusionArray;
        const values = {"infusionArray": []}
        patientTutorialsArr.map(item => {
            if (item._id !== selectedTutorial){
                values["infusionArray"].push(item);
            }
        })
        axios.post(`http://localhost:5000/patients/updateInfusion/${patient._id}`, values);
        handleDeleteTutorialForm();
    }

    const handleNewTutorialId = (event) => {
        setSelectedTutorial(event.target.value);
    }

    const handleNewArchive = (event) => {
        setSelectedArchive(event.target.value);
    }

    useEffect(() => {
        setTodaysSchedule(getTodaysSchedule);
        if (patient.hasOwnProperty('events')){
            setPatientEvents(patient.events);
        }
        else {
            setPatientEvents([]);
        }
        if (patient.hasOwnProperty('infusionArray')){
            setPatientTutorials(patient.infusionArray)
        }
        else {
            setPatientTutorials([]);
        }
        axios.get('http://localhost:5000/tutorials/all').then(res => {
            setAvailableTutorials(res.data);
        })

    },[])

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <Grid container justify="center" spacing={0}>
                    <Grid item xs={8} sm={8} md={5} className="assignPageContainer">
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
                                <div className="assignNotificationLabel">
                                    <FormControl >
                                            <Select
                                            labelId="demo-simple-select-label"
                                            value={infoSelection}
                                            onChange={handleInfoSelection}
                                            className="labelSelect"
                                            >
                                                <MenuItem value="Schedule">Schedule</MenuItem>
                                                <MenuItem value="Notifications">Notifications</MenuItem>
                                                <MenuItem value="Checkins">Check Ins</MenuItem>
                                            </Select>
                                        </FormControl> 
                                        {infoSelection === "Schedule"? <span><Button variant="outlined" className="addMinusBtns" onClick={handleEventForm}><AddIcon/></Button>
                                        <Button variant="outlined" className="addMinusBtns" onClick={handleDeleteEventForm}><RemoveIcon/></Button></span> : null}
                                        {infoSelection === "Notifications"? <span><Button variant="outlined" className="addMinusBtns" onClick={handleAddNotificationForm}><AddIcon/></Button>
                                        <Button variant="outlined" className="addMinusBtns" onClick={handleDeleteNotificationForm}><RemoveIcon/></Button></span> : null}
                                </div>
                                {infoSelection === "Schedule" ? <div className="assignNotificationContainer">
                                {todaysSchedule.length === 0 ? <Typography variant="h4" align="center" className="noInfusions">No Infusions Today</Typography> 
                                : todaysSchedule.map((item => {
                                    return <ScheduleEvent time={formatTime(new Date(item.notifyAt))} name={item.title}/>
                                }))}
                                </div> : null }
                                {infoSelection === "Notifications" ? <div className="assignNotificationContainer">
                                    {patient.notification.length === 0 ? <Typography variant="h4" align="center" className="noInfusions">No Notifications</Typography> 
                                    : patient.notification.map((notif) => {
                                        return <Notifications title={notif.title} description={notif.description}/>
                                    }) }
                                </div> : null}
                                {infoSelection === "Checkins" ? <div className="assignNotificationContainer">
                                    {patient.hasOwnProperty('recentCheckIn') ? `Recently checked on: ${patient.recentCheckIn}` : 'Patient has not been visited yet.'}
                                    {patient.hasOwnProperty('nextCheckIn') ? `Next check on: ${patient.nextCheckIn}` : 'No future checkup has been set.'}
                                    {patient.hasOwnProperty('recentCheckIn') === false && patient.hasOwnProperty('nextCheckIn') === false ? 'Please schedule your next check in.' : null} 
                                </div> : null}
                                <Dialog
                                    open={openAddNotification}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleAddNotificationForm}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description">
                                    <DialogTitle>Add Notification Form</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                        <TextField label="Title" variant="outlined" onChange = {handleNotifTitle} fullWidth required />
                                        <TextField label="Description" variant="outlined" onChange = {handleNotifDescription} fullWidth required />
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleAddNotificationForm} color="primary">
                                        Close
                                    </Button>
                                    <Button onClick={handleAddNotifications} variant="contained" color="primary">
                                        Submit
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                                <Dialog
                                    open={openEventForm}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleEventForm}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description">
                                    <DialogTitle>Add Scheule Event Form</DialogTitle>
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
                                        <FormControl className="selectInput">
                                            <InputLabel>Select a tutorial for this event...</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            value={selectedArchive}
                                            onChange={handleNewArchive}
                                            >
                                                {patient.infusionArray.map((tutorial) => {
                                                    return <MenuItem value={tutorial._id}>{tutorial.name}</MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
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
                        <div className="assignScheduleLabel">
                            <Typography variant="h4">
                                Assigned Tutorials<Button variant="outlined" className="addMinusBtns" onClick={handleTutorialForm}><AddIcon/></Button>
                                <Button variant="outlined" className="addMinusBtns" onClick={handleDeleteTutorialForm}><RemoveIcon/></Button>
                            </Typography>  
                        </div>
                        <div className="assignScheduleWidget">
                            {<TutorialsList classes={classes}></TutorialsList>}
                            <Dialog
                                    open={openTutorialForm}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleTutorialForm}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle>Assign Tutorial Form</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                    <FormControl className="selectInput">
                                        <InputLabel>Assign Tutorial...</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        value={addTutorial}
                                        onChange={handleSelectedArchive}
                                        >
                                        {availableTutorials.map(tutorial => {
                                            return <MenuItem value={tutorial}>{tutorial.name}, {tutorial.duration}</MenuItem>
                                        })}
                                        </Select>
                                    </FormControl>
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleTutorialForm} color="primary">
                                        Close
                                    </Button>
                                    <Button onClick={handleAddPatientTutorial} variant="contained" color="primary">
                                        Assign
                                    </Button>
                                    </DialogActions>
                            </Dialog>
                            <Dialog
                                    open={deleteTutorialForm}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleDeleteTutorialForm}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    <DialogTitle>Delete Tutorial Form</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                    <FormControl className="selectInput">
                                        <InputLabel>Select a tutorial...</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        value={selectedTutorial}
                                        onChange={handleNewTutorialId}
                                        >
                                        {patientTutorials.length !== 0 ? patientTutorials.map((tutorial) => {
                                            return <MenuItem value={tutorial._id}>{`${tutorial.name}; ${tutorial.description}`}</MenuItem>
                                        }): "No Tutorials Found"}
                                        </Select>
                                    </FormControl>
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleDeleteTutorialForm} color="primary">
                                        Close
                                    </Button>
                                    <Button onClick={handleDeletePatientTutorial} variant="contained" color="primary">
                                        Delete
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