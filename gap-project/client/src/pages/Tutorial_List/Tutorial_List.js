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
        
    }
  }));

const Tutorials = ()=>{
    const classes = useStyles();
    const theme = useTheme();
   const [list, setList] = useState([]);
   const initList = useCallback(()=>{

    const tutorials = [{
        name:'Infusion A',
        summary:`Lorem ipsum dolor sit amet`,
        duration:'20 min',
        img:'https://picsum.photos/seed/picsum/150/150',
    },{
        name:'Infusion B',
        summary:'Summary B',
        duration:'15 min',
        img:'https://picsum.photos/seed/picsum/150/150',
    },{
        name:'Infusion C',
        summary:'Summary C',
        duration:'17 min',
        img:'https://picsum.photos/seed/picsum/150/150',
    }]
    setList(tutorials)
   },[list]);
   useEffect(()=>{
        initList();
   },[])


   return <>{
    list.map((item)=>{
        return <Card className={classes.root}>
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
             {item.summary}
            </Typography>
            <Typography variant="subtitle1" >
            Duration: {item.duration}
            </Typography>
          </CardContent>
        </div>
        <ArrowForwardIosIcon className={classes.btn}></ArrowForwardIosIcon>
      </Card>
    })

   }</>
}

export default Tutorials;