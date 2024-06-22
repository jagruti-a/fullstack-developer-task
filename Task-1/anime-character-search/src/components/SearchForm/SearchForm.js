import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

const SearchForm = ({ query, setQuery, handleSearch }) => {
    return (
        <form onSubmit={handleSearch}>
            <Box display="flex" justifyContent="center"> {/* Center the component */}
                <Stack direction="row" spacing={2} alignItems="center" marginBottom={2}>
                    <Box width="400px" textAlign="center">
                        <TextField
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            variant="outlined"
                            size="medium"
                            InputProps={{
                                startAdornment: (
                                    <SearchIcon />
                                ),
                            }}
                            style={{ width: '400px'}} // Custom width and height

                        />
                    </Box>
                    <Button type="submit" variant="contained" color="primary">
                        Search
                    </Button>
                </Stack>
            </Box>
        </form>
    );
};

SearchForm.propTypes = {
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired
};

export default SearchForm;
