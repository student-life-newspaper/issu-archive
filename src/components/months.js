import { Component } from 'react';
import '../App.css';

class Months extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  // generateMonths(year) {
  //   let months = []
  //   for (let month in issues[year]) months.push(month)
  //   let monthListings = months.map((month) => {
  //     return (
  //       <div className="month-container">
  //         <h2>{month}</h2>
  //         <div className="dropdown-indicator" onClick={() => this.generateIssues(year, month)}>&or;</div>
  //       </div>
  //     )
  //   })
  //   return monthListings
  // }

  render() {
    return (
      <div>
        { this.props.year }
      </div>
    );
  }
}

export default Months;
