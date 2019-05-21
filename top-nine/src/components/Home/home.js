import React from "react";
import { Route } from "react-router-dom";
import { connect } from 'react-redux';
import { getTopNine } from '../../actions';
import TopNineList from '../TopNineList/topninelist'; 
import NavBar from '../NavBar/navbar';

import './home.css';

class Home extends React.Component {

  componentDidMount() {  
    this.getTopNine();
  }

  getTopNine = () =>{
    this.props.getTopNine(window.localStorage.getItem('userID'));

  }
  render() {
    return(
       <div className="home">
        <NavBar getTopNine={ this.getTopNine }/>
        {this.props.topNine && <TopNineList className='top-nine-list' topNine={this.props.topNine} />}
     
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topNine: state.topNine,
 
  };
};

export default connect(mapStateToProps, { getTopNine })(Home)