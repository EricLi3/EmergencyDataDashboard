import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Deliverables = ({ image, title, subtitle, text, userLink, editorLink }) => {
    return (
        <Card className="card-hover" style={{ width: '20rem', height: '27rem', margin: '5px', backgroundColor: 'white', border: '1px solid black' }}>
            <Card.Img variant="top" src={image} style={{ height: '250px', objectFit: 'cover' }} />
            <br />
            <Card.Body>
                <Card.Title style={{ color: 'black' }}>
                    <b>{title}</b>
                    {subtitle && <><br /><i>{subtitle}</i></>}
                </Card.Title>
                <Card.Text style={{ color: '#9CS3AF', textAlign: 'center' }}>
                    {text}
                </Card.Text>
                <br />
                <Stack spacing={2} direction="row" justifyContent="center">
                    {userLink && <Button variant="text" href={userLink} target="_blank" rel="noopener noreferrer">User Link</Button>}
                    {editorLink && <Button variant="contained" href={editorLink} target="_blank" rel="noopener noreferrer">Editor Link</Button>}
                </Stack>
            </Card.Body>
        </Card>
    );
};

export default Deliverables;
