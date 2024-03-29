import React, { useState, useEffect } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { Box, Drawer, IconButton, Link, List, ListItem, ListItemButton, ListItemText, SvgIcon, Typography } from '@mui/material';
import { ReactComponent as DrawerOpenIcon } from '@/assets/icons/drawer-icon.svg'
import { ReactComponent as DrawerClosedIcon } from '@/assets/icons/drawer-closed-icon.svg'
import { ReactComponent as DriveBlackIcon } from '@/assets/icons/drive-black-icon.svg'
import { ReactComponent as SettingsBlackIcon } from '@/assets/icons/settings-black-icon.svg'
import { ReactComponent as DriveGreenIcon } from '@/assets/icons/drive-green-icon.svg'
import { ReactComponent as SettingsGreenIcon } from '@/assets/icons/settings-green-icon.svg'
import { useSidebarStore } from '@/store/store';
import theme from '@/themes/DriveTheme';

interface MenuItem {
    text: string;
    icon: {
      selected: React.ElementType;
      unselected: React.ElementType;
    };
    path: string;
}

export const drawerWidth = {
    open: 272,
    closed: 72
}

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth.open,
    backgroundColor: theme.palette.secondary.light,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
  
const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.secondary.light,
    overflowX: 'hidden',
    width: drawerWidth.closed,
});

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth.open,
      
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
);

const SideBarHeader = styled(Box)(({ theme }) => ({
    marginTop: '1.5rem',
    marginLeft: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    height: '58px'
}));

const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1),
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }));


const Sidebar: React.FC = () => {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
    const setSidebarOpen = useSidebarStore((state) => state.setSidebarOpen);

    const menuItems: MenuItem[] = [
        { 
            text: 'Drives', 
            icon: {
                selected: DriveGreenIcon,
                unselected: DriveBlackIcon
            },
            path: '/',  
        },
        { 
            text: 'Settings',
            icon: {
                selected: SettingsGreenIcon,
                unselected: SettingsBlackIcon
            },
            path: '/settings' 
        },
    ];

    useEffect(() => { 
        const updateDrawerState = () => {
          const isMobile = window.innerWidth < theme.breakpoints.values.lg; 
          setSidebarOpen(!isMobile);
        };
    
        updateDrawerState();
    
       
        window.addEventListener('resize', updateDrawerState);
        return () => window.removeEventListener('resize', updateDrawerState);
    }, []);
    
    
    return (
        <StyledDrawer
            variant="permanent"
            open={isSidebarOpen}
            anchor="left"
        >
            <SideBarHeader sx={{
                marginTop: '1.5rem',
                marginLeft: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                height: '58px'
            }}>
                <LogoContainer
                    sx={{
                        opacity: isSidebarOpen ? 1 : 0, // Adjust opacity based on the isSidebarOpen state
                        position: isSidebarOpen ? 'relative' : 'absolute',
                        padding: isSidebarOpen ? theme.spacing(2) : theme.spacing(1), // Adjust padding based on the open state
                    }}
                >
                    <Typography 
                                    variant="h1" 
                                    component="h1" 
                                    color="black"
                                    sx={{
                                        opacity: isSidebarOpen ? 1 : 0, // Adjust opacity based on the open state
                                        position: isSidebarOpen ? 'relative' : 'absolute',
                                        padding: isSidebarOpen ? theme.spacing(2) : theme.spacing(1), // Adjust padding based on the open state
                                    }}
                                    >
                                    DriveSchool
                                </Typography>
                </LogoContainer>

                <IconButton 
                    onClick={toggleSidebar}
                    sx={{
                        height: '40px',
                        width: '40px',
                        marginRight: '1.75rem'
                    }}
                    >
                        <SvgIcon
                            component={isSidebarOpen ? DrawerOpenIcon : DrawerClosedIcon}
                            sx={{ width: 16, height: 10 }}
                            viewBox="0 0 16 10"
                        />
                </IconButton>
            </SideBarHeader>
           

            <Box>
                <List 
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2.4rem'}}>
                    {menuItems.map((item) => (
                            <ListItemButton
                                key={item.text}
                                component={Link} // Todo - find solution for Typescript error 
                                to={item.path}
                                sx={{
                                    height: '48px',
                                    width: isSidebarOpen ? '224px' : 'auto',
                                    backgroundColor: location.pathname === item.path ? theme.palette.primary.light : 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                    },
                                }}
                            >
                                <SvgIcon
                                    component={location.pathname === item.path ? item.icon.unselected : item.icon.selected}
                                    sx={{ width: 20, height: 20, color: theme.palette.text.primary }}
                                    viewBox="0 0 20 20"
                                    color="secondary"
                                />
                                <Typography 
                                    variant="h3" 
                                    component="span" 
                                    color={location.pathname === item.path ? "primary.main" : "text.primary"}
                                    sx={{
                                        opacity: isSidebarOpen ? 1 : 0, // Adjust opacity based on the open state
                                        position: isSidebarOpen ? 'relative' : 'absolute',
                                        padding: isSidebarOpen ? theme.spacing(2) : theme.spacing(1), // Adjust padding based on the open state
                                    }}
                                    >
                                    {item.text}
                                </Typography>
                            </ListItemButton>
                    ))}
                </List>
            </Box>
            
        </StyledDrawer>
    );
}

export default Sidebar
