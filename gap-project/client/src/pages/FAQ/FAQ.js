import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import SearchBar from "material-ui-search-bar";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Questions = ({ questions }) => {


    const useStyles = makeStyles((theme) => ({
        root: {
            width: '80%',
            margin: '0 auto',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        question_answers: {
            marginTop: '20px',
        },
    }));
    const classes = useStyles();
    return (<div className={classes.root}>
        {questions.map((question, index) => {

            return <Accordion className={classes.question_answers}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                >
                    <Typography className={classes.heading}> {question.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {question.content}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        })
        }


    </div>)
}

const FAQ = () => {

    const useStyles = makeStyles((theme) => ({
        searchBar: {
            width: '80%',
            borderRadius: '50px',
            margin: '0 auto',
            color: '#00529b',

        },
        title: {
            width: '100%',
            color: '#00529b',
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontSize: '24px',
            padding: '45px 0px 45px 0px',

        },
        information: {
            color: '#00529b',
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontSize: '18px',
            padding: '25px 0px 25px 0px',
        },
        title2: {
            color: '#00529b',
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontSize: '18px',
            padding: '50px 0px 25px 0px',
        }
    }));

    const [questions, setQuestions] = useState([{
        title: 'question 1', content: 'Aenean in lorem massa. Praesent mattis bibendum hendrerit. Nunc bibendum odio nisi, vitae efficitur lacus molestie ac. Aenean eget venenatis magna. Ut accumsan urna et ex fringilla, nec malesuada tortor aliquam. Curabitur ullamcorper urna id volutpat vestibulum. Pellentesque quam eros, mollis iaculis feugiat eu, tempus sit amet sapien.'
    }, {
        title: 'question 2', content: 'Aenean in lorem massa. Praesent mattis bibendum hendrerit. Nunc bibendum odio nisi, vitae efficitur lacus molestie ac. Aenean eget venenatis magna. Ut accumsan urna et ex fringilla, nec malesuada tortor aliquam. Curabitur ullamcorper urna id volutpat vestibulum. Pellentesque quam eros, mollis iaculis feugiat eu, tempus sit amet sapien.'
    }, {
        title: 'question 3', content: 'Aenean in lorem massa. Praesent mattis bibendum hendrerit. Nunc bibendum odio nisi, vitae efficitur lacus molestie ac. Aenean eget venenatis magna. Ut accumsan urna et ex fringilla, nec malesuada tortor aliquam. Curabitur ullamcorper urna id volutpat vestibulum. Pellentesque quam eros, mollis iaculis feugiat eu, tempus sit amet sapien.'
    }, {
        title: 'question 4', content: 'Aenean in lorem massa. Praesent mattis bibendum hendrerit. Nunc bibendum odio nisi, vitae efficitur lacus molestie ac. Aenean eget venenatis magna. Ut accumsan urna et ex fringilla, nec malesuada tortor aliquam. Curabitur ullamcorper urna id volutpat vestibulum. Pellentesque quam eros, mollis iaculis feugiat eu, tempus sit amet sapien.'
    }, {
        title: 'question 5', content: 'Aenean in lorem massa. Praesent mattis bibendum hendrerit. Nunc bibendum odio nisi, vitae efficitur lacus molestie ac. Aenean eget venenatis magna. Ut accumsan urna et ex fringilla, nec malesuada tortor aliquam. Curabitur ullamcorper urna id volutpat vestibulum. Pellentesque quam eros, mollis iaculis feugiat eu, tempus sit amet sapien.'
    }]);

    const [value, setValue] = useState('');
    const classes = useStyles();
    const handleSearch = (value) => {

    }


    return (
        <Container >
            <Typography variant="h4" className={classes.title}>
                How can we help you?
        </Typography>
            <SearchBar
                className={classes.searchBar}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                onRequestSearch={() => handleSearch(value)}
            >
            </SearchBar>
            <Typography variant="h4" className={classes.title2}>
                Frequently Asked Questions
        </Typography>
            <Questions questions={questions}></Questions>
            <Typography variant="h4" className={classes.information}>
                Still have questions? <br />
            Contact us using online Help <br />
            or call 123-456-7890
        </Typography>

        </Container>
    )
}

export default FAQ;