import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../UserContext";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ScheduleEvent from "../../components/scheduleEvent/scheduleEvent";
import './patientSchedule.css';


export default function PatientSchedule(){

    const {user, setUser} = useContext(UserContext);
    const getCurrentDay = (day) => {
        let numDate = day.substr(-2);
        let newDate = new Date(day);
        switch (newDate.getDay()){
            case 0:
                return ["Mo", numDate, "Monday"];
            case 1:
                return ["Tu", numDate, "Tuesday"];
            case 2: 
                return ["We", numDate, "Wednesday"];
            case 3:
                return ["Th", numDate, "Thursday"];
            case 4:
                return ["Fr", numDate, "Friday"];
            case 5:
                return ["Sa", numDate, "Saturday"];
            case 6:
                return ["Su", numDate, "Sunday"];
        }
    }
    const [currentDay, setCurrentDay] = useState(null);
    const [days, setDays] = useState([]);
    const [render, setRender] = useState(false);
    const [earliest, setEarliest] = useState(days[0]);
    const [todaysSchedule, setTodaysSchedule] = useState([]);

    let week = [];
    useEffect(() => {
        let curr = new Date(new Date()); // get current date  
        let first = curr.getDate() - curr.getDay(); // First day is the  day of the month - the day of the week  
        let firstday = new Date(curr.setDate(first)).toISOString().slice(0,10); 
        week = [firstday];
        for (let i=0; i<7; i++){
            week.push(new Date(curr.setDate(curr.getDate()+1)).toISOString().slice(0,10));
        }
        setDays(week);
        setRender(true);
        setTodaysSchedule(getTodaysSchedule(new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"})));
        setCurrentDay(getCurrentDay(new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"}))[2]);
    }, []);    

    

    const getCurrentMonth = (month) => {
        switch (month) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2: 
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
        }
    }

    // left arrow, decrement all current dates by one week
    const handleNextDay = () => {
        let week = days;
        let newDate = new Date(week[week.length-1]);
        let nextDay = new Date(newDate.getTime()+86400000).toISOString().slice(0,10);
        week.push(nextDay);
        week.shift();
        setDays(week);
        setEarliest(days[0]);
    }
    // right arrow, increment all current dates by one week
    const handlePrevDay = () => {
        let week = days;
        let newDate = new Date(week[0]);
        let prevDay = new Date(newDate.setDate(newDate.getDate()-1)).toISOString().slice(0,10);
        week.pop();
        week.unshift(prevDay);
        setDays(week);
        setEarliest(days[0]);
    }

    const getDayIndex = (dayID) => {
        switch (dayID){
            case "dayOne":
                return 0;
            case "dayTwo":
                return 1;
            case "dayThree":
                return 2;
            case "dayFour":
                return 3;
            case "dayFive":
                return 4;
            case "daySix":
                return 5;
            case "daySeven":
                return 6;
        }
    }

    const dayMonthYear = (date) => {
        let dd = String(date.getDate());
        let mm = String(date.getMonth());
        let yy = String(date.getFullYear());
        let dateString = `${mm}/${dd}/${yy}`;
        return dateString;
    }

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

    const getTodaysSchedule = (selected) => {
        let selectedDate = new Date(`${selected} 00:00:00`); //get new date object of a date passed into function
        let scheduleArr = []; // initialized schedule array
        for (let i = 0; i < user.events.length; i++){ // iter thru events
            if (dayMonthYear(selectedDate) ===  dayMonthYear(new Date(user.events[i].notifyAt))){ // compare the selectedDate with date of notifyAt 
                scheduleArr.push(user.events[i]); //push into schedule array
            }
        }
        return scheduleArr;
    }

    const handleNewCurrentDay = (event) => {
        let dayIndex = event.target.id; // get day index even if day changes
        let dayString = days[getDayIndex(dayIndex)]; // get the current date object
        setCurrentDay(getCurrentDay(dayString)[2]); // change current date to what was selected
        setTodaysSchedule(getTodaysSchedule(dayString)); // change the schedule output based on the selectedDay
    }

    return(
        render === true ? 
        <Grid container className="outerScheduleContainer">
            <Grid item xs={1}></Grid>
            <Grid container xs={10} justify="center" direction="column" className="gridStyling">
                <Typography variant="h3" align="center" className="monthStyling">{getCurrentMonth(new Date(days[0]).getMonth())}</Typography>
                <Grid className="carouselStyling" direction="row">
                    <ul className="weekDisplay">
                    <li className="weekDayDisplay " >
                            <div onClick={handlePrevDay} className="arrowIcon">&#60;</div>
                    </li>                        
                        <li className="weekDayDisplay">
                                <div className="dateContainer">
                                    <Typography variant="h3" align="center" className="nameDate">{getCurrentDay(days[0])[0]}</Typography>
                                    <Typography variant="h5" align="center" className="numDate" id="dayOne" onClick={handleNewCurrentDay}>{getCurrentDay(days[0])[1]}</Typography>
                                </div>
                        </li>
                        <li className="weekDayDisplay">
                                <div className="dateContainer">
                                    <Typography variant="h3" align="center" className="nameDate">{getCurrentDay(days[1])[0]}</Typography>
                                    <Typography variant="h5" align="center" className="numDate" id="dayTwo" onClick={handleNewCurrentDay}>{getCurrentDay(days[1])[1]}</Typography>
                                </div>
                        </li>     
                        <li className="weekDayDisplay">
                                <div className="dateContainer">
                                    <Typography variant="h3" align="center" className="nameDate">{getCurrentDay(days[2])[0]}</Typography>
                                    <Typography variant="h5" align="center" className="numDate" id="dayThree" onClick={handleNewCurrentDay}>{getCurrentDay(days[2])[1]}</Typography>
                                </div>
                        </li>     
                        <li className="weekDayDisplay">
                                <div className="dateContainer">
                                    <Typography variant="h3" align="center" className="nameDate">{getCurrentDay(days[3])[0]}</Typography>
                                    <Typography variant="h5" align="center" className="numDate" id="dayFour" onClick={handleNewCurrentDay}>{getCurrentDay(days[3])[1]}</Typography>
                                </div>
                        </li>     
                        <li className="weekDayDisplay">
                                <div className="dateContainer">
                                    <Typography variant="h3" align="center" className="nameDate">{getCurrentDay(days[4])[0]}</Typography>
                                    <Typography variant="h5" align="center" className="numDate" id="dayFive" onClick={handleNewCurrentDay}>{getCurrentDay(days[4])[1]}</Typography>
                                </div>
                        </li>     
                        <li className="weekDayDisplay">
                                <div className="dateContainer">
                                    <Typography variant="h3" align="center" className="nameDate">{getCurrentDay(days[5])[0]}</Typography>
                                    <Typography variant="h5" align="center" className="numDate" id="daySix" onClick={handleNewCurrentDay}>{getCurrentDay(days[5])[1]}</Typography>
                                </div>
                        </li>     
                        <li className="weekDayDisplay">
                                <div className="dateContainer">
                                    <Typography variant="h3" align="center" className="nameDate">{getCurrentDay(days[6])[0]}</Typography>
                                    <Typography variant="h5" align="center" className="numDate" id="daySeven" onClick={handleNewCurrentDay}>{getCurrentDay(days[6])[1]}</Typography>
                                </div>
                        </li>                             
                        <li className="weekDayDisplay" >
                            <div onClick={handleNextDay} className="arrowIcon">&#62;</div>
                        </li>
                    </ul>
                </Grid>
                <Grid className="dayContainer">
                    <Typography variant="h3" align="center" className="dayStyling">{currentDay}</Typography>
                    <div className="scheduleComponents">
                        <br/>
                        {todaysSchedule.length === 0 ? <Typography variant="h4" color="primary" align="center">No Infusions Today</Typography> : todaysSchedule.map((item => {
                            return <ScheduleEvent time={formatTime(new Date(item.notifyAt))} name={item.title}/>
                        }))}
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
        : "loading..."
    )
}