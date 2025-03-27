import React, { useState } from "react";

const Broadcast = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const launchApp = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/launch-exe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setError("Error launching application");
    }
  };

  return (
    <div>
      <button onClick={launchApp}>Launch Application</button>
      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Broadcast;
