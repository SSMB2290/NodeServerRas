import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Predefined locations for the Tech Fest
const locations = [
  { id: 1, name: "RGUKT Nuzvid", coords: [16.7861, 80.8463] },
  { id: 2, name: "RGUKT Auditorium", coords: [16.7875, 80.8448] },
  { id: 3, name: "RGUKT Academic Block 1", coords: [16.7882, 80.8456] },
  { id: 4, name: "RGUKT Academic Block 2", coords: [16.7890, 80.8460] },
];

const MapComponent = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Function to handle return to the chat route
  const handleReturnToChat = () => {
    navigate("/chat"); // Navigate to the /chat route (the chat component)
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>RGUKT Tech Fest Map</h2>

      <MapContainer center={[16.7870, 80.8460]} zoom={16} style={styles.map}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker key={location.id} position={location.coords}>
            <Popup>
              <b>{location.name}</b>
            </Popup>
            <Tooltip permanent direction="top">
              {location.name}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      <button style={styles.locationButton} onClick={handleReturnToChat}>
        <FaMapMarkerAlt /> Return to Chat
      </button>
    </div>
  );
};

// Styling
const styles = {
  container: {
    width: "95%",
    height: "90vh",
    margin: "auto",
    padding: "20px",
    borderRadius: "10px",
    // backgroundColor: "#1e1e1e",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
    fontFamily: "Arial, sans-serif",
    color: "#fff",
  },
  header: {
    fontSize: "35px", // Increased font size for more prominence
    fontWeight: "bold",
    marginBottom: "1px", // Increased margin to give more space below the header
    padding: "1px", // Increased padding for better balance
    backgroundColor: "white",
    WebkitBackgroundClip: "text",
    color: "transparent",
    textShadow: "0px 0px 30px rgb(235, 231, 240), 0px 0px 40px rgba(255, 105, 180, 0.8)", // More intense text shadow with an additional color
    letterSpacing: "2px", // Slight letter spacing to make the text more stylish and prominent
    textAlign: "center", // Center the text
    // Optional: making the text uppercase for a bolder feel
  }
,  
  map: {
    height: "calc(100% - 60px)", // Adjusting map to fill available space
    width: "100%",
    borderRadius: "10px",
  },
  locationButton: {
    marginTop: "10px",
    backgroundColor: "#6a11cb",
    padding: "10px",
    color: "white",
    borderRadius: "5px",
    width: "100%",
    cursor: "pointer",
    border: "none",
  },
};

export default MapComponent;
