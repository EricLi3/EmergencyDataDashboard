import React from "react";

const Map = () => {
    return (
        <div>
            <h1>Map</h1>
            <iframe 
                src="https://www.google.com/maps/d/u/0/embed?mid=1kDED7vqz9AogrU1Gtooek6W2IZ8koY8&ehbc=2E312F&noprof=1" 
                width="640" 
                height="480"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default Map;