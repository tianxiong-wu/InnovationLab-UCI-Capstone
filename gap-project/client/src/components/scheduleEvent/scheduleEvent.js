import React from "react";
import "./scheduleEvent.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function ScheduleEvent(props){
    return(
        <div className="scheduleItem">
            <div className="infusionTime">{props.time}</div>
            <div className="infusionName">{props.name}</div>
        </div>
    )
}