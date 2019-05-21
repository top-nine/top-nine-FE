import React from "react";
import { Route } from "react-router-dom";
import TopNineCard from './topninecard';
import './topnine.css';

export default class TopNineList extends React.Component {
    
  render() {
    return (
      <div className="top-nine">
        {this.props.topNine.map(item => <TopNineCard key={item.id} item={item} />)}
      </div>
    );
  }
}
