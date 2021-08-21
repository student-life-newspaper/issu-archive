import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CardActionArea,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const THUMBNAIL_URL = 'https://studlife.com/media/pdf/';

const monthArr = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const issueSchoolYear = (date) => {
  const issueJSDate = new Date(date);
  const issueYear = issueJSDate.getFullYear();
  return (issueJSDate.getMonth() + 1) <= 6
    ? `${(issueYear - 1).toString()}-${issueYear.toString()}`
    : `${issueYear.toString()}-${(issueYear + 1).toString()}`;
};
const issueArchiveDate = (date) => [date.substr(2, 2), date.substr(5, 2), date.substr(8, 2)].join('-');

const columnAccordionTheme = makeStyles({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  thumbnailWrapper: {
    padding: '13px 8px',
  },
  thumbnail: {
    height: 300,
    width: 200,
    backgroundPosition: 'center top',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  dateText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '8px',
  },
});

const IndividualIssues = (issuesArray, setSelectedIssue) => {
  const classes = columnAccordionTheme();
  const options = {
    year: 'numeric', month: 'long', day: 'numeric',
  };
  const issues = issuesArray.map((e) => {
    const { date, embed } = e;
    const dateString = new Date(date).toLocaleDateString('en-US', options);
    const thumbnailUrl = `url(${THUMBNAIL_URL}${issueSchoolYear(date)}/thumbs/${issueArchiveDate(date)}.jpg)`;
    return (
      <Grid key={date} item>
        <CardActionArea onClick={() => setSelectedIssue({ date: dateString, embed })}>
          <Paper className={classes.thumbnailWrapper}>
            <Box style={{ backgroundImage: thumbnailUrl }} className={classes.thumbnail} />
            <Box className={classes.dateText}>
              {dateString}
            </Box>
          </Paper>
        </CardActionArea>
      </Grid>
    );
  });
  return (
    <Grid container className={classes.root} spacing={2}>
      {issues}
    </Grid>
  );
};

const MonthAccordion = (months, division, year, setSelectedIssue) => {
  const [monthExpanded, setMonthExpanded] = useState(false);
  const classes = columnAccordionTheme();

  const handleMonthChange = (panel) => (event, isExpanded) => {
    setMonthExpanded(isExpanded ? panel : false);
  };

  return Object.entries(months)
    .sort((a, b) => monthArr.indexOf(a[0]) - monthArr.indexOf(b[0]))
    .map((e) => {
      const month = e[0];
      return (
        <Accordion expanded={monthExpanded === `panel-${year}-${division}-${month}`} onChange={handleMonthChange(`panel-${year}-${division}-${month}`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${year}-${division}-${month}-content`}
            id={`${year}-${division}-${month}-header`}
          >
            {month}
          </AccordionSummary>
          <AccordionDetails className={classes.flexColumn}>
            {IndividualIssues(e[1], setSelectedIssue)}
          </AccordionDetails>
        </Accordion>
      );
    });
};

const SubdivisionAccordion = (subdivisions, year, setSelectedIssue) => (
  Object.entries(subdivisions).map((e) => {
    const [subExpanded, setSubExpanded] = useState(false);
    const classes = columnAccordionTheme();

    const handleSubdivisionChange = (panel) => (event, isExpanded) => {
      setSubExpanded(isExpanded ? panel : false);
    };

    const division = e[0];
    return (
      <Accordion expanded={subExpanded === `panel-${year}-${division}`} onChange={handleSubdivisionChange(`panel-${year}-${division}`)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${year}-${division}-content`}
          id={`${year}-${division}-header`}
        >
          {division}
        </AccordionSummary>
        <AccordionDetails className={classes.flexColumn}>
          {MonthAccordion(e[1], e[0], year, setSelectedIssue)}
        </AccordionDetails>
      </Accordion>
    );
  })
);

const PreviousIssues = ({ issues, setSelectedIssue }) => {
  const [expanded, setExpanded] = useState(false);
  const classes = columnAccordionTheme();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const yearsAccordion = () => {
    const elements = Object.entries(issues).map((e) => {
      const year = e[0];
      return (
        <Accordion expanded={expanded === `panel-${year}`} onChange={handleChange(`panel-${year}`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${year}-content`}
            id={`${year}-header`}
          >
            {year}
          </AccordionSummary>
          <AccordionDetails className={classes.flexColumn}>
            {SubdivisionAccordion(e[1], year, setSelectedIssue)}
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

PreviousIssues.propTypes = {
  issues: PropTypes.objectOf(PropTypes.string).isRequired,
  setSelectedIssue: PropTypes.func.isRequired,
};
