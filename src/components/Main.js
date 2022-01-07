import React, { useState, useEffect } from 'react';
import '../App.css';
import FeaturedIssue from './FeaturedIssue';
import PreviousIssues from './PreviousIssues';

const pulledIssues = {
  'Latest Issue': {
    date: '2021/12/02',
    embed: '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="https://e.issuu.com/embed.html?d=student_life_december_2_2021_uploaded_online&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>',
  },
  'Featured Issues': [
    {
      issueName: 'Housing Guide',
      date: '2020/09/04',
      embed: '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>',
    },
    {
      issueName: 'Starting Line',
      date: '2020/08/02',
      embed: '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>',
    },
  ],
  'Previous Issues': {
    // '2020-2021': {
    //   Fall: {
    //     October: [
    //       {
    //         date: '2019/10/03',
    //         embed: '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>',
    //       },
    //       {
    //         date: '2019/10/07',
    //         embed: '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>',
    //       },
    //     ],
    //     November: [
    //       {
    //         date: '2019/11/19',
    //         embed: '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>',
    //       },
    //     ],
    //   },
    //   Spring: {
    //     March: [
    //       {
    //         date: '2020/03/02',
    //         embed: '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>',
    //       },
    //     ],
    //   },
    // },
    '2021-2022': {
      Fall: {
        November: [
          {
            date: '2021/11/11',
            embed: '<div style="position:relative;padding-top:max(60%,500px);height:0;width:100%"><iframe sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-scripts allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox" allowfullscreen="true" style="position:absolute;border:none;width:100%;height:100%;left:0;right:0;top:0;bottom:0;" src="https://e.issuu.com/embed.html?d=updated-as_uploaded_online_nov_11_2021_&hideIssuuLogo=true&logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&u=washustudentlife"></iframe></div>',
          },
          {
            date: '2021/11/18',
            embed: '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="https://e.issuu.com/embed.html?d=_combined_pdf_s_as_uploaded_online_november_18_2&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>',
          },
        ],
        December: [
          {
            date: '2021/12/02',
            embed: '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="https://e.issuu.com/embed.html?d=student_life_december_2_2021_uploaded_online&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>',
          },
        ],
      },
      'Special Issues': [
        {
          issueName: 'Housing Guide',
          thumbURL: 'special-housing-guide',
          date: '2021/08/15',
          embed: '<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="https://e.issuu.com/embed.html?d=housing_guide_2021_--_for_web_final_&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>',
        },
      ],
    },
  },
};

const Main = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [previousIssues, setPreviousIssues] = useState(null);
  const [issues, setIssues] = useState(pulledIssues);

  useEffect(() => {
    const formattedData = {};
    formattedData['Latest Issue'] = pulledIssues['Latest Issues'];
    formattedData['Featured Issues'] = pulledIssues['Featured Issues'];
    setPreviousIssues(pulledIssues['Previous Issues']);
    setIsLoaded(true);
  }, []);

  const listFeaturedIssues = (featuredIssues) => {
    const featuredIssueComponents = featuredIssues.map((i) => (
      <FeaturedIssue issueName={i.issueName} embed={i.embed} />
    ));
    return (<>{featuredIssueComponents}</>);
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
    <>
      <FeaturedIssue issueName="Latest Issue" embed={issues['Latest Issue'].embed} />
      {issues['Featured Issues'] && listFeaturedIssues(issues['Featured Issues'])}
      {selectedIssue
        && <FeaturedIssue issueName={selectedIssue.date} embed={selectedIssue.embed} />}
      {previousIssues
        && <PreviousIssues issues={previousIssues} setSelectedIssue={setSelectedIssue} />}
    </>
  );
};

export default Main;
