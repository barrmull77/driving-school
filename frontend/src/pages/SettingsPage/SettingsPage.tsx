import React from 'react';
import { Box, Container, Typography } from '@mui/material';


const Homepage: React.FC = () => {
    return (
        <Container maxWidth={false} sx={{ width: isSidebarOpen ? `calc(100% - ${drawerWidth.open}px)` : `calc(100% - ${drawerWidth.closed}px)`, p: { xs: 3, xl: 5 }, }}>
            <Box>
                <Typography variant="h2" component="h2" sx={{ mt: 2,  mb: 2 }}>
                    Settings
                </Typography>
            </Box>
        </Container>
    );
}

export default Homepage;
