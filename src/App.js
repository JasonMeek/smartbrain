import React, { Component } from 'react';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 500
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: 'cec92baf9a47494ba0104b3af6db909e'
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: "",
      image_url: "",
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({image_url: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions}  
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/> {/*Always remember to do this.*/}
        <FaceRecognition image_url={this.state.image_url}/>
      </div>
    );
  }
}

export default App;
