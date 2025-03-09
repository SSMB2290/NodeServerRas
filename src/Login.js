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
      const response = await axios.post('http://localhost:5000/login', { teckziteId, password });
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
      <motion.h1
        style={styles.title}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        Teckzite Event Management Agent
      </motion.h1>

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
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    // backgroundColor: "#121212",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "36px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    backgroundColor: "#2c2c2c",
    color: "#ffffff",
    border: "1px solid #555",
    borderRadius: "5px",
    width: "250px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4caf50",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  }
};

export default Login;
