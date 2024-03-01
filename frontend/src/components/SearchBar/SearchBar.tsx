import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as SearchIcon } from '@/assets/icons/search-icon.svg';
import { useDriveStore } from '@/store/store';

const StyledSearchField = styled(TextField)(({ theme }) => ({
  width: '592px',
  height: '48px',
  '& .MuiInputBase-root': {
    height: '100%',
  },
  '& .MuiOutlinedInput-input': {
    height: '100%',
    padding: '0 14px',
  },
  [theme.breakpoints.down('lg')]: {
    width: '362px',
  }
}));

const Searchbar: React.FC = () => {
  const setSearchTerm = useDriveStore((state) => state.setSearchTerm);
  const searchTerm = useDriveStore((state) => state.searchTerm);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  return (
    <Box>
        <StyledSearchField
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search partners, drive types, vehicles, kit IDs, and drive IDs"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                      component={SearchIcon}
                      sx={{ width: 15, height: 15 }}
                      viewBox="0 0 15 15"
                  />
              </InputAdornment>
            ),
          }}
        />
    </Box>
  )
}

export default Searchbar