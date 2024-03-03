import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { ReactComponent as CheckmarkIcon } from '@/assets/icons/checkmark-icon.svg';
import { ReactComponent as RightArrowIcon } from '@/assets/icons/right-arrow-icon.svg';
import { ReactComponent as WarningIcon } from '@/assets/icons/warning-icon.svg';
import { ReactComponent as CopyIcon } from '@/assets/icons/copy-icon.svg';
import { createSticky, stickyStyles } from '../DriveList/DriveList';
import Progress from '../Progress';
import theme from '@/themes/YaakTheme';
import { DriveData } from '@/store/store'

const StyledTypography = styled(Typography)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 150px; 
`;

const StyledImage = styled('img')(({ theme }) => ({
    width: 24,
    height: 24,
    marginRight: 8,
    borderRadius: '50%',
    objectFit: 'cover',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.common.white
}));


  
// Use React memo to prevent unnecessary rerenders
const DriveListItem: React.FC<DriveData> = React.memo(({ data = {}}) => {

    const formatDateString = (dateString: string) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    }

    const renderDriverInfo = (driver: any) => {
        if (!driver) {
          return <span>—</span>;
        }
      
        return (
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
            {driver.profileImageURL && (
              <StyledImage src={driver.profileImageURL} alt={`${driver.firstname} ${driver.lastname}`} loading="lazy" />
            )}
            <StyledTypography variant='body1' color="textSecondary">
              {driver.firstname ? driver.firstname : "—"}
              &nbsp;
              {driver.lastname ? driver.lastname : "—"}
            </StyledTypography>
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
            return null; 
        }
    };

    const renderProgress = (progress: number) => {
        const percentage = (progress / 200 * 100).toFixed(0);

        if (progress > 200) {
            return <SvgIcon component={CheckmarkIcon} sx={{ width: 16, height: 16 }} viewBox="0 0 16 16" />;
        } else {
            return (
                <Tooltip title={`${percentage}%`}>
                    <Box>
                        <Progress percentage={parseInt(percentage)} strokeWidth={16} />
                    </Box>
                </Tooltip>
            );
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

        return (
            <Tooltip title={`${bitrate}Kbps`}>
                <Chip label={text} sx={styles} />
            </Tooltip>     
        ); 
    }

    const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(data.id);
        } catch (err) {
          console.error('Failed to copy text to clipboard', err);
        }
    };
    


    return (
        <TableRow
            key={data.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <StyledTableCell component="th" scope="row">
                <StyledTypography variant='body1' sx={{ fontWeight: '500'}}>
                    {data.startTimestamp ? formatDateString(data.startTimestamp) : "\u2014"}
                </StyledTypography>
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
                <StyledTypography variant='body1' color="textSecondary">
                    {data.partner?.name ? data.partner.name : "\u2014"}
                </StyledTypography>
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
                <StyledTypography variant='body1' color="textSecondary">
                    Student
                </StyledTypography>
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
                <StyledTypography variant='body1' color="textSecondary">
                    {data.licensePlate ? data.licensePlate : "\u2014"}
                </StyledTypography>
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
                <StyledTypography variant='body1' color="textSecondary">
                    {data.dongleId ? data.dongleId : "\u2014"}
                </StyledTypography>
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
                {renderDriverInfo(data.driver)}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
                {renderDriverInfo(data.instructor)}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row" sx={createSticky(stickyStyles.stickyStylesStatus)}>
                {renderStatusIcon(data.metadataStatus)}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row" sx={createSticky(stickyStyles.stickyStylesData)}>
                {renderProgress(data.driverDriveCount)}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row" sx={createSticky(stickyStyles.stickyStylesBitrate)}>
                {renderBitrate(data.bitRateKbps)}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row" sx={createSticky(stickyStyles.stickyStylesClipboard)}>
                <IconButton 
                    onClick={handleCopy}
                    sx={{
                        height: '40px',
                        width: '40px'
                    }}
                    >
                        <SvgIcon
                            component={CopyIcon}
                            sx={{ width: 14, height: 16 }}
                            viewBox="0 0 14 16"
                        />
                </IconButton>
            </StyledTableCell>
        </TableRow>
    )
})

export default DriveListItem