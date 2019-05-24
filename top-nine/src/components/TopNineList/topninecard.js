import React from "react";
import { connect } from 'react-redux';
import { Card,  Button } from "react-bootstrap";
import { itemDelete, itemPut, getTopNine } from '../../actions';
import AddForm from './addform';

import "./topnine.css";

class TopNineCard extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      showForm: false,
    }
  }
  handleClose = () =>{
    this.setState({ showForm: false });
    this.props.getTopNine();
  }

  handleShow = () =>{
    this.setState({ showForm: true });
  }

  updateItem = (item) => {
    this.setState({
        id: item.id,
        title: item.title,
        description: item.description,
        image_url: item.image_url
    });

    this.props.itemPut(this.state);
  }

  update = (event) =>{
    this.handleShow();
  }
  
  delete = (event) => {
    this.props.itemDelete(this.props.item.id)
    .then(() =>{this.props.getTopNine()});
  }

  render() {
    const image_url = this.props.item.image_url !== null &&  this.props.item.image_url !== "" ? this.props.item.image_url : './img/logo.png';
    console.log(this.props);
    return (
      <React.Fragment>
      <AddForm isAdd={false} getTopNine={this.props.getTopNine} item={this.props.item} show={this.state.showForm} handleClose={this.handleClose} handleShow={this.handleShow} update={this.update} />

      <Card className="item-card">
        <div className='title'>
          <Card.Title>{this.props.item.title}</Card.Title>
        </div>
        <div className='card-img-container'> 
          <Card.Img className='card-img' variant="top" src={image_url} />
        </div>
        <div className='description'>
          <Card.Text> {this.props.item.description} </Card.Text>
        </div>
        <div className='buttons'>
          <Button onClick={this.update} size="sm" variant="primary">Update</Button>
          <Button onClick={this.delete} size="sm" variant="danger">Delete</Button>
        </div>  
         
      </Card>
      </React.Fragment>
    
    );
  }
}

export default connect(null, { itemDelete, itemPut, getTopNine })(TopNineCard)