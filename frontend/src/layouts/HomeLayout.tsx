import React, { useEffect,useState } from 'react';
import { Box, styled } from '@mui/material';
import SideBar from '../components/SideBar';
import { Outlet } from "react-router-dom";
  
const HomeLayout: React.FC = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <SideBar />
            <Outlet />
        </Box>
    );
};
  
  export default HomeLayout;
  