import React from "react";
import WeatherBanner from "../WeatherBanner/WeatherBanner";

const Home = () => {
	return (
		<div>
		<WeatherBanner /> {/* Include the WeatherBanner component */}
		
			<div>
				<p>This project is to support the efforts of La Goyco's emergency management plan. We provide intuitive tools to help gain insights into individuals and the greater population of the Machuchal (Santurce) community.</p>
				<a href="https://docs.google.com/document/d/17SJVW1pSIO0-5AJVhaxaLKvc3RfdGFeF6Fjx6NWUm2E/edit?usp=sharing">Click here to see a guide on how to use this dashboard tool.</a>
			</div>
		</div>
	);
};

export default Home;