import React, { useState, useEffect } from "react";
import axios from "axios";

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
      <h1>Residents List</h1>
      <ul>
        {residents.map((resident, index) => (
          <li key={index}>
            {resident["Name of main point of contact (First, Last)"]} -{" "}
            {resident["Phone Number for WhatsApp Communication (Include Area Code e.g \"1\" for U.S. Numbers)"]}
          </li>
        ))}
      </ul>
      <h2>WhatsApp Numbers</h2>
      <ul>
        {whatsappNumbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
