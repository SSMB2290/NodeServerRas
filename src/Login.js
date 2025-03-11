import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { motion } from 'framer-motion'; // Import Framer Motion for animation
import { toast } from 'react-toastify'; // Import React Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

function Login() {
  const [teckziteId, setTeckziteId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  
  // Toastify Notification Setup
  const notify = (message, type = 'success') => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous error message

    try {
      const response = await axios.post('https://react-rasa-3.onrender.com/login', { teckziteId, password });
      console.log('Login Success:', response.data);

      // Store token (optional)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('teckzite_id',teckziteId);

      // Redirect to the '/chat' route after successful login
      navigate('/chat');  // Use navigate() to redirect
      notify('Login successful!', 'success');
    } catch (err) {
      console.error('Login failed:', err.response?.data);
      setError(err.response?.data?.message || 'Login failed');
      notify('Invalid credentials', 'error');
    }
  };

  return (
    <div style={styles.container}>
    <div style={styles.titleContainer}>
      <motion.h1
        style={styles.title}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        Teckzite Event Management Agent
      </motion.h1>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        style={styles.form}
        animate={{ y: 0 }}
        initial={{ y: -50 }}
        transition={{ duration: 1 }}
      >
        <div style={styles.inputContainer}>
          <label htmlFor="teckziteId" style={styles.label}>Teckzite ID</label>
          <input 
            type="text" 
            id="teckziteId" 
            value={teckziteId} 
            onChange={(e) => setTeckziteId(e.target.value)} 
            style={styles.input} 
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={styles.input} 
          />
        </div>
        {error && (
          <motion.p
            style={styles.error}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.p>
        )}
        <motion.button 
          type="submit" 
          style={styles.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Login
        </motion.button>
      </motion.form>
    </div>
  );
}





const styles = {
  pageContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    padding: "10px",
    position: "relative",
    background: "none",
    '@media (max-width: 768px)': {
      padding: "5px", // Reduce padding for mobile
    },
  },
  header: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "30px",
    padding: "1px",
    backgroundColor: "white",
    WebkitBackgroundClip: "text",
    color: "transparent",
    textShadow: "0px 0px 30px rgb(235, 231, 240), 0px 0px 40px rgba(255, 105, 180, 0.8)",
    letterSpacing: "2px",
    textAlign: "center",
    '@media (max-width: 768px)': {
      fontSize: "24px", // Smaller font size for mobile
      marginBottom: "15px", // Reduce margin for mobile
    },
  },
  container: {
    width: "70vw",
    maxWidth: "1000px",
    height: "80vh",
    padding: "20px",
    borderRadius: "15px",
    backgroundColor: "#1a1a1a",
    boxShadow: "0 0 15px rgba(20, 75, 138, 0.1)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    '@media (max-width: 768px)': {
      width: "100vw", // Full width on mobile
      height: "70vh", // 70% height on mobile
      borderRadius: "10px", // Keep some border radius for a modern look
      padding: "10px", // Reduce padding for mobile
    },
  },
  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "15px",
    '@media (max-width: 768px)': {
      gap: "5px", // Reduce gap between buttons for mobile
      marginBottom: "10px", // Reduce margin for mobile
    },
  },
  quickButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#6a11cb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.3s",
    '@media (max-width: 768px)': {
      padding: "6px 10px", // Reduce padding for mobile
      fontSize: "12px", // Smaller font size for mobile
      flex: "1 1 30%", // Allow three buttons in a line
    },
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    border: "1px solid #555",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#2a2a2a",
    display: "flex",
    flexDirection: "column",
    '@media (max-width: 768px)': {
      padding: "10px", // Reduce padding for mobile
      height: "70%", // Set height to 70% of the container
    },
  },
  message: {
    padding: "10px",
    borderRadius: "12px",
    margin: "5px",
    maxWidth: "70%",
    wordWrap: "break-word",
    '@media (max-width: 768px)': {
      maxWidth: "90%", // Increase max-width for mobile to utilize more space
    },
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#2575fc",
    color: "white",
    textAlign: "right",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#444",
    textAlign: "left",
  },
  inputContainer: {
    display: "flex",
    marginTop: "15px",
    '@media (max-width: 768px)': {
      marginTop: "10px", // Reduce margin for mobile
    },
  },
  input: {
    flex: 1,
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "16px",
    '@media (max-width: 768px)': {
      padding: "10px", // Reduce padding for mobile
      fontSize: "14px", // Smaller font size for mobile
    },
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#6a11cb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    marginLeft: "8px",
    cursor: "pointer",
    transition: "0.3s",
    '@media (max-width: 768px)': {
      padding: "10px 15px", // Reduce padding for mobile
      fontSize: "14px", // Smaller font size for mobile
    },
  },
};


export default Login;
