import React from "react";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import './question.css'

export default function Question(props){
    
    return (
        <div className="root">
            {props.questionList.map((faq, index) => {
                return <Accordion className="questionAnswers">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <Typography className="heading"> {faq[0]}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {faq[1]}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            })
            }
    </div>
    )
}
