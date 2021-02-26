import React, {useState, useEffect} from "react";
import "./profile.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function PatientProfile(){
    return(
        <Grid container className="profileContainer">
            <Grid item xs={2}></Grid>
            <Grid item xs={8} justify="center">
                <div className="patientProfileInfo">
                    <Typography align="center" variant="h3" className="patientName">Jasmine Miller</Typography>
                    <Typography align="center" variant="h4">Pharmacy: </Typography>
                    <Typography align="center" variant="h4">Phone Number: </Typography>
                </div>
                <div className="infusionSummaryContainer">
                    <Typography align="center" variant="h4">Summary of Infusion</Typography>
                    <div className="infusionSummary">
                        Notes from pharmacist here
                    </div>
                </div>
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    )
}