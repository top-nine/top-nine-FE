import React from "react";
import { Route } from "react-router-dom";
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import './topnine.css';

export default class TopNineCard extends React.Component {

 
  render() {
    return (
        <div className='card'>
    
   
                <Card.Img   src={this.props.item.image_url} />
                <Card.Title>{this.props.item.title}</Card.Title>
                <Card.Text> {this.props.item.description} </Card.Text>
           
         
 
    </div>
    );
  }
}

 