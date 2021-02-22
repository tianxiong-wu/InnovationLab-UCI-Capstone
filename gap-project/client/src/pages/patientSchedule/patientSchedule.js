import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import './patientSchedule.css';


export default function PatientSchedule(){

    const [currentDay, setCurrentDay] = useState(new Date());
    const [days, setDays] = useState([]);
    const [render, setRender] = useState(false);
    const [earliest, setEarliest] = useState(days[0]);
    const [selected, setSelected] = useState("");

    let week = [];
    
    useEffect(() => {
        for (let i=1; i<=7; i++){
            let first = currentDay.getDate() - currentDay.getDay() + i;
            let day = new Date(currentDay.setDate(first)).toISOString().slice(0,10);
            week.push(day);
        }
        setDays(week);
        setRender(true);
    }, []);    

    const getCurrentDay = (day) => {
        let numDate = day.substr(-2);
        let newDate = new Date(day);
        switch (newDate.getDay()){
            case 0:
                return ["Mo", numDate];
            case 1:
                return ["Tu", numDate];
            case 2: 
                return ["We", numDate];
            case 3:
                return ["Th", numDate];
            case 4:
                return ["Fr", numDate];
            case 5:
                return ["Sa", numDate];
            case 6:
                return ["Su", numDate];
        }
    }

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

    // on click month, show modal calendar pick

    // left arrow, decrement all current dates by one week
    const handleNextDay = () => {
        let week = days;
        let newDate = new Date(week[week.length-1]);
        let nextDay = new Date(newDate.setDate(newDate.getDate()+1)).toISOString().slice(0,10);
        week.shift();
        week.push(nextDay);
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

    return(
        render === true ? 
        <Grid container>
            <Grid item xs={1}></Grid>
            <Grid container xs={10} justify="center" direction="column" className="gridStyling">
                <Typography variant="h3" align="center" className="monthStyling">{getCurrentMonth(new Date(days[0]).getMonth())}</Typography>
                <Grid className="carouselStyling" direction="row">
                    <ul className="weekDisplay">
                        <li className="weekDayDisplay arrowIcon" onClick={handlePrevDay}>&#60;</li>
                        <li className="weekDayDisplay">
                                <div className="dateContainer">
                                    <Typography variant="h3" align="center" className="nameDate">{getCurrentDay(days[0])[0]}</Typography>
                                    <Typography variant="h5" align="center" className="numDate">{getCurrentDay(days[0])[1]}</Typography>
                                </div>
                        </li>
                        <li className="weekDayDisplay">
                                <div className="dateContainer">
                                    <Typography variant="h3" align="center" className="nameDate">{getCurrentDay(days[1])[0]}</Typography>
                                    <Typography variant="h5" align="center" className="numDate">{getCurrentDay(days[1])[1]}</Typography>
                                </div>
                        </li>     
                        <li className="weekDayDisplay">
                                <div className="dateContainer">
                                    <Typography variant="h3" align="center" className="nameDate">{getCurrentDay(days[2])[0]}</Typography>
                                    <Typography variant="h5" align="center" className="numDate">{getCurrentDay(days[2])[1]}</Typography>
                                </div>
                        </li>     
                        <li className="weekDayDisplay">
                                <div className="dateContainer">
                                    <Typography variant="h3" align="center" className="nameDate">{getCurrentDay(days[3])[0]}</Typography>
                                    <Typography variant="h5" align="center" className="numDate">{getCurrentDay(days[3])[1]}</Typography>
                                </div>
                        </li>     
                        <li className="weekDayDisplay">
                                <div className="dateContainer">
                                    <Typography variant="h3" align="center" className="nameDate">{getCurrentDay(days[4])[0]}</Typography>
                                    <Typography variant="h5" align="center" className="numDate">{getCurrentDay(days[4])[1]}</Typography>
                                </div>
                        </li>     
                        <li className="weekDayDisplay">
                                <div className="dateContainer">
                                    <Typography variant="h3" align="center" className="nameDate">{getCurrentDay(days[5])[0]}</Typography>
                                    <Typography variant="h5" align="center" className="numDate">{getCurrentDay(days[5])[1]}</Typography>
                                </div>
                        </li>     
                        <li className="weekDayDisplay">
                                <div className="dateContainer">
                                    <Typography variant="h3" align="center" className="nameDate">{getCurrentDay(days[6])[0]}</Typography>
                                    <Typography variant="h5" align="center" className="numDate">{getCurrentDay(days[6])[1]}</Typography>
                                </div>
                        </li>                             
                        <li className="weekDayDisplay arrowIcon" onClick={handleNextDay}>&#62;</li>
                    </ul>
                </Grid>
                <Grid className="dayContainer">
                    <Typography variant="h3" align="center" className="dayStyling">{currentDay.toLocaleString('en-us', {weekday:'long'})}</Typography>
                    <div className="scheduleComponents">
                        <br/>
                        <div className="scheduleItem">
                            <div className="infusionTime">6:30AM</div>
                            <div className="infusionName">Antibiotic Infusion</div>
                        </div>
                        <div className="scheduleItem">
                            <div className="infusionTime">2:30PM</div>
                            <div className="infusionName">Antibiotic Infusion</div>
                        </div>  
                        <div className="scheduleItem">
                            <div className="infusionTime">10:30AM</div>
                            <div className="infusionName">Antibiotic Infusion</div>
                        </div>                   
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
        : "loading..."
    )
}