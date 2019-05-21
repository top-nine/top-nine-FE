import React from "react";
import { Route } from "react-router-dom";
import TopNineCard from "./topninecard";
import "./topnine.css";
import { connect } from "react-redux";
import { getTopNine } from "../../actions";
import NavBar from "../NavBar/navbar";

class TopNineList extends React.Component {
  componentWillMount() {
    this.getTopNine();
  }
  getTopNine = () => {
    this.props.getTopNine(window.localStorage.getItem("userID"));
  };
  render() {
    return (
      <React.Fragment>
        <NavBar getTopNine={this.getTopNine} />
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
const mapStateToProps = state => {
  return {
    topNine: state.topNine
  };
};

export default connect(
  mapStateToProps,
  { getTopNine }
)(TopNineList);
