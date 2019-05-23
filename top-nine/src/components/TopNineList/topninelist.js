import React from "react";
import TopNineCard from "./topninecard";
import "./topnine.css";

import NavBar from "../NavBar/navbar";

export default class TopNineList extends React.Component {
  componentWillMount() {
    this.getTopNine();
  }
  getTopNine = () => {
    this.props.getTopNine(window.localStorage.getItem("userID"));
    console.log(this.props);
  };
  render() {

    return (
      <React.Fragment>  
        <NavBar getTopNine={this.props.getTopNine} {...this.props} />
        <div className="top-nine">
          {this.props.topNine &&
            this.props.topNine.map(item => (
              <TopNineCard
                key={item.id}
                item={item}
                getTopNine={this.getTopNine}
              />
            ))}
        </div>
      </React.Fragment>
    );
  }
}
