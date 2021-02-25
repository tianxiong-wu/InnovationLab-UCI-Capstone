import React, { useEffect, useState,useCallback } from 'react';
import { makeStyles, useTheme, withTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      backgroundColor:'#3F51B5',
      width: "70%",
      height: "216px",
      margin: '0 auto',
      marginTop: '33px',
      borderRadius: 20,
      color: 'white',
      backgroundColor: '#00529b',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: '60%',
    },
    content: {
      flex: '1 0 auto',

      marginTop: 25,
      marginLeft: 3,
    },
    cover: {
      width: 150,
      height: 150,
      margin:'auto 31px',
      marginRight:0,
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
    btn:{
        margin: 'auto',
        marginRight: 47,
        fontSize: 40,
    },
    cardContainer:{
      width: "100%",
      height: "100vh",
      overflowY: 'scroll'
    }
  }));

const Tutorials = ()=>{
    const classes = useStyles();
    const theme = useTheme();
    const [list, setList] = useState([]);

    useEffect(()=>{
      let tutorialArr = [];
      axios.get('http://localhost:5000/tutorials/all').then(res => {
        tutorialArr = res.data;
        setList(tutorialArr);
      })
    },[])


   return <><div className={classes.cardContainer}>{
    list.map((item)=>{
        return <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={item['tutorial'][0]['videoUrl']['thumbnail']}
          title="Infusion Details"
        />
         <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {item['name']}
            </Typography>
            <Typography className={classes.summary} variant="subtitle1" >
             {item['description']}
            </Typography>
            <Typography variant="subtitle1" >
            Duration: {item['duration']}
            </Typography>
          </CardContent>
        </div>
        <ArrowForwardIosIcon className={classes.btn}></ArrowForwardIosIcon>
      </Card>
    })
   }
   </div></>
}

export default Tutorials;