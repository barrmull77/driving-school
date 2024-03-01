import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useDriveStore } from '@/store/store';
import { ReactComponent as DownArrowIcon } from '@/assets/icons/down-arrow-icon.svg'
import DriveListItem from '../DriveListItem';
import theme from '@/themes/YaakTheme';

interface stickyStyles {
    stickyWidth: string
    stickyPosition: string;
    isFirstPosition?: boolean;
}

interface DriveListHeader {
    name: string;
    icon?: SvgIconComponent;
    stickyStyles?: StickyStyle;
}

export const createSticky = (stickStyles: stickyStyles) => ({
    [theme.breakpoints.down('lg')]: {
        position: 'sticky',
        right: stickStyles.stickyPosition,
        width: stickStyles.stickyWidth, 
        zIndex: 101,
        ...(stickStyles.isFirstPosition && {
            '&::before': {
                content: '""', 
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                boxShadow: '-6px 0px 14px -5px rgba(0, 0, 0, 0.2), 5px 0px 5px -5px rgba(0, 0, 0, 0.1), -5px 0px 5px -5px rgba(0, 0, 0, 0.1)',
                zIndex: -1, 
            },
        })
    } 
});

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex', 
    alignItems: 'center' 
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    border: 0, 
    flex: '1',
    backgroundColor: theme.palette.secondary.main
}));

export const stickyStyles = {
    stickyStylesStatus: {
        stickyWidth: '72px',
        stickyPosition: '218px',
        isFirstPosition: true
    },
    stickyStylesData: {
        stickyWidth: '72px',
        stickyPosition: '162px',
        isFirstPosition: false
    },
    stickyStylesBitrate:  {
        stickyWidth: '94px',
        stickyPosition: '72px',
        isFirstPosition: false
    },
    stickyStylesClipboard: {
        stickyWidth: '46px',
        stickyPosition: '0px',
        isFirstPosition: false
    }
}

const DriveList: React.FC = () => {
    const { drives, loading, error, fetchDrives, filteredDrives } = useDriveStore();

    const DriveListHeaders: DriveListHeader[] = [
        {
            name: 'Time',
            icon: DownArrowIcon
        },
        {
            name: 'Partner'
        },
        {
            name: 'Type'
        },
        {
            name: 'Vehicle'
        },
        {
            name: 'Kit ID'
        },
        {
            name: 'Driver'
        },
        {
            name: 'Instructor'
        },
        {
            name: 'Status',
            stickyStyles: stickyStyles.stickyStylesStatus
        },
        {
            name: 'Data',
            stickyStyles: stickyStyles.stickyStylesData
        },
        {
            name: 'Bitrate',
            stickyStyles: stickyStyles.stickyStylesBitrate
        },
        {
            name: '',
            stickyStyles: stickyStyles.stickyStylesClipboard
        }
    ]

    useEffect(() => {
        fetchDrives();
    }, [fetchDrives]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <TableContainer component={Paper} sx={{  maxWidth: '100%', overflowX: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: theme.palette.secondary.main, border: 0 }}>
                <TableRow sx={{ boxSizing: 'border-box'}}>
                    {DriveListHeaders.map((item, index) => (
                        <StyledTableCell key={`header-id-${index}`} align="left" sx={item.stickyStyles ? createSticky(item.stickyStyles) : null}>
                            <StyledBox >
                                <Typography variant='body2' color="text.secondary">
                                    {item.name}
                                </Typography>
                                {item.icon && <SvgIcon component={item.icon} sx={{ width: 10, height: 10, marginLeft: '0.2rem' }} viewBox="0 0 10 10"/>}
                            </StyledBox>
                        </StyledTableCell>
                    ))}
                    
                </TableRow>
            </TableHead>
          
            <TableBody>
            {filteredDrives().map((drive) => (
                <DriveListItem key={drive.id} data={drive} />
            ))}
            </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DriveList