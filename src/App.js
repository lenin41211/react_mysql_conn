import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'; 

var socket;
var ol1=0,ol2=0;
var style1,style2;

const columns = [ 
  { key: "b_price", name: "BUYING", editable: false },
  { key: "s_price", name: "SELLING", editable: false },
  { key: "date", name: "DATE", editable: false }
];

class App extends Component {

   constructor(props) {
     
    super(props);
    this.state = {
      title: 'Simple Trading Appliction',
      d1: ' ',
      d2: ' ',
      d3: ' ',
      data: []
    };
    //this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

   forceUpdateHandler(){
    this.forceUpdate();
  };

  componentDidMount() {

    console.log('Component has mounted ') ;
    var that = this;
    socket = io.connect('http://localhost:5000');
    socket.on('receive',
    // When we receive data
    function(datas) {
      console.log(datas);
      that.state.d1 = datas.b_price;
      that.state.d2 = datas.s_price;
      that.state.d3 = datas.date;
      //console.log(that.state.d1);
      console.log("Got: " + datas.b_price + " " + datas.s_price + " " + datas.date ); 
      that.setState({
        d1 : datas
      });
      let data = that.state.data;
            that.state.data.push(datas);
            that.setState({
              data: data
              
            });

    }
  );

  }

render() {
  

   return (
    <div className="App">
      <h1>{this.state.title}</h1>
      <ReactDataGrid
        columns={columns}
        rowGetter={i => this.state.d1}
        rowsCount={1}
      />
     
    </div>
  );
 }
}

export default App;
