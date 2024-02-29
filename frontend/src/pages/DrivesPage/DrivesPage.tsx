import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import DateFilter from '@/components/DateFilter';
import DriveList from '@/components/DriveList';
import theme from '@/themes/YaakTheme';


const Homepage: React.FC = () => {
    return (
        <Box sx={{ height: '100vh', width: '100%', padding: '24px' }}>
            <Box sx={{ width: '100%', padding: '24px', backgroundColor: theme.palette.common.white }}>
                <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
                    Drives
                </Typography>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', heigth: '48px', margin: '16px 0'}}>
                    <SearchBar />
                    <DateFilter />
                </Box>
                <Box>
                    <DriveList />
                </Box>
            </Box>
        </Box>
    );
}

export default Homepage;
