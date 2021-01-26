import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
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
        width: '50%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px',
        marginBottom: '20px'

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
            
            <Typography variant='h2' className={classes.pageTitle}>Contact Us</Typography>
            
            <img
                src={ContactImage}
                alt="Pharmacist holding a medicine bottle"
                className={classes.image} />

            <Box align='center'>
                {info.map((info) => (
                    <Box width="50%" alignContent='center'>
                        <Card>
                            <CardHeader
                                className={classes.cardHeader}
                                title={info.title}
                                align='center'
                            />
                            <CardContent>
                                <Typography align='center' >{info.subtitleOne}</Typography>
                                <Typography align='center' >{info.infoOne}</Typography>
                                
                                <Typography align='center' >{info.subtitleTwo}</Typography>
                                <Typography align='center' >{info.infoTwo}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                
                ))}
            </Box>
            
            
        </Container>

        
    )
}
