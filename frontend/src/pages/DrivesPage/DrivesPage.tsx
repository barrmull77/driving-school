import React from 'react';
import { Box, Container, Typography } from '@mui/material';


const Homepage: React.FC = () => {
    return (
        <Container>
            <Box>
                <Typography component="h2" sx={{ mb: 2 }}>
                    Drives
                </Typography>
            </Box>
        </Container>
    );
}

export default Homepage;
