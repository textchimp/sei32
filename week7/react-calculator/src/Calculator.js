import React, { PureComponent } from 'react';

class Calculator extends PureComponent {

  constructor(){
    super();  // Call the constructor() method of the superclass PureComponent

    console.log('New Calculator component object made!', this);

    // Ruby @state = something
    this.state = {
      firstNum: 0,
      secondNum: 0
    };

    // We need to lock down the value of 'this' inside our updateFirstNum()
    // event handler. To do this, we can use .bind, which when you call it on
    // a function, returns a new version of that function which has its 'this'
    // value locked to be the argument to bind() - and the argument to bind()
    // here is the value of 'this' as it is in the constructor function, where it
    // has the right value (the current object). It is by setting updateFirstNum()
    // as the onChange event handler for the text input that it loses
    // the correct value of 'this'.
    this.updateFirstNum = this.updateFirstNum.bind( this );

    this.updateSecondNum = this.updateSecondNum.bind( this );

  }

  updateFirstNum( event ){
    event.persist(); // New nonsense
    console.log( 'updating first!', event.target.value );
    // this.state.firstNum = 200;  NO!
    this.setState({
      firstNum: parseFloat(event.target.value)
    });

  }

  updateSecondNum( event ){
    event.persist(); // New nonsense
    console.log( 'updating second!', event.target.value );
    // this.state.firstNum = 200;  NO!
    this.setState({
      secondNum: parseFloat(event.target.value)
    });

  }

  render(){

    // ES6 object destructuring: create local variables, named after the keys of
    // the object on the right, whose values are the values of those keys
    const {firstNum, secondNum} = this.state;

    return (
      <div>
        <h1>Calculator</h1>

        <input text="text" placeholder="First number" onChange={ this.updateFirstNum } />
        <br />
        <input text="text" placeholder="Second number" onChange={ this.updateSecondNum }/>

        <h2>Results:</h2>
        { firstNum } + { secondNum } = { firstNum + secondNum } <br />
        { firstNum } - { secondNum } = { firstNum - secondNum } <br />
        { firstNum } * { secondNum } = { firstNum * secondNum } <br />
        { firstNum } / { secondNum } = { firstNum / secondNum } <br />

      </div>
    );
  }

}

export default Calculator;
