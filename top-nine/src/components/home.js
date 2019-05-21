import React from "react";
import { Route } from "react-router-dom";
 
import { connect } from 'react-redux';
import { getTopNine } from '../actions';

class Home extends React.Component {

  componentDidMount() {
      
    this.props.getTopNine(window.localStorage.getItem('userID'));
  }
  render() {
    return <div className="home">{console.log(this.props.topNine)}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    topNine: state.topNine,
    user: state.user
  };
};

export default connect(mapStateToProps, { getTopNine })(Home)