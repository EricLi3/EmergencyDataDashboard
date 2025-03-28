import React from "react";
import "./WhatsAppNumbers.css";
import Alert from '@mui/material/Alert';
import Broacast from '../Broadcast/Broadcast';

const WhatsAppNumbers = ({ numbers }) => {

  const [showAlert, setShowAlert] = React.useState(false);

  const saveToFile = () => {
    const formattedNumbers = numbers.map(num => `+${num}`).join('\n'); // Prepend + to each number
    const blob = new Blob([formattedNumbers], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'numbers.txt';
    link.click();
    URL.revokeObjectURL(link.href);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="numbers-container">
      <h1>WhatsApp Numbers</h1>
      {showAlert && <Alert severity="success">File saved successfully!</Alert>} {/* Show alert if file is saved */}
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>+{number}</li> // Prepend + here as well
        ))}
      </ul>
      <button onClick={saveToFile}>Save to .txt</button>

      <Broacast />

    </div>
  );
};

export default WhatsAppNumbers;
