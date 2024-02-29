import React, { useEffect } from 'react'
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
import theme from '@/themes/YaakTheme'

const DriveList: React.FC = () => {
    const { drives, loading, error, fetchDrives } = useDriveStore();

    const DriveListHeaders = [
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
            name: 'Status'
        },
        {
            name: 'Data'
        },
        {
            name: 'Bitrate'
        }
    ]

    useEffect(() => {
        fetchDrives();
    }, [fetchDrives]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: theme.palette.secondary.main, border: 0 }}>
                <TableRow>
                    {DriveListHeaders.map((item, index) => (
                        <TableCell key={`header-id-${index}`} align="left" sx={{ border: 0, flex: '1' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant='body2' color="text.secondary">
                                    {item.name}
                                </Typography>
                                {item.icon && <SvgIcon component={item.icon} sx={{ width: 10, height: 10, marginLeft: '0.2rem' }} viewBox="0 0 10 10"/>}
                            </Box>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
          
            <TableBody>
            {drives.map((drive) => (
                <DriveListItem key={drive.id} data={drive} />
            ))}
            </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DriveList