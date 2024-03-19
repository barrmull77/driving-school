import React, { useEffect,useState } from 'react';
import { Box, styled } from '@mui/material';
import { Outlet } from "react-router-dom";
import SideBar from '../components/SideBar';
import theme from '@/themes/DriveTheme';

  
const HomeLayout: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', backgroundColor: theme.palette.secondary.light }}>
            <SideBar />
            <Outlet />
        </Box>
    );
};
  
  export default HomeLayout;
  