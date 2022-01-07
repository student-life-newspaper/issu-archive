import React, { useState } from 'react';
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
const issueArchiveDate = (date) => [date.substr(0, 4), date.substr(5, 2), date.substr(8, 2)].join('-');

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

const IndividualIssues = ({ issuesArray, setSelectedIssue, specialCategory }) => {
  const classes = columnAccordionTheme();
  const options = {
    year: 'numeric', month: 'long', day: 'numeric',
  };
  const dateString = (date) => new Date(date).toLocaleDateString('en-US', options);
  const issues = issuesArray.map((e) => {
    const { date, embed } = e;
    const thumbnailUrl = (specialCategory)
      ? `url(${THUMBNAIL_URL}${issueSchoolYear(date)}/thumbs/${e.thumbURL}.jpg)`
      : `url(${THUMBNAIL_URL}${issueSchoolYear(date)}/thumbs/${issueArchiveDate(date)}.jpg)`;
    const issueName = (specialCategory) ? e.issueName : dateString(date);
    return (
      <Grid key={date} item>
        <CardActionArea onClick={() => setSelectedIssue({ date: issueName, embed })}>
          <Paper className={classes.thumbnailWrapper}>
            <Box style={{ backgroundImage: thumbnailUrl }} className={classes.thumbnail} />
            <Box className={classes.dateText}>
              {issueName}
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

const MonthAccordion = ({
  months, division, year, setSelectedIssue,
}) => {
  const [monthExpanded, setMonthExpanded] = useState(false);
  const classes = columnAccordionTheme();
  const handleMonthChange = (panel) => {
    setMonthExpanded(monthExpanded === panel ? false : panel);
  };

  return Object.entries(months)
    .sort((a, b) => monthArr.indexOf(a[0]) - monthArr.indexOf(b[0]))
    .map((e) => {
      const month = e[0];
      return (
        <Accordion
          expanded={monthExpanded === `panel-${year}-${division}-${month}`}
          onChange={() => handleMonthChange(`panel-${year}-${division}-${month}`)}
          key={`panel-${year}-${division}-${month}`}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${year}-${division}-${month}-content`}
            id={`${year}-${division}-${month}-header`}
          >
            {month}
          </AccordionSummary>
          <AccordionDetails className={classes.flexColumn}>
            {monthExpanded === `panel-${year}-${division}-${month}` && <IndividualIssues issuesArray={e[1]} setSelectedIssue={setSelectedIssue} specialCategory={false} />}
          </AccordionDetails>
        </Accordion>
      );
    });
};

const SubdivisionAccordion = ({ subdivisions, year, setSelectedIssue }) => {
  const [expanded, setExpanded] = useState(false);
  const classes = columnAccordionTheme();

  const handleChange = (panel) => {
    setExpanded(expanded === panel ? false : panel);
  };

  return (
    Object.entries(subdivisions).map((e) => {
      const division = e[0];
      return (
        <Accordion
          expanded={expanded === `panel-${year}-${division}`}
          onChange={() => handleChange(`panel-${year}-${division}`)}
          key={`panel-${year}-${division}`}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${year}-${division}-content`}
            id={`${year}-${division}-header`}
          >
            {division}
          </AccordionSummary>
          <AccordionDetails className={classes.flexColumn}>
            {expanded === `panel-${year}-${division}`
              && (division === 'Fall' || division === 'Spring'
                ? (
                  <MonthAccordion
                    months={e[1]}
                    division={e[0]}
                    year={year}
                    setSelectedIssue={setSelectedIssue}
                  />
                ) : (
                  <IndividualIssues
                    issuesArray={e[1]}
                    setSelectedIssue={setSelectedIssue}
                    specialCategory
                  />
                ))}
          </AccordionDetails>
        </Accordion>
      );
    })
  );
};

const PreviousIssues = ({ issues, setSelectedIssue }) => {
  const [expanded, setExpanded] = useState(false);
  const classes = columnAccordionTheme();

  const handleChange = (panel) => {
    setExpanded(expanded === panel ? false : panel);
  };

  const yearsAccordion = () => {
    const elements = Object.entries(issues).map((e) => {
      const year = e[0];
      return (
        <Accordion expanded={expanded === `panel-${year}`} onChange={() => handleChange(`panel-${year}`)} key={`panel-${year}`}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${year}-content`}
            id={`${year}-header`}
          >
            {year}
          </AccordionSummary>
          <AccordionDetails className={classes.flexColumn}>
            {expanded === `panel-${year}`
              && (
                <SubdivisionAccordion
                  subdivisions={e[1]}
                  year={year}
                  setSelectedIssue={setSelectedIssue}
                />
              )}
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
