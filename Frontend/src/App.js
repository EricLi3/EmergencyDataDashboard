import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import ResidentList from "./components/ResidentList/Resident_list";
import PersonProfile from "./components/PersonProfile/Person_profile";
import WhatsAppNumbers from "./components/WhatsAppNumbers/WhatsAppNumbers";
import Navbar from "./components/Navbar/Navbar";
import Map from "./components/Maps/Map";
import Workflow from "./components/Workflow/Workflow";
import "./App.css";

function App() {
  const [residents, setResidents] = useState([]);
  const [whatsappNumbers, setWhatsappNumbers] = useState([]);
  const [loading, setLoading] = useState(true);


  // Function to fetch residents
  const fetchResidents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:5000/get_residents");
      setResidents(response.data);
    } catch (error) {
      console.error("Error fetching residents!", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch WhatsApp numbers
  const fetchWhatsAppNumbers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/get_whatsapp_numbers");
      setWhatsappNumbers(response.data.whatsapp_numbers);
    } catch (error) {
      console.error("Error fetching WhatsApp numbers!", error);
    }
  };

  useEffect(() => {
    fetchResidents();
    fetchWhatsAppNumbers();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ResidentList residents={residents} fetchResidents={fetchResidents} loading={loading} />} />
          <Route path="/profile/:id" element={<PersonProfile residents={residents} />} />
          <Route path="/whatsapp" element={<WhatsAppNumbers numbers={whatsappNumbers} />} />
          <Route path="/map" element={<Map />} />
          <Route path="/workflow" element={<Workflow />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
