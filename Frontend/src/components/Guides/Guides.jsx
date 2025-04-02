import React from 'react';
import { Card, CardContent, CardActions,Grid, Typography, Button, Container } from '@mui/material';
const Guides = () => {
    const links = [
        {
            title: 'Google Forms Tutorial',
            url: 'https://support.google.com/docs/answer/6281888?hl=en&co=GENIE.Platform%3DDesktop',
            image: "/images/google_forms_logo.png"
        },
        {
            title: 'Google Sheets Tutorial',
            url: 'https://support.google.com/a/users/answer/9282959',
            image: "/images/google_sheets_logo.png"
        },
        {
            title: 'Google Maps Tutorial',
            url: 'https://bpb-us-w2.wpmucdn.com/wp.wpi.edu/dist/e/203/files/2023/05/WPI-Fondita-My-Maps-Facilitators-Guide.pdf',
            image: "/images/google_maps_logo.png"
        },
        {
            title: "Signup.com Tutorial",
            url: "https://signup.com/Video/VideoTour",
            image: "/images/signup.png"
        },
        {
            title: "Preparing your Household",
            url: "https://docs.google.com/document/d/1T_Akf8E7GPLcp-cUvguSpTWHP-dBCMAkxt2y1jRdwLs/edit?usp=sharing",
            images: "/images/housePrep.png"
        },
    ];

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>    
            <Typography variant="h4" gutterBottom>
                <b>Guides</b>
            </Typography>
            <br></br>
            <Grid container spacing={3}>
                {links.map((link, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                minHeight: 160,
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': { transform: 'scale(1.05)' },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {link.title}
                                </Typography>

                                <img
                                    src={link.image}
                                    alt={link.title}
                                    style={{
                                        width: '200px',
                                        height: '160px',
                                        }}
                                />

                            </CardContent>
                            <CardActions>
                                <Button 
                                    size="small" 
                                    variant="contained" 
                                    color="primary"         
                                    href={link.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    Open Guide
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Guides;
