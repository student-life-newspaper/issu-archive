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
import SelectedIssueModal from './SelectedIssueModal';
import { issueSchoolYear, monthArr } from './utils';

const THUMBNAIL_URL = 'https://studlife.com/media/pdf/';

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
  thumbnailFit: {
    height: 300,
    width: 200,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%',
  },
  dateText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '8px',
  },
  accordionSummary: {
    fontSize: '1.5em',
    fontWeight: '400',
  },
});

const IndividualIssues = ({ issuesArray, specialCategory }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [issueSelected, setIssueSelected] = useState({});
  const classes = columnAccordionTheme();

  const handleIssueSelect = (issueData) => {
    setModalOpen(true);
    const t = issueData;
    t.specialCategory = specialCategory;
    setIssueSelected(t);
  };

  const options = {
    year: 'numeric', month: 'long', day: 'numeric',
  };
  const dateString = (date) => new Date(date).toLocaleDateString('en-US', options);
  const issues = issuesArray.map((e) => {
    const { date } = e;
    const thumbnailUrl = (specialCategory)
      ? `url(${THUMBNAIL_URL}${issueSchoolYear(date)}/thumbs/${e.thumbURL}.jpg)`
      : `url(${THUMBNAIL_URL}${issueSchoolYear(date)}/thumbs/${issueArchiveDate(date)}.jpg)`;
    e.issueName = (specialCategory) ? e.issueName : dateString(date);
    return (
      <Grid key={date} item>
        <CardActionArea onClick={() => handleIssueSelect(e)}>
          <Paper className={classes.thumbnailWrapper}>
            <Box
              style={{ backgroundImage: thumbnailUrl }}
              className={specialCategory ? classes.thumbnailFit : classes.thumbnail}
            />
            <Box className={classes.dateText}>
              {e.issueName}
            </Box>
          </Paper>
        </CardActionArea>
      </Grid>
    );
  });
  return (
    <>
      {modalOpen && (
        <SelectedIssueModal
          issueObj={issueSelected}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
      <Grid container className={classes.root} spacing={2} justifyContent="center">
        {issues}
      </Grid>
    </>
  );
};

const MonthAccordion = ({
  months, division, year,
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
            className={classes.accordionSummary}
          >
            {month}
          </AccordionSummary>
          <AccordionDetails className={classes.flexColumn}>
            {monthExpanded === `panel-${year}-${division}-${month}` && <IndividualIssues issuesArray={e[1]} specialCategory={false} />}
          </AccordionDetails>
        </Accordion>
      );
    });
};

const SubdivisionAccordion = ({ subdivisions, year }) => {
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
            className={classes.accordionSummary}
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
                  />
                ) : (
                  <IndividualIssues
                    issuesArray={e[1]}
                    specialCategory={division}
                  />
                ))}
          </AccordionDetails>
        </Accordion>
      );
    })
  );
};

const PreviousIssues = ({ issues }) => {
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
            <span className={classes.accordionSummary}>{year}</span>
          </AccordionSummary>
          <AccordionDetails className={classes.flexColumn}>
            {expanded === `panel-${year}`
              && (
                <SubdivisionAccordion
                  subdivisions={e[1]}
                  year={year}
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
      <h1 className="article-headline" style={{ marginTop: '50px', marginBottom: 0 }}>Previous Issues</h1>
      <div className="horizontal-divider-red" />
      {yearsAccordion()}
      <p style={{ marginTop: '2em' }}>
        <em>
          For PDFs before the 2020-2021 school year, visit the
          {' '}
          <a href="/pdf-archive" style={{ textDecoration: 'underline' }}>PDF archive</a>
          .
        </em>
      </p>
    </>
  );
};

export default PreviousIssues;
