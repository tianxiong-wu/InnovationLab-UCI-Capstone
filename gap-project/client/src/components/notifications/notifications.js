import React from "react";
import './notifications.css';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export default function Notification(props){
    return(
        <Card variant="outlined" className="cardContainer">
            <CardContent className="cardContents">
                <div className="leftCard">
                    <Typography variant="h6" color="secondary" align="left">{props.title}</Typography>
                    <Typography variant="subtitle2" align="left">{props.description}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}
