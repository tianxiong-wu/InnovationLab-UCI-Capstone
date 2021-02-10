import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import SearchBar from "material-ui-search-bar";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Questions from './question'
import './faq.css'
import axios from 'axios';

export default function FAQ(){
    const [questions, setQuestions] = useState([]);
    const [displayQuestions, setDisplayQuestions] = useState([{}]);
    const [value, setValue] = useState('');

    useEffect( () => {
        axios.get('http://localhost:5000/faqs/all').then(res => {
            let questionList = [];
            for (const [key, val] of Object.entries(res.data)){
                questionList.push([val.question, val.answer])
            }
            setQuestions(questionList);
        });
    }, []);

    function handleSearch(val){
        if (val === ""){
            return;
        }
        setValue(val);
        let questionList = [];
        questions.forEach((faq) => {
            if (faq[0].includes(val) || faq[1].includes(val)) {
                questionList.push(faq);
            }
        })
        setDisplayQuestions(questionList);
        console.log(displayQuestions);
    }


    return(
        <Container>
            <Typography variant="h4" className="title">How can we help you?</Typography>
            <SearchBar
                className="searchBar"
                value={value}
                type="text"
                onChange={(value) => handleSearch(value)}>
            </SearchBar>
            <Typography variant="h4" className="titleTwo">Frequently Asked Questions</Typography>
            <Questions questionList={displayQuestions} />
            <Typography variant="h4" className="information">
                Still have questions?<br/>Contact us using online help<br/>Or call 123-456-7890
            </Typography>
        </Container>
    )
}
