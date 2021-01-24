import logo from './logo.svg';
import { Component } from 'react';
import './App.css';
import Months from './months.js';

let issues = {  
  '2019-2020': {
    "Fall": {
      issues: [
        {"2020-10-02":'<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>'},
        {"2020-10-03":'<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>'}
      ]
    },    
    "Spring": {
      issues: [
        {"2020-10-02":'<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>'},
        {"2020-10-03":'<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>'}
      ]
    },    
    "Special Issues": {
      issues: [
        {"2020-10-02":'<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>'},
        {"2020-10-03":'<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>'}
      ]
    },
  },
  '2020-2021': {
    "Fall": {
      issues: [
        {"2020-10-02":'<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>'},
        {"2020-10-03":'<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>'}
      ]
    },    
    "Spring": {
      issues: [
        {"2020-10-02":'<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>'},
        {"2020-10-03":'<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>'}
      ]
    },    
    "Special Issues": {
      issues: [
        {"2020-10-02":'<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>'},
        {"2020-10-03":'<iframe allowfullscreen="true" allow="fullscreen" style="border:none;width:100%;height:500px;" src="//e.issuu.com/embed.html?d=student_life_at_wash_u_november_19__2020&amp;hideIssuuLogo=true&amp;logoImageUrl=https%3A%2F%2Fwww.studlife.com%2Fwp-content%2Fthemes%2Fstudent-life-2019%2Fimg%2Flogo-studentlife-white-issu-watermark.png&amp;u=washustudentlife"></iframe>'}
      ]
    },
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false, //false
      issueSelected: false, //false
      issues: []
    };
  }

  componentDidMount() {
    this.setState({
      issues: issues,
      isLoaded: true
    })
    // fetch("https://api.example.com/items")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       this.setState({
    //         isLoaded: true,
    //         items: result.items
    //       });
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });
    //     }
    //   )
  }

  displaySelectedIssue() {
    return <div>Hello</div>
  }

  generateIssues(year, month) {
    return <div>hello</div>
  }

  generateMonths(year) {
    let months = []
    for (let month in issues[year]) months.push(month)
    let monthListings = months.map((month) => {
      return (
        <div className="month-container">
          <h2>{month}</h2>
          <div className="dropdown-indicator" onClick={() => this.generateIssues(year, month)}>&or;</div>
        </div>
      )
    })
    return monthListings
  }

  // TODO: once we have a couple years down, might be beneficial to have all years collapsed, then on click drop down months
  generateListings() {
    let years = []
    for (let year in issues) years.push(year)
    let yearListings = years.reverse().map((year) => {
      return (
        <>
        <h1 className="article-headline">{year}</h1>
        <div className="horizontal-divider-red"></div>
        <Months year={year}/>
        </>
      )
    })
    return yearListings
  }

  render() {
    const { error, isLoaded, items } = this.state;
    const issueSelected = this.state.issueSelected;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          { issueSelected && this.displaySelectedIssue() }
          { this.generateListings() }
        </div>
      );
    }
  }
}

export default App;
