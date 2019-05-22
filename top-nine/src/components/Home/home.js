import React from "react";
import TopNineList from '../TopNineList/topninelist'; 
import './home.css';
import { connect } from "react-redux";
import { getTopNine } from "../../actions";

class Home extends React.Component {

  componentDidMount(){
    this.props.getTopNine();
  }
  render() {
    return(
       <div className="home">
     
          <TopNineList className='top-nine-list' {...this.props} topNine={this.props.topNine} />
      </div>
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
)(Home);
