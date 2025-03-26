import React from "react";
import "./WhatsAppNumbers.css";

const WhatsAppNumbers = ({ numbers }) => {

  const saveToFile = () => {
    const formattedNumbers = numbers.join('\n');
    const blob = new Blob([formattedNumbers], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'numbers.txt';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="numbers-container">
      <h1>WhatsApp Numbers</h1>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
      <button onClick={saveToFile}>Save to .txt</button>
    </div>
  );
};

export default WhatsAppNumbers;
