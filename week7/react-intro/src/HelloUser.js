import React, { Component } from 'react';

const KittenImage = function( props ){
  return <img src={`http://placekitten.com/${props.width}/${props.height}`} />;
  // return <img src={'http://placekitten.com/' + props.width + '/' + props.height} />;
};

class HelloUser extends Component {

  // comment here

  render(){
    return (
      <div className="user">
      <h4>Hello, { this.props.name }!</h4>
      <br />
      <KittenImage
        width={this.props.imgWidth}
        height={this.props.imgHeight}
      />
      {
        // comment
      }
      </div>
    );
  }

}

export default HelloUser;
