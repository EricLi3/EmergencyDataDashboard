import React from 'react';
import { Card, CardContent, CardActions, Grid, Typography, Button, Container } from '@mui/material';
const Guides = () => {
    const links = [
        {
            title: 'Google Drive Tutorial',
            url: "https://www.youtube.com/watch?v=xD__SUfXEv0&list=PLomN84AdULIB0dE8eOCkeCfGsYj_EDksO&index=2",
            image: "/images/google_drive.png"
        },
        {
            title: 'Google Forms Tutorial',
            url: 'https://www.youtube.com/watch?v=PrnH8qLuf1Y',
            image: "/images/google_forms_logo.png"
        },
        {
            title: 'Google Sheets Tutorial',
            url: 'https://www.youtube.com/watch?v=wbzz-8SyMT8',
            image: "/images/google_sheets_logo.png"
        },
        {
            title: 'Google Maps Tutorial',
            url: 'https://www.youtube.com/watch?v=YbtIzQ6Y4CY',
            image: "/images/google_maps_logo.png"
        },
        {
            title: "Signup.com Tutorial",
            url: "https://docs.google.com/document/d/1tELaCyLX2zp9AAuuv3CUbqHlIaxudia7Duj-OpEgFJY/edit?usp=sharing",
            image: "/images/signup.png"
        },
        {
            title: "Preparing your Household",
            url: "https://docs.google.com/document/d/1T_Akf8E7GPLcp-cUvguSpTWHP-dBCMAkxt2y1jRdwLs/edit?usp=sharing",
            image: "/images/housePrep.png"
        },
        {
            title: "Goyco Resource Directory",
            url: "https://docs.google.com/document/d/11rWCdjycUT5FS0__1B6TYiD0P9pieWiSncKD-3W3o4o/edit?usp=sharing",
            image: "/images/resource_directory.png"
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
