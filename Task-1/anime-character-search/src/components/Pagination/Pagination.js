import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const Pagination = ({ page, setPage, totalResults }) => {
    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ marginTop: '20px' }}>
            <Button onClick={handlePreviousPage} disabled={page === 1} variant="outlined">
                Previous
            </Button>
            <Typography>Page {page}</Typography>
            <Button onClick={handleNextPage} disabled={page * 15 >= totalResults} variant="outlined">
                Next
            </Button>
        </Stack>
    );
};

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    totalResults: PropTypes.number.isRequired
};

export default Pagination;
