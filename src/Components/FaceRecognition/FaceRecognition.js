import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ box, image_url }) => {
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" alt="detect_image" src={image_url} width="500px" height="auto" />
                <div className="bounding-box" style={{left: box.leftCol, right: box.rightCol, top: box.topRow, bottom: box.bottomRow}}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;