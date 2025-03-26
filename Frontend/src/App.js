import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import ResidentList from "./components/ResidentList/Resident_list";
import PersonProfile from "./components/PersonProfile/Person_profile";
import WhatsAppNumbers from "./components/WhatsAppNumbers/WhatsAppNumbers";
import Navbar from "./components/Navbar/Navbar";
import Map from "./components/Maps/Map";
import "./App.css";

function App() {
  const [residents, setResidents] = useState([]);
  const [whatsappNumbers, setWhatsappNumbers] = useState([]);

  useEffect(() => {
    // Fetch residents data 
    axios
      .get("http://127.0.0.1:5000/get_residents")
      .then((response) => {
        setResidents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the residents!", error);
      });

    // Fetch WhatsApp numbers
    axios
      .get("http://127.0.0.1:5000/get_whatsapp_numbers")
      .then((response) => {
        setWhatsappNumbers(response.data.whatsapp_numbers);
      })
      .catch((error) => {
        console.error("There was an error fetching the WhatsApp numbers!", error);
      });
  }, []);

  return (
    <div className="App">    
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<ResidentList residents={residents} />} />
          <Route path="/profile/:id" element={<PersonProfile residents={residents} />} />
          <Route path = "/whatsapp" element={<WhatsAppNumbers numbers={whatsappNumbers} />} />
          <Route path = "/map" element={<Map></Map>} />
        </Routes>
    </Router>
  </div>
  );
}

export default App;
