import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const THUMBNAIL_URL = 'https://studlife.com/media/pdf/';

const PreviousIssues = ({ previousIssues }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const yearsAccordion = () => {
    const elements = Object.entries(previousIssues).map((e) => {
      const year = e[0];
      return (
        <Accordion expanded={expanded === `panel1-${year}`} onChange={handleChange(`panel1-${year}`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${year}-content`}
            id={`${year}-header`}
          >
            {e[0]}
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
      );
    });
    return elements;
  };

  return (
    <>
      {yearsAccordion()}
    </>
  );
};

export default PreviousIssues;
