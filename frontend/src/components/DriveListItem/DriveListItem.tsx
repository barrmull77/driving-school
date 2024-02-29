import React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip';
import SvgIcon from '@mui/material/SvgIcon';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ReactComponent as CheckmarkIcon } from '@/assets/icons/checkmark-icon.svg'
import { ReactComponent as RightArrowIcon } from '@/assets/icons/right-arrow-icon.svg'
import { ReactComponent as WarningIcon } from '@/assets/icons/warning-icon.svg'
import Progress from '../Progress';
import theme from '@/themes/YaakTheme'

// Todo - add interface for props
const DriveListItem: React.FC<any> = ({ data = {}}) => {

    const renderDriverInfo = (driver: any) => {
        if (!driver) {
          return <span>—</span>;
        }
      
        return (
          <Box>
            {driver.profileImageURL && (
              <img src={driver.profileImageURL} alt={`${driver.firstname} ${driver.lastname}`} loading="lazy" />
            )}
            <span>
              {driver.firstname ? driver.firstname : "—"}
              &nbsp;
              {driver.lastname ? driver.lastname : "—"}
            </span>
          </Box>
        );
    };

    const renderStatusIcon = (status: number) => {
        switch (status) {
          case 0:
            return <SvgIcon component={CheckmarkIcon} sx={{ width: 16, height: 16 }} viewBox="0 0 16 16" />;
          case 1:
            return <SvgIcon component={WarningIcon} sx={{ width: 16, height: 16 }} viewBox="0 0 16 16" />;
          case 3:
            return <SvgIcon component={RightArrowIcon} sx={{ width: 12, height: 12 }} viewBox="0 0 12 12" />;
          default:
            return null; // Return null or any default icon if no cases match
        }
    };

    const renderProgress = (progress: number) => {
        const percentage = parseInt((progress / 200 * 100).toFixed(0));

        if (progress > 200) {
            return <SvgIcon component={CheckmarkIcon} sx={{ width: 16, height: 16 }} viewBox="0 0 16 16" />;
        } else {
            return <Progress percentage={percentage} strokeWidth={16} />;
        }
    }

    const renderBitrate = (bitrate: number) => {
        if (!bitrate) {
            return <span>—</span>;
        }

        const text = bitrate === 8192 ? '8Mbps' : '4Mbps';
        const styles = bitrate === 8192
            ? { backgroundColor: theme.palette.primary.light, color: theme.palette.primary.main }
            : { backgroundColor: theme.palette.yellowChip.light, color: theme.palette.yellowChip.main };

        return <Chip label={text} sx={styles} />;
        
    }


    return (
        <TableRow
            key={data.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {data.startTimestamp ? data.startTimestamp : "\u2014"}
            </TableCell>
            <TableCell component="th" scope="row">
                {data.partner?.name ? data.partner.name : "\u2014"}
            </TableCell>
            <TableCell component="th" scope="row">
                Student
            </TableCell>
            <TableCell component="th" scope="row">
                {data.licensePlate ? data.licensePlate : "\u2014"}
            </TableCell>
            <TableCell component="th" scope="row">
                {data.dongleId ? data.dongleId : "\u2014"}
            </TableCell>
            <TableCell component="th" scope="row">
                {renderDriverInfo(data.driver)}
            </TableCell>
            <TableCell component="th" scope="row">
                {renderDriverInfo(data.instructor)}
            </TableCell>
            <TableCell component="th" scope="row">
                {renderStatusIcon(data.metadataStatus)}
            </TableCell>
            <TableCell component="th" scope="row">
                {renderProgress(data.driverDriveCount)}
            </TableCell>
            <TableCell component="th" scope="row">
                {renderBitrate(data.bitRateKbps)}
            </TableCell>
        </TableRow>
    )
}

export default DriveListItem