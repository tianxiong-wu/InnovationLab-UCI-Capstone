import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function PatientSchedule(){
    return(
        <Grid>
            <Grid item xs={1}></Grid>
            <Grid container xs={10}>
                <Typography variant="h1">Month</Typography>
                <div>
                    date carousel
                </div>
                <div className="dayContainer">
                    <Typography>Tuesday</Typography>
                    <div className="scheduleContainer">
                        schedule components.
                    </div>
                </div>
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
    )
}