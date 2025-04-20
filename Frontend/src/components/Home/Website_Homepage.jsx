import React from "react";
import WeatherBanner from "../WeatherBanner/WeatherBanner";
import "./Website_Homepage.css";

const Home = () => {
	return (
		<div>
			<WeatherBanner /> {/* Include the WeatherBanner component */}

			<div className="home-container">
				<p>This project is to support the efforts of La Goyco's emergency management plan. We provide intuitive tools to help gain insights into individuals and the greater population of the Machuchal (Santurce) community.</p>
				<a href="https://docs.google.com/document/d/17SJVW1pSIO0-5AJVhaxaLKvc3RfdGFeF6Fjx6NWUm2E/edit?usp=sharing">Click here to see a guide on how to use this dashboard tool.</a>
				<br></br>
				<br></br>
				Developed by a collaboration between Worcester Polytechnic Institute (WPI) and Taller Comunidad La Goyco, a community-based organization, the system aims to simplify data collection and improve community outreach. It allows for efficient organization of resident data, ensuring that everyone can participate, regardless of their technical abilities.
				<br></br>
				Learn more about WPI's Puerto Rico initiatives: <a href="https://wp.wpi.edu/puertorico/">WPI Puerto Rico</a>
				<br></br>
				<br></br>
				La Goyco is a community-based organization in Santurce, Puerto Rico, dedicated to improving the quality of life for its residents. They focus on community development, education, and social justice initiatives. Their work includes providing resources and support for local residents, fostering a sense of community, and advocating for the needs of the Machuchal neighborhood.
				<br></br>
				Visit La Goyco's website: <a href="https://www.lagoyco.org/"> La Goyco</a>


			</div>
		</div>
	);
};

export default Home;