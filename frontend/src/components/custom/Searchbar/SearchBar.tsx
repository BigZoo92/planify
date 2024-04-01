import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

const SearchBar: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearch = () => {
        console.log(searchValue);
    };

    return (
        <Box className="searchbar">
            <TextField
                id="search"
                label="Search"
                variant="outlined"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
                variant="contained"
                onClick={handleSearch}
                startIcon={<SearchIcon />}
            >
                Search
            </Button>
        </Box>
    );
};

export default SearchBar;