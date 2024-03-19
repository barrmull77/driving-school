import React from 'react';
import { Box, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import SearchBar from '@/components/SearchBar';
import DateFilter from '@/components/DateFilter';
import DriveList from '@/components/DriveList';
import theme from '@/themes/DriveTheme';
import { useSidebarStore } from '@/store/store';
import { drawerWidth } from '@/components/SideBar/Sidebar';


const Homepage: React.FC = () => {
    const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

    return (
        <Container maxWidth={false} sx={{ width: isSidebarOpen ? `calc(100% - ${drawerWidth.open}px)` : `calc(100% - ${drawerWidth.closed}px)`, p: { xs: 3, xl: 5 }, }}>
            <Box sx={{ maxWidth: '100vw', width: '100%', padding: '24px', backgroundColor: theme.palette.common.white }}>
                <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
                    Drives
                </Typography>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', heigth: '48px', margin: '16px 0'}}>
                    <SearchBar />
                    <DateFilter />
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper>
                            <DriveList />    
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Homepage;
