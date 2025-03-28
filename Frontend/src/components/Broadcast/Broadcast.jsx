import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import instance from "../../axios/axiosConfig";

const Broadcast = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const launchApp = async () => {
    setLoading(true); // Start loading
    setMessage("");
    setError("");

    try {
      const response = await instance.post("/launch-exe", {}); // Use axios instance
      const data = response.data;

      if (data.error) {
        setError(data.error);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setError("Error launching application");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={launchApp}
        disabled={loading} // Disable button while loading
      >
        {loading ? "Launching..." : "Launch Application"}
        
      </Button>

      {loading && (
        <div style={{ marginTop: "20px" }}>
          <CircularProgress /> {/* Show spinner while loading */}
        </div>
      )}

      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Broadcast;
