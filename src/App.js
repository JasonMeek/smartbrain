import React, { Component } from 'react';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import './App.css';
import Particles from 'react-particles-js';


const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 200
      }
    }
  },
  // interactivity: {
  //   detect_on: "canvas",
  //   events: {
  //     onhover: {
  //       enable: true,
  //       mode: "repulse"
  //     }
  //   }
  // }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions}  
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
