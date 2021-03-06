import React, { Component } from 'react';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";
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


 const initialState = {
    input: "",
    image_url: "",
    box: {},
    route: "signin",
    isSignedIn: false,
    user: {
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: "",
    }
  }

class App extends Component {
  constructor(){
    super();
    this.state = initialState //{
    //   input: "",
    //   image_url: "",
    //   box: {},
    //   route: "signin",
    //   isSignedIn: false,
    //   user: {
    //     id: "",
    //     name: "",
    //     email: "",
    //     entries: 0,
    //     joined: "",
    //   }
    // }
  }

  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const faceBoxData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: faceBoxData.left_col * width,
      rightCol: width - (faceBoxData.right_col * width),
      topRow: faceBoxData.top_row * height,
      bottomRow: height - (faceBoxData.bottom_row * height) 
    };
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({image_url: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if(response){
          fetch("https://murmuring-fortress-80162.herokuapp.com/image", {
            method: "put",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
        }
        
        const faceLocation = this.calculateFaceLocation(response);
        this.displayFaceBox(faceLocation);
      })
      .catch(err => {
        console.log(err);
      });
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    }
    else if (route === "home") {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions}  
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === "home"
          ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition box={this.state.box} image_url={this.state.image_url}/>
          </div>
          : (
            this.state.route === "signin"
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
          )
        }
      </div>
    );
  }
}

export default App;
