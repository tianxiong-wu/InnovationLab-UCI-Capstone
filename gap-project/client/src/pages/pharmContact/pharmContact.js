import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import '../pharmContact/pharmContact.css'
import ContactImage from '../pharmContact/pharmContact_image.png'


const useStyles = makeStyles((theme) => ({
    pageTitle:{
        textAlign: 'center',
        margin: '20px'
    },
    cardHeader: {
        backgroundColor: '#00529B',
        color: '#FFFFFF'
        
    },
    image:{
        width: '75%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px',
        marginBottom: '20px'

    }


}));

const pharmInfo = [
    {
        title: 'Pharmacy',
        subtitleOne: 'Name:',
        infoOne: 'Pharmacy',
        subtitleTwo: "Location:",
        infoTwo: '2345 N. RandStreet, \n Tustin Ave, CA 92618'    
    }
];

const contactInfo =[
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
            <Grid container >
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Typography variant='h2' className={classes.pageTitle}>Contact Us</Typography>
                    
                    <img
                        src={ContactImage}
                        alt="Pharmacist holding a medicine bottle"
                        className={classes.image} />
                </Grid>
                <Grid item xs={2}></Grid>


            </Grid>

            <Grid>
                <Grid item xs={2}></Grid>

                <Grid item xs={4} justify='center'>
                    
                        {pharmInfo.map((pharmInfo) => (
                            //<Box alignContent='center'>
                                <Card>
                                    <CardHeader
                                        className={classes.cardHeader}
                                        title={pharmInfo.title}
                                        align='center'
                                    />
                                    <CardContent>
                                        <Typography align='center' >{pharmInfo.subtitleOne}</Typography>
                                        <Typography align='center' >{pharmInfo.infoOne}</Typography>
                                        
                                        <Typography align='center' >{pharmInfo.subtitleTwo}</Typography>
                                        <Typography align='center' >{pharmInfo.infoTwo}</Typography>
                                    </CardContent>
                                </Card>
                            //</Box>
                        
                    ))}
                    
                </Grid>
                    
                

                <Grid item xs={4} justify='center'>
                    {contactInfo.map((contactInfo) => (
                                //<Box  alignContent='center'>
                                    <Card>
                                        <CardHeader
                                            className={classes.cardHeader}
                                            title={contactInfo.title}
                                            align='center'
                                        />
                                        <CardContent>
                                            <Typography align='center' >{contactInfo.subtitleOne}</Typography>
                                            <Typography align='center' >{contactInfo.infoOne}</Typography>
                                            
                                            <Typography align='center' >{contactInfo.subtitleTwo}</Typography>
                                            <Typography align='center' >{contactInfo.infoTwo}</Typography>
                                        </CardContent>
                                    </Card>
                                //</Box>
                            
                    ))}
                </Grid>

                <Grid item xs={2}></Grid>
                
            
            </Grid>
        </Container>

        
    )
}
