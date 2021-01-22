import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import '../pharmContact/pharmContact.css'


const useStyles = makeStyles((theme) => ({
    card: {
        // height: "100%",
        // width:"100%"
    },
    cardHeader: {
        backgroundColor: '#00529B',
        color: '#FFFFFF'
        
    }
}));

const info = [
    {
        title: 'Pharmacy',
        subtitleOne: 'Name:',
        infoOne: 'Pharmacy',
        subtitleTwo: "Location:",
        infoTwo: '2345 N. RandStreet, \n Tustin Ave, CA 92618'    
    },
    {
        title: 'Contact Information',
        subtitleOne: 'Phone Number:',
        infoOne: '123-456-7890',
        subtitleTwo: 'Email:',
        infoTwo: 'abc123@gmail.com'
    }
];

    
export default function Contact() {
    const classes = useStyles();
    
    return (
        <Container>
            
            <Typography variant='h2' align="center">Contact Us</Typography>
            {info.map((info) => (
                <Grid item xs={6} container spacing={3} justify="center" 
                    alignItems="center" direction = "row">
                    <Card>
                        <CardHeader
                            className={classes.cardHeader}
                            title={info.title}
                        />
                        <CardContent>
                            <Typography>{info.subtitleOne}</Typography>
                            <Typography>{info.infoOne}</Typography>
                            
                            <Typography>{info.subtitleTwo}</Typography>
                            <Typography>{info.infoTwo}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            
            
        </Container>

        
    )
}
