import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles, useTheme, withTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    box:{
        width :'100%',
        display: 'inline-block',
    },
    root: {
        display:'inline-block',
        // float:'left',
        margin:'2.5vw',
        backgroundColor: '#3F51B5',
        width: "45vw",
        height: "216px",
        marginTop: '33px',
        borderRadius: 20,
        color: 'white',
        backgroundColor: '#00529b',
    },
    details: {
        verticalAlign:'top',
        display: 'inline-block',
        width: '60%',
    },
    content: {
        flex: '1 0 auto',

        marginTop: 25,
        marginLeft: 3,
    },
    cover: {
        marginTop:'4%',
        width: '20%',
        height: 150,
        display:'inline-block',
        margin: 'auto 31px',
        marginRight: 0,
    },
    summary: {
        //marginBottom: 30,
        overflowY: 'hidden',
        height: '80px',
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    btn: {
        display:'inline-block',
        verticalAlign:'top',
        fontSize: 40,
        width:'10%',
        marginTop:'80px',
    }
}));
export default function PharmTutorialList(){
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const [list, setList] = useState([]);
    //const initList = async () => {

    // const tutorials = [{
    //   id: 0,
    //   name: 'Infusion A',
    //   summary: `Lorem ipsum dolor sit amet`,
    //   duration: '20 min',
    //   img: 'https://picsum.photos/seed/picsum/150/150',
    // }, {
    //   id: 1,
    //   name: 'Infusion B'
    //   summary: 'Summary B',
    //   duration: '15 min',
    //   img: 'https://picsum.photos/seed/picsum/150/150',
    // }, {
    //   id: 2,
    //   name: 'Infusion C',
    //   summary: 'Summary C',
    //   duration: '17 min',
    //   img: 'https://picsum.photos/seed/picsum/150/150',
    // }] 

    //};
    useEffect(async () => {
        const response = await fetch('http://localhost:5000/tutorials/all');
        const tutorials = await response.json();
        setList(tutorials)
        console.log(list);
    }, [])


    const handleChange = (id) => {
        history.push('/Tutorial/' + id);
    }

        return <div className={classes.box}>{
            list.map((item) => {
                return  <Card onClick={() => handleChange(item._id)} className={classes.root}>
                            <CardMedia
                                className={classes.cover}
                                image={item.img}
                                title="Live from space album cover"
                            />
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="h5" variant="h5">
                                        {item.name}
                                    </Typography>
                                    <Typography className={classes.summary} variant="subtitle1" >
                                        {item.description}
                                    </Typography>
                                    <Typography variant="subtitle1" >
                                        Duration: {item.duration}
                                    </Typography>
                                </CardContent>
                            </div>
                            <ArrowForwardIosIcon className={classes.btn}></ArrowForwardIosIcon>
                        </Card>
            })

        }</div>
}