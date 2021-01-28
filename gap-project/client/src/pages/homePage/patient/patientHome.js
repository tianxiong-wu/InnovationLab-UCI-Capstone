import React, { useState, useEffect } from "react"
import { Grid } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import '../patient/patientHome.css'

export default function PatientHome(props){

    let propsName = "Jasmine";
    let nextInfusion = "Thursday, November 19th, 2020 at 6:00PM";
    let nextInfusionName = "Antibiotic";

    return(
        <Grid container>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}></Grid>
            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                <div className="summaryContainer">
                    <Typography variant="h4" className="nextInfusionSummary">Hi {propsName}, your next infusion is on</Typography>
                    <Typography variant="h4" className="nextInfusionSummary">{nextInfusion}</Typography>
                </div>
                <div className="widgetContainer">
                    <div className="leftWidgets">
                        <div className="infusionWidget">
                            <div className="infusionVideoContainer">
                                <img src="https://picsum.photos/600/400" className="infusionThumbnail"></img>
                            </div>
                            <div className="infusionLabel">
                                <Typography variant="h4">Next Infusion: {nextInfusionName}</Typography>
                            </div>
                        </div>
                        <div className="notifWidget">
                            <div className="notificationLabel">
                                <Typography variant="h4">Notifications</Typography>
                            </div>
                            <div className="notificationContainer">
                                <Typography variant="h4">notification component</Typography>
                                <Typography variant="h4">notification component</Typography>
                            </div>
                        </div>
                    </div>
                    <div className="scheduleWidget">
                        <div className="scheduleLabel">
                            <Typography variant="h4">Today's Schedule</Typography>
                        </div>
                        <div className="scheduleContainer">
                            <Typography variant="h4">Infusion Event</Typography>
                            <Typography variant="h4">Infusion Event</Typography>
                            <Typography variant="h4">Infusion Event</Typography>
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}></Grid>
        </Grid>
    )
}