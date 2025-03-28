import React, { useState } from "react";
import axios from "../../axios/axiosConfig";

const Broadcast = () => {
  const [numbersFile, setNumbersFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleFileUpload = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (type === "numbers") setNumbersFile(response.data.file_path);

      console.log(response.data.file_path);
      console.log(response.data.message);
      if (type === "image") setImageFile(response.data.file_path);
      setStatus(response.data.message);
    } catch (error) {
      setStatus("Error uploading file");
    }
  };

  const handleSendMessages = async () => {
    console.log(numbersFile, message, imageFile);
    if (!numbersFile || (!message && !imageFile)) {
      setStatus("Please provide all required inputs");
      return;
    }

    try {
      const response = await axios.post("/send-messages", {
        numbers_file: numbersFile,
        message,
        image_path: imageFile,
      });
      setStatus(response.data.message);
    } catch (error) {
      setStatus("Error sending messages");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>WhatsApp Broadcast</h1>
      <div>
        <label>Upload Numbers File:</label>
        <input
          type="file"
          accept=".txt"
          onChange={(e) => handleFileUpload(e.target.files[0], "numbers")}
        />
      </div>
      <br></br>
      <div>
        <label>Upload Image (Optional):</label>
        <input
          type="file"
          accept=".jpg"
          onChange={(e) => handleFileUpload(e.target.files[0], "image")}
        />
      </div>
      <br></br>
      <div>
        <label>Enter Message:</label>
        <textarea
          rows="4"
          cols="50"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button onClick={handleSendMessages}>Send Messages</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default Broadcast;
