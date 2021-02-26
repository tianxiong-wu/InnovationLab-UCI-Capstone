import React,{useState, useEffect} from "react";
import {Grid, Typography} from "@material-ui/core";
import "./tutorial.css";
import Tutorial from "../TutorialPage/tutorial";
import axios from 'axios';

export default function PatientTutorials(){

    const [tutorials, setTutorials] = useState([]);
    const [tutorialsClicked, setTutorialsClicked] = useState([]);
    const [tutorialsLoaded, setTutorialsLoaded] = useState(false);

    useEffect(() => {
        let tutorialsArr = [];
        let tutorialsBoolArr = [];
        axios.get('http://localhost:5000/tutorials/all').then(res=>{
            tutorialsArr = res.data;
            setTutorials(tutorialsArr);
            for (let i = 0; i < tutorialsArr.length; i++){
                tutorialsBoolArr.push(true);
            }
            setTutorialsClicked(tutorialsBoolArr);
            setTutorialsLoaded(true);
        })
    },[])

    const handleTutorialClicked = (index) => {
        let clickedArr = [];
        for (let i = 0; i < tutorials.length; i++){
            if (i !== index){
                clickedArr.push(false);
            }
        }
        setTutorialsClicked(clickedArr);
    }
    
    return (
        <Grid>
            {tutorials.map((item, index) => {
                return <Tutorial num={index}/>    
            })}
        </Grid>
    )
}