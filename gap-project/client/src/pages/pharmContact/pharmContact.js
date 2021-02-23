import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import '../pharmContact/pharmContact.css'
import ContactImage from '../pharmContact/pharmContact_image2.png'
import axios from 'axios';

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
        width: '100%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px',
        marginBottom: '20px'

    },
    innerBox:{
        margin: '10px',
        border: '1px',
        borderColor: '#00529B',
        borderStyle: 'solid',
        borderRadius: '20px'
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
    const [pharmName, setPharmName] = useState("");
    const [pharmAddress, setPharmAddress] = useState({});
    const [pharmPhone, setPharmPhone] = useState("");
    const [pharmEmail, setPharmEmail] = useState("");
    
    useEffect( () => {
        axios.get('http://localhost:5000/pharmacies/all').then(res => {
            console.log("success")
            let address = {'streetName': "", 'city': "", 'state': "", 'zipCode': ""};
            let phone = "";
            let email = "";
            let name = "";
    
            for (const [key, val] of Object.entries(res.data)){
                if (key === 'streetName' || key === 'city' || key === 'state' || key === 'zipCode'){
                    address[key] = val;
                }
                if (key === 'phone'){
                    phone = val;
                }
                if (key === 'email'){
                    email = val;
                }
                if (key === 'name'){
                    name = val;
                }
            }
            setPharmName(name);
            setPharmAddress(address);
            setPharmEmail(email);
            setPharmPhone(phone);
        });
    },[])   

    return (
        <Container>
            {/* top half */}

            <Grid container>
                <Grid item xl={2} lg={2} xs={2}></Grid>
                
                <Grid item xs={12} md={8}>
                    <Typography variant='h3' className={classes.pageTitle}>Contact Us</Typography>
                    
                    <img
                        src={ContactImage}
                        alt="Single tree with clouds in the background"
                        className={classes.image} />
                </Grid>
                
                <Grid item xl={2} lg={2} xs={2}></Grid>
            </Grid>

            {/* bottom half */}
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>

                <Grid item xs={12} md={4}>
                    {pharmInfo.map((pharmInfo) => (
                        <Card borderRadius={30}>
                            <CardHeader
                                className={classes.cardHeader}
                                title={pharmInfo.title}
                                align='center'
                            />
                            <CardContent>
                                <Box className={classes.innerBox}>
                                    <Typography align='center' >Name: </Typography>
                                    <Typography align='center' >{pharmName}</Typography>
                                </Box>
                                <Box className={classes.innerBox}>
                                    <Typography align='center' >Address:</Typography>
                                    <Typography align='center' >{`${pharmAddress.streetName},\n${pharmAddress.city}, ${pharmAddress.state} ${pharmAddress.zipCode}`}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
                    
                <Grid item xs={12} md={4}>
                    {contactInfo.map((contactInfo) => (
                        <Card>
                            <CardHeader
                                className={classes.cardHeader}
                                title={contactInfo.title}
                                align='center'
                            />
                            <CardContent>
                                <Box className={classes.innerBox}>
                                    <Typography align='center' >Phone Number:</Typography> 
                                    <Typography align='center' >{pharmPhone}</Typography>
                                </Box>
                                <Box className={classes.innerBox}>
                                    <Typography align='center' >Email:</Typography>
                                    <Typography align='center' >{pharmEmail}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>

                <Grid item xs={2} sm={4} md={2} lg={2} xl={2}></Grid>
            </Grid>
        </Container>
        
    )
}
