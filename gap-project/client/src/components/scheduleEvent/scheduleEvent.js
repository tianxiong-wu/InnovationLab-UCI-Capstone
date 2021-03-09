import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../UserContext";
import { TutorialContext } from "../../TutorialContext";
import "./scheduleEvent.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function ScheduleEvent(props){
    const {user, setUser} = useContext(UserContext);
    const {tutorial, setTutorial} = useContext(TutorialContext);
    const [tutorialSelect, setTutorialSelect] = useState(null);
    const [openTutorialPrompt, setTutorialPrompt] = useState(false);

    const handleTutorialPrompt = (event) => {
        console.log(user.infusionArray);
        console.log(props.tutorialId);
        user.infusionArray.map(tutorial => {
            if (tutorial._id === props.tutorialId){
                setTutorialSelect(tutorial.name);
                setTutorial(tutorial);
                console.log("true");
            }
        })
        setTutorialPrompt(!openTutorialPrompt);
    }
    return(
        <div className="scheduleItem" onClick={handleTutorialPrompt}>
            <div className="infusionTime">{props.time}</div>
            <div className="infusionName">{props.name}</div>
            <Dialog
                open={openTutorialPrompt}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleTutorialPrompt}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                <DialogContentText>
                    <div className="scheduleItemDialog">
                        <div className="infusionTimeDialog">{props.time}</div>
                        <div className="infusionNameDialog">{props.name}</div>
                    </div>
                    <Link to="/tutorialPage"><Button fullWidth className="viewTutorial" disabled={tutorial === null} variant="contained" color="primary">
                            View
                    </Button></Link> 
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="primary" onClick={handleTutorialPrompt}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}