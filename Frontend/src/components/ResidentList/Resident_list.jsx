import React from "react";
import { Link } from "react-router-dom";
import "./ResidentList.css"; // Add some styling

const ResidentList = ({ residents }) => {
  return (
    <div className="resident-list">
      <h1>Enrolled Residents</h1>
      <ul>
        {residents.map((resident, index) => (
          <li key={index}>
            <Link to={`/profile/${index}`}>
              {resident["Name of main point of contact (First, Last)"]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResidentList;
