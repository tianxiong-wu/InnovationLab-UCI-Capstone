import React, { useState, useEffect } from "react"
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
import './pharmAssign.css'

const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1, },
    box: {
        display: 'flex',
        backgroundColor: '#3F51B5',
        width: "90%",
        height: "150px",
        margin: '0 auto',
        marginTop: '33px',
        borderRadius: 20,
        color: 'white',
        backgroundColor: '#00529b',
        textAlign: 'left',
        fontSize: '14px'
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
        width: 50,
        height: 50,
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
    btn: {
        margin: 'auto',
        fontSize: 40,
        padding:'5px',
        float:"right",
        backgroundColor: '#00529B',
        border:  '1px solid white',
        fontSize: 20,
        padding:'0',
        float:"right"
    }
}));


let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const TutorialsList = ({list})=>{
    
    const classes = useStyles();
   return <>{list.map((item) => {
        return <Card className={classes.box}>
            <CardMedia
                className={classes.cover}
                image={item.img}
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
            <ArrowForwardIosIcon className={classes.btn} style={{border:'none'}}></ArrowForwardIosIcon>
        </Card>
    })}</>
}


const AddTutorialsList = ({list})=>{
    
    const classes = useStyles();
   return <>{list.map((item) => {
        return <Card className={classes.box}>
            <CardMedia
                className={classes.cover}
                image={item.img}
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
            <AddIcon className={classes.btn}></AddIcon>
        </Card>
    })}</>
}



export default function PharmAssign(props) {

    let nextInfusionName = "Antibiotic";

    const classes = useStyles();
    const theme = useTheme();

    const [list, setList] = useState([]);

    useEffect(async () => {
        const response = await fetch('http://localhost:5000/tutorials/all');
        const tutorials = await response.json();
        setList(tutorials)
    }, [])

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <Grid container justify="center" spacing={0}>


                    <Grid item xs={8} sm={8} md={5} className="">
                        <div>
                            <div style={{ textAlign: "left", height: '30vh' }}>
                                <Typography variant="h2">Name {nextInfusionName}</Typography>
                                <br />
                                <br />
                                <Typography variant="h5">Next Infusion: {nextInfusionName}</Typography>
                                <br />
                                <Typography variant="h6">Next Infusion: {nextInfusionName}</Typography>

                            </div>
                            <div className="">
                                <div className="notificationLabel">
                                    <Typography variant="h4">Today's Schedule <Button style={{marginLeft:10}} className={classes.btn} variant="contained">
                                    <svg width="30" height="30" viewBox="0 0 30 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="25" height="6" rx="2" fill="#FFFFFF"/>
                                    </svg>

                                        </Button><Button className={classes.btn} variant="contained">
                                    <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="8" width="30" height="4" rx="2" fill="#FFFFFF"/>
                                    <rect x="12" width="30" height="4" rx="2" transform="rotate(90 12 0)" fill="#FFFFFF"/>
                                    </svg>

                                    </Button></Typography>                            
                                </div>
                                <div className="notificationContainer">
                                    <ScheduleEvent time="12:30PM" name="Antibiotic Infusion" />
                                    <ScheduleEvent time="4:30PM" name="Antibiotic Infusion" />
                                    <ScheduleEvent time="8:30PM" name="Antibiotic Infusion" />
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={8} sm={8} md={5} style={{marginLeft:'50px'}} className="widgetContainer">
                        <div className="scheduleLabel">
                            <Typography variant="h4">Assigned Tutorials <Button style={{marginLeft:10}} className={classes.btn} variant="contained">
                                    <svg width="30" height="30" viewBox="0 0 30 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="25" height="6" rx="2" fill="#FFFFFF"/>
                                    </svg>

                                        </Button><Button className={classes.btn} variant="contained">
                                    <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="8" width="30" height="4" rx="2" fill="#FFFFFF"/>
                                    <rect x="12" width="30" height="4" rx="2" transform="rotate(90 12 0)" fill="#FFFFFF"/>
                                    </svg>

                                    </Button></Typography>
                        </div>
                        <div className="scheduleWidget">
                            <TutorialsList list={list} classes={classes}></TutorialsList>
                        </div>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    )
}