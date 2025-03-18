import { useState } from "react";
import "./style.css";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState("");

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Set image preview
    }
  };
 

  const classImages = [
    { name: "airplane", src: "images/airplane.jpeg" },
    { name: "automobile", src: "/images/automobile.png" },
    { name: "bird", src: "/images/bird.jpeg" },
    { name: "cat", src: "/images/cat.jpg" },
    { name: "deer", src: "/images/deer.jpg" },
    { name: "dog", src: "/images/dog.jpg" },
    { name: "frog", src: "/images/frog.jpg" },
    { name: "horse", src: "/images/horse.jpeg" },
    { name: "ship", src: "/images/ship.png" },
    { name: "truck", src: "/images/truck.jpg" },
  ];

  const handleSubmit = async () => {
    if (!selectedImage) {
      alert("Please upload an image first!");
      return;
    }
  
    const fileInput = document.querySelector('input[type="file"]'); // Get the file input
    const file = fileInput.files[0]; // Get the selected file
  
    if (!file) {
      alert("Please select a valid image file.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }
  
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="app">
       <h1>Image Classification</h1>
       <div className="scrolling">
        <div className="scrolling-wrapper">
          {classImages.map((img, index) => (
            <div>
            <img key={index} src={img.src} alt={img.name} className="scroll-image" />
            <p className="head">{img.name}</p>
            </div>
            
          ))}
          
        </div>
      </div>
    <div className="app-1">
      <h2>Image Classification</h2>
      <input type="file" onChange={handleUpload} />
      {selectedImage && <img src={selectedImage} alt="Preview" className="image-preview" />}
      <button onClick={handleSubmit}>Predict</button>
      <p>{prediction}</p>
    </div>
  </div>

  );
}

export default App;
