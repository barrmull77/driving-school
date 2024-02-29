import React, { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Box, Drawer, IconButton, Link, List, ListItem, ListItemButton, ListItemText, SvgIcon, Typography } from '@mui/material';
import { ReactComponent as YaakLogo } from '@/assets/icons/yaak-logo.svg'
import { ReactComponent as DrawerOpenIcon } from '@/assets/icons/drawer-icon.svg'
import { ReactComponent as DrawerClosedIcon } from '@/assets/icons/drawer-closed-icon.svg'
import theme from '@/themes/YaakTheme';

const drawerWidth = {
    open: 272,
    closed: 72
}

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth.open,
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


const Sidebar = () => {
    const [open, setOpen] = useState<boolean>(true);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const menuItems = [
        { text: 'Home', path: '/' },
        { text: 'Settings', path: '/settings' },
      ];
    
    // // wrapper for Link to remove typescript error
    // const link = (p: unknown) => <Link to={route} {...p} />;
    
    return (
        <StyledDrawer
            variant="permanent"
            open={open}
            anchor="left"
        >
            <Box sx={{
                display: 'flex',
                position: 'relative',
                height: '2.2rem'
            }}>
                <LogoContainer
                    sx={{
                    opacity: open ? 1 : 0, // Adjust opacity based on the open state
                    padding: open ? theme.spacing(2) : theme.spacing(1), // Adjust padding based on the open state
                    }}
                >
                    <SvgIcon component={YaakLogo} sx={{ width: 76, height: 26 }} viewBox="0 0 122 48"/>
                </LogoContainer>

                <IconButton 
                    onClick={handleDrawerToggle}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: '4px'
                    }}
                    >
                        <SvgIcon
                            component={open ? DrawerOpenIcon : DrawerClosedIcon}
                            sx={{ width: 16, height: 10 }}
                            viewBox="0 0 16 10"
                        />
                </IconButton>
            </Box>
           

            <Box>
                <List>
                    {menuItems.map((item) => (
                            <ListItemButton
                                key={item.text}
                                component={Link} // Todo - find solution for Typescript error 
                                to={item.path}
                                sx={{
                                    backgroundColor: location.pathname === item.path ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                    },
                                }}
                            >
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                    ))}
                </List>
            </Box>
            
        </StyledDrawer>
    );
}

export default Sidebar
