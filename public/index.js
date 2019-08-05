import ReactDOM from 'react-dom';
import React, { Component } from 'react';
// import './public/style.css';

let keypad = { 
  Q: { url: 'https://cdn.glitch.com/3489ddb5-8371-4dfc-beab-56327ba2e20d%2FE808_CB-02.mp3?1539193866341',
       id: 'Cowbell'
     },
  W: { url: 'https://cdn.glitch.com/3489ddb5-8371-4dfc-beab-56327ba2e20d%2FE808_HT-01.mp3?1539264122994',
       id: 'Tom'
     },
  E: { url: 'https://cdn.glitch.com/3489ddb5-8371-4dfc-beab-56327ba2e20d%2FE808_CY-04.mp3?1539263602186',
       id: 'Cymbal'
     },
  A: { url: 'https://cdn.glitch.com/3489ddb5-8371-4dfc-beab-56327ba2e20d%2FE808_OH-04.mp3?1539263544608',
       id: 'HH Open'
     },
  S: { url: 'https://cdn.glitch.com/3489ddb5-8371-4dfc-beab-56327ba2e20d%2FE808_CP-02.mp3?1539263723092',
       id: 'Clap'
     },
  D: { url: 'https://cdn.glitch.com/3489ddb5-8371-4dfc-beab-56327ba2e20d%2FE808_CH-12.mp3?1539263652161',
       id: 'HH Closed'
     },
  Z: { url: 'https://cdn.glitch.com/3489ddb5-8371-4dfc-beab-56327ba2e20d%2FE808_RS-02.mp3?1539193843063',
       id: 'Rimshot'
     },
  X: { url: 'https://cdn.glitch.com/3489ddb5-8371-4dfc-beab-56327ba2e20d%2FE808_SD-20.mp3?1539263471525', 
       id: 'Snare'
     },
  C: { url: 'https://cdn.glitch.com/3489ddb5-8371-4dfc-beab-56327ba2e20d%2FE808_BD%5Blong%5D-09.mp3?1539263828274', 
       id: 'Kick'
     }
}

// main component for display and drumpad
class Drum_Machine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display : "Drum Machine 2019",
      button  : ""
    }
    
    this.playAudio    = this.playAudio.bind(this);
    this.keydownEvent = this.keydownEvent.bind(this);
    this.keyupEvent   = this.keyupEvent.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.keydownEvent);
    document.addEventListener('keyup',   this.keyupEvent);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownEvent);
    document.removeEventListener('keyup',   this.keyupEvent);
  }
  
  playAudio(value) { 
    clearInterval(this.displayTimer);
    let audio = document.getElementById(value);
    audio.load(); // restart media playback
    audio.play(); // play selected media item
    this.setState({ 
      display: keypad[value].id
    });
    this.displayTimer = setInterval(() => this.setState({display: 'Drum Machine 2019'}), 1500);
  }
  
  keydownEvent(event) {
    let value = String.fromCharCode(event.which),
        id    = modifyId(keypad[value].id);
    document.getElementById(id).classList.add('active');
    this.playAudio(value);  
  }
  
  keyupEvent(event) {
    let value = String.fromCharCode(event.which),
        id    = modifyId(keypad[value].id);
    document.getElementById(id).classList.remove('active');   
  }
  
  render() {
    return(
    <ErrorBoundary>
      <div id='drum-machine'>
        <div id='display'>{this.state.display}</div>
        <Drumpad clickHandler={this.playAudio}/>
      </div>  
    </ErrorBoundary>
    );
  }
};


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // log the error to console 
    console.log(error, info);   
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Um...Something went wrong.</h1>;
    }
    return this.props.children;
  };
};
// converts Keypad obj to lowercase and adds hypen to any spaces between the words
const modifyId = (id) => {
  return id.replace( /( )/g, '_').toLowerCase();
}

// builds the drumpad buttons
const Drumpad = (props) => {
  let createTableData = function(arr) {
    let table = arr.map((note, index) => {
         let audioDb = keypad[note],
             id = modifyId(audioDb.id); 
             
         return (
           <td key={index}>
             <button id={id} className='drum-pad' onClick={() => props.clickHandler(note)}>
             <audio id={note} className='clip' src={audioDb.url} preload='true'>Your browser does not support the <code>audio</code> element</audio>{note}</button>
           </td> 
         );       
    })
  return (
    <tr>
      {table}
    </tr>
    );
  }  
  
  return (
    <ErrorBoundary>
    <div id='tableLayout'>
      <table>
        <tbody>
          {createTableData(['Q', 'W', 'E'])}
          {createTableData(['A', 'S', 'D'])}
          {createTableData(['Z', 'X', 'C'])}
        </tbody>
      </table>
    </div>    
    </ErrorBoundary>
  )
} 



ReactDOM.render(<Drum_Machine />, document.getElementById("root"));