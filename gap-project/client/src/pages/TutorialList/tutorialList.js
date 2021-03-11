import React, {useState, useEffect, useContext} from "react";
import './tutorialList.css';
import {UserContext} from "../../UserContext";
import {TutorialContext} from "../../TutorialContext";
import {Grid, Card, CardMedia, CardContent, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function TutorialList(){
    const {user, setUser} = useContext(UserContext);
    const {tutorial, setTutorial} = useContext(TutorialContext);
    const [tutorialSelect, setTutorialSelect] = useState(null);
    const [openTutorialPrompt, setTutorialPrompt] = useState(false);

    const handleTutorialPrompt = (event) => {
        user.infusionArray.map(tutorial => {
            if (tutorial._id === event.target.id){
                setTutorialSelect(tutorial.name);
                setTutorial(tutorial);
            }
        })
        setTutorialPrompt(!openTutorialPrompt);
    }

    return(
        <Grid className="tutorialListContainer">
            <Grid container>
                <Grid xs={1} item></Grid>
                <Grid xs={10} item>
                    {user.infusionArray.length === 0 ? <Typography variant="h4" color="primary" align="center" className="defaultMsg">Your pharmacist has not assigned any tutorials for you yet. <br/>Please check back soon.</Typography>
                    : user.infusionArray.map((infusion) => {
                        return <Card className="cardRoot" >
                        <img src={infusion.tutorials[0].video.thumbnail} className="cover"></img>
                        <div className="cardDetails">
                            <CardContent>
                                <Typography variant="h5">
                                    {infusion.name}
                                </Typography>
                                <Typography variant="subtitle1" className="content">
                                    {infusion.description}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Duration: {infusion.duration} 
                                </Typography>
                            </CardContent>
                        </div>
                        <ArrowForwardIos id={infusion._id} onClick={handleTutorialPrompt} className="arrowButton"/>
                    </Card>
                    })}
                </Grid> 
                <Grid xs={1} item></Grid>
            </Grid>
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
           
        </Grid>
    )
}