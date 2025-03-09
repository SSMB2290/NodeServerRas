import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import for Router and Routes
import Login from './Login'; // Ensure correct path for Login component
import Chatbot from './Chatbot'; // Ensure correct path for Chatbot component
import { ToastContainer } from 'react-toastify'; // Correct import for ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import MapComponent from './MapComponent';

function App() {
  return (
    <Router>
      <div style={styles.container}>
        {/* Background Video */}
        <video autoPlay loop muted style={styles.backgroundVideo}>
          <source src="/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <Routes>
          <Route 
            path="/login" 
            element={
              <>
                <Login /> {/* Login form */}
                <ToastContainer /> {/* Toast container for notifications */}
              </>
            } 
          />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/map" element={<MapComponent />} />
          <Route path="/" element={<h1>Welcome to Teckzite Event Management Agent</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    position: 'relative', // To position content over the video
    overflow: 'hidden', // Ensure no overflow on screen edges
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensure video covers the screen
    zIndex: -1, // Ensure video stays behind content
  }
};

export default App;
