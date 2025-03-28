import React from 'react';

const Guides = () => {
    const videos = [
        {
            title: 'Google Sheets Tutorial',
            url: 'https://www.youtube.com/embed/exampleSheetsVideoID',
        },
        {
            title: 'Google Forms Tutorial',
            url: 'https://www.youtube.com/embed/exampleFormsVideoID',
        },
        {
            title: 'Google Maps Tutorial',
            url: 'https://www.youtube.com/embed/exampleMapsVideoID',
        },
    ];

    return (
        <div>
            <h1>Guides</h1>
            <div>
                {videos.map((video, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h2>{video.title}</h2>
                        <iframe
                            width="560"
                            height="315"
                            src={video.url}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Guides;
