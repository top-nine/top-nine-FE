import React from "react";
import { Route } from "react-router-dom";

import TopNineList from '../TopNineList/topninelist'; 


import './home.css';

export default class Home extends React.Component {

 

  render() {
    return(
       <div className="home">
     
          <TopNineList className='top-nine-list' topNine={this.props.topNine} />
      </div>
    );
  }
}

