import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import '../App.css';
import Months from './Months';

const pulledIssues = {
  'Latest Issue': {
    '2020-10-02': '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>',
  },
  'Featured Issues': {
    issues: [
      {
        name: 'Housing Guide',
        pubDate: '2020-09-04',
        embed: '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>',
      },
      {
        name: 'Starting Line',
        pubDate: '2020-08-02',
        embed: '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>',
      },
    ],
  },
  'Previous Issues': {
    '2019-2020': {
      Fall: {
        issues: [
          { '2020-10-02': '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>' },
          { '2020-10-03': '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>' },
        ],
      },
      Spring: {
        issues: [
          { '2020-10-02': '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>' },
          { '2020-10-03': '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>' },
        ],
      },
      'Special Issues': {
        issues: [
          { '2020-10-02': '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>' },
          { '2020-10-03': '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>' },
        ],
      },
    },
    '2020-2021': {
      Fall: {
        issues: [
          { '2020-10-02': '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>' },
          { '2020-10-03': '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>' },
        ],
      },
      Spring: {
        issues: [
          { '2020-10-02': '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>' },
          { '2020-10-03': '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>' },
        ],
      },
      'Special Issues': {
        issues: [
          { '2020-10-02': '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>' },
          { '2020-10-03': '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>' },
        ],
      },
    },
  },
};

const Main = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [issueSelected, setIssueSelected] = useState(false);
  const [issues, setIssues] = useState(pulledIssues);

  useEffect(() => {
    // setIssues(issues);
    setIsLoaded(true);
  }, []);

  const displaySelectedIssue = () => <div>Hello</div>;

  const generateIssues = (year, month) => <div>hello</div>;

  const generateMonths = (year) => {
    const months = [];
    for (const month in issues[year]) months.push(month);
    const monthListings = months.map((month) => (
      <div className="month-container">
        <h2>{month}</h2>
        <div className="dropdown-indicator" onClick={() => generateIssues(year, month)}>&or;</div>
      </div>
    ));
    return monthListings;
  };

  // TODO: once we have a couple years down, might be beneficial to have all years collapsed,
  // then on click drop down months
  const generateListings = () => {
    const years = [];
    for (const year in issues['Previous Issues']) years.push(year);
    const yearListings = years.reverse().map((year) => (
      <>
        <h1 className="article-headline">{year}</h1>
        <div className="horizontal-divider-red" />
        <Months year={year} />
      </>
    ));
    return yearListings;
  };

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  } if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>{ ReactHtmlParser(issues['Latest Issue']['2020-10-02'])}</div>
      { issueSelected && displaySelectedIssue() }
      { generateListings() }
    </div>
  );
};

export default Main;
