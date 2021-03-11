import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "../../UserContext";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ContactImage from '../pharmContact/pharmContact_image2.png';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import './settings.css'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      height: '100vh'
    },
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
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function PatientSettings(){

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [repeatPass, setRepeatPass] = useState("");
    const [pharmName, setPharmName] = useState("");
    const [pharmAddress, setPharmAddress] = useState({});
    const [pharmPhone, setPharmPhone] = useState("");
    const [pharmEmail, setPharmEmail] = useState("");
    const [pharmId, setPharmId] = useState("");
    const [openPharmacyForm, setOpenPharmacyForm] = useState(false);
    
    useEffect( () => {
        axios.get('http://localhost:5000/pharmacy/all').then(res => {
            let address = {'streetName': "", 'city': "", 'state': "", 'zipCode': ""};
            let phone = "";
            let email = "";
            let name = "";
            for (const [key, val] of Object.entries(res.data[0])){
                if (key === 'streetName' || key === 'city' || key === 'state' || key === 'zipCode'){
                    address[key] = val;
                }
                else if (key === 'phone'){
                    phone = val;
                }
                else if (key === 'email'){
                    email = val;
                }
                else if (key === 'name'){
                    name = val;
                }
            }
            setPharmName(name);
            setPharmAddress(address);
            setPharmEmail(email);
            setPharmPhone(phone);
            setPharmId(res.data[0]._id);
        });
    },[])   

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const handleCurrentPass = (event, newValue) => {
        setCurrentPass(newValue);
    }
    const handleNewPass = (event) => {
        setNewPass(event.target.value);
    }
    const handleRepeatPass = (event, newValue) => {
        setRepeatPass(newValue);
    }
    const handleNewPhone = (event) => {
        setPharmPhone(event.target.value);
    }
    const handleNewEmail = (event) => {
        setPharmEmail(event.target.value);
    }
    const handleNewName = (event) => {
        setPharmName(event.target.value);
    }
    const handlePharmacyForm = (event) => {
        setOpenPharmacyForm(!openPharmacyForm);
    }
    const handleUpdateAddress = (event) => {
        let address = pharmAddress;
        switch (event.target.id){
            case "pharmStreet":
                address.streetName = event.target.value;
                break;
            case "pharmCity":
                address.city = event.target.value;
                break;
            case "pharmState":
                address.state = event.target.value;
                break;
            case "pharmZipcode":
                address.zipCode = event.target.value;
                break;
        }
        setPharmAddress(address);
    }
    const handleUpdatePharmacy = () => {
        const value = {
            name: pharmName,
            streetName: pharmAddress.streetName,
            city: pharmAddress.city,
            state: pharmAddress.state,
            zipCode: pharmAddress.zipCode,
            phone: pharmPhone,
            email: pharmEmail
        }
        axios.post(`http://localhost:5000/pharmacy/updateInfo/${pharmId}`, value).then(res =>{ 
        })
        setOpenPharmacyForm(!openPharmacyForm);
    } 
    
    return (
        <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
            <div className={classes.root}>
                <Typography variant="h3" align="center" className="pageLabel">Settings</Typography>
                <div className="blueOutline">
                <AppBar position="static" className="appBar">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className="tabAlign">
                    <Tab label="Security" {...a11yProps(0)} className="tabs"/>
                    <Tab label="About Us" {...a11yProps(1)} className="tabs"/>
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} >
                    <div className="panelStyling">
                        <TextField 
                            type="password"
                            id="password"
                            label="Enter current password"
                            defaultValue={currentPass}
                            variant="outlined"
                            className="securityStyling"
                            onChange={handleCurrentPass}
                            fullWidth
                            required>
                        </TextField>
                        <TextField 
                            type="password"
                            id="password"
                            label="Enter new password"
                            defaultValue={newPass}
                            variant="outlined"
                            className="securityStyling"
                            onChange={handleNewPass}                            
                            fullWidth
                            required>
                        </TextField>
                        <TextField 
                            type="password"
                            id="password"
                            label="Confirm new password"
                            defaultValue={repeatPass}
                            variant="outlined"
                            className="securityStyling"
                            onChange={handleRepeatPass}
                            fullWidth
                            required>
                        </TextField>
                        <div className="saveButtonContainer"><Button variant="outlined" className="saveButton">Save</Button></div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <Container className={classes.cardRoot}>
                    {/* top half */}
                    <Grid container>
                        <Grid item xl={2} lg={2} xs={2}></Grid>
                        
                        <Grid item xs={12} md={8}>                            
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
                                <Card borderRadius={30}>
                                    <CardHeader
                                        className={classes.cardHeader}
                                        title="Pharmacy"
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
                        </Grid>
                        <Grid item xs={12} md={4}>
                                <Card>
                                    <CardHeader
                                        className={classes.cardHeader}
                                        title="Contact Information"
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
                        </Grid>
                        <Grid item xs={2} sm={4} md={2} lg={2} xl={2}></Grid>
                    </Grid>
                    <Grid container spacing={1}>
                            <Grid item xs={12} align="center">
                                <Button variant="outlined" className="updatePharmBtn" color="primary" onClick={handlePharmacyForm}>Update Pharmacy Info</Button>
                            </Grid>
                        </Grid>
                </Container>
                </TabPanel>
            </div>
            </div>
            </Grid>
            <Grid item xs={1}></Grid>
            <Dialog
                open={openPharmacyForm}
                TransitionComponent={Transition}
                keepMounted
                onClose={handlePharmacyForm}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle>Pharmacy Info Form</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    <TextField label="Pharmacy Name" variant="outlined" onChange={handleNewName} fullWidth required />
                    <TextField label="Street Name" onChange={handleUpdateAddress} id="pharmStreet" variant="outlined" fullWidth required />
                    <TextField label="City" onChange={handleUpdateAddress} id="pharmCity" variant="outlined" fullWidth required />
                    <TextField label="State" onChange={handleUpdateAddress} id="pharmState" variant="outlined" fullWidth required />
                    <TextField label="Zip Code" onChange={handleUpdateAddress} id="pharmZipcode" variant="outlined" fullWidth required />
                    <TextField label="Phone Number" onChange={handleNewPhone} variant="outlined" fullWidth required />
                    <TextField label="Email" onChange={handleNewEmail} variant="outlined" fullWidth required />
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handlePharmacyForm} color="primary">
                    Close
                </Button>
                <Button onClick={handleUpdatePharmacy} variant="contained" color="primary">
                    Update
                </Button>
                </DialogActions>
            </Dialog>
      </Grid>
    )
}