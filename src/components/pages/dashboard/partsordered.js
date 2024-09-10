import React, { Component } from 'react';


export default class App extends Component{
   constructor(props) {
       super(props);
       }

   render() {
     return (
        <div>
        <h1>Parts Ordered</h1>
        {this.props.parts.map((part) => (
           <div key={part.id}>
             <h3>{part.part}</h3>
             <h3>{part.count}</h3>
             <h3>{part.eta}</h3>
           </div>
         ))}
      </div>
       )
     }
   }