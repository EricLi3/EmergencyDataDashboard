import React from 'react';

const Guides = () => {
    const links = [
        {
            title: 'Google Sheets Tutorial',
            url: 'https://support.google.com/a/users/answer/9282959',
        },
        {
            title: 'Google Forms Tutorial',
            url: 'https://support.google.com/docs/answer/6281888?hl=en&co=GENIE.Platform%3DDesktop',
        },
        {
            title: 'Google Maps Tutorial',
            url: 'https://bpb-us-w2.wpmucdn.com/wp.wpi.edu/dist/e/203/files/2023/05/WPI-Fondita-My-Maps-Facilitators-Guide.pdf',
        },
    ];

    return (
        <div>
            <h1>Guides</h1>
            <div>
                {links.map((link, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h2>{link.title}</h2>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                            Open Guide
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Guides;
