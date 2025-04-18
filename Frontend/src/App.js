import React, { useState, useEffect, useCallback } from "react";
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import ResidentList from "./components/ResidentList/Resident_list";
import PersonProfile from "./components/PersonProfile/Person_profile";
import WhatsAppNumbers from "./components/WhatsAppNumbers/WhatsAppNumbers";
import Navbar from "./components/Navbar/Navbar";
import Map from "./components/Maps/Map";
import Workflow from "./components/Workflow/Workflow";
import Inventory from "./components/Inventory/Inventory";
import Guides from "./components/Guides/Guides";
import instance from "./axios/axiosConfig";
import Groups from "./components/Groups/Groups";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [residents, setResidents] = useState([]);
  const [whatsappNumbers, setWhatsappNumbers] = useState([]);
  const [contactGroups, setContactGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", true);
    fetchData();
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([fetchResidents(), fetchWhatsAppNumbers(), fetchContactGroups()]);
    } catch (error) {
      console.error("Error fetching data!", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to fetch residents
  const fetchResidents = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/get_residents");
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
      const response = await instance.get("/get_whatsapp_numbers");
      setWhatsappNumbers(response.data.whatsapp_numbers);
    } catch (error) {
      console.error("Error fetching WhatsApp numbers!", error);
    }
  };

  const fetchContactGroups = async () => {
    try {
      const response = await instance.get("/get_groups");
      setContactGroups(response.data);
    } catch (error) {
      console.error("Error fetching contact groups!", error);
    }
  }

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
      fetchData(); // Fetch data if already logged in
    }
  }, [fetchData]);

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <Analytics />
      <Router>
        <Navbar />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<ResidentList residents={residents} fetchResidents={fetchResidents} loading={loading} />}
            />
            <Route path="/profile/:id" element={<PersonProfile residents={residents} />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/whatsapp" element={<WhatsAppNumbers numbers={whatsappNumbers} />} />
            <Route path="/map" element={<Map />} />
            <Route path="/workflow" element={<Workflow />} />
            <Route
              path="/groups"
              element={<Groups groups={contactGroups} fetchContactGroups={fetchContactGroups} />}
            />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
