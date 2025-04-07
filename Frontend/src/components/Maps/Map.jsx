import React from "react";
import Grid from "@mui/material/Grid";

const Map = () => {
    return (
        <div>
            <h1>Maps</h1>
            <iframe
                src="https://www.google.com/maps/d/u/0/embed?mid=1kDED7vqz9AogrU1Gtooek6W2IZ8koY8&ehbc=2E312F&noprof=1"
                width="940"
                height="680"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Master Maps"
            ></iframe>
            <iframe 
                src="https://www.google.com/maps/d/u/0/embed?mid=1ftp1OHpSv_MlQHfXJcm6WdjzJ0MHG0I&ehbc=2E312F" 
                width="940"
                height="680"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Public Facilities Map"
            ></iframe>
            <iframe 
                src="https://www.google.com/maps/d/u/0/embed?mid=1wn_DatPEL8_EOz29NJWEOdsOKjzyovc&ehbc=2E312F" 
                width="940"
                height="680"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Community Shelters Map"
            ></iframe>

            <Grid container justifyContent="center" sx={{ mt: 4 }}>
                <img
                    src="/images/flood_risk.png"
                    alt="Flood Risk Map"
                    style={{ width: '100%', maxWidth: '1200px', borderRadius: '8px' }}
                />
            </Grid>
        </div>
    );
};

export default Map;