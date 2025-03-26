import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PersonProfile.css";  // Add some styling

const PersonProfile = ({ residents }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the selected resident by ID
  const resident = residents[parseInt(id)];

  if (!resident) {
    return <div>Resident not found!</div>;
  }

  return (
    <div className="profile-container">
      <h1>Resident Profile</h1>
      <div className="profile-card">
        <p><strong>Name:</strong> {resident["Name of main point of contact (First, Last)"]}</p>
        <p><strong>Phone:</strong> {resident["Phone Number for WhatsApp Communication (Include Area Code e.g \"1\" for U.S. Numbers)"]}</p>
        <p><strong>Email:</strong> {resident["Email Address"]}</p>
        <p><strong>Address:</strong> {resident["Location (Address/Coordinates) of Home"]}</p>
        <p><strong>Number of Residents:</strong> {resident["Number of Residents"]}</p>
        <p><strong>Newsletter Subscription:</strong> {resident["Want to be added to the Monthly Newsletter email chain?"]}</p>
        <p><strong>WhatsApp Alerts:</strong> {resident["Would you like to receive important WhatsApp alerts?"]}</p>
        <p><strong>Volunteer Interest:</strong> {resident["Would you like to volunteer?"]}</p>
        <p><strong>Skills:</strong> {resident["Skills"]}</p>
      </div>

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default PersonProfile;
