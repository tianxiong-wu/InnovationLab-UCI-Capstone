import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../UserContext";
import "./profile.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function PatientProfile(){

    const {user, setUser} = useContext(UserContext);


    return(
        <Grid container className="profileContainer">
            <Grid item xs={2}></Grid>
            <Grid item xs={8} justify="center">
                <div className="patientProfileInfo">
                    <Typography align="center" variant="h3" className="patientName">{`${user.firstName} ${user.lastName}`}</Typography>
                    <Typography align="center" variant="h4">Pharmacy: </Typography>
                    <Typography align="center" variant="h4">Phone Number: {`${user.phoneNumber}`} </Typography>
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