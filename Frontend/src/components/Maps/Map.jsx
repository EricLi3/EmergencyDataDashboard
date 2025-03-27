import React from "react";

const Map = () => {
    return (
        <div>
            <h1>Map</h1>
            <iframe 
                src="https://www.google.com/maps/d/u/0/embed?mid=1kDED7vqz9AogrU1Gtooek6W2IZ8koY8&ehbc=2E312F&noprof=1" 
                width="940" 
                height="680"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Master Maps"
            ></iframe>
        </div>
    );
};

export default Map;