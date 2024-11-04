import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import '../styles/SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <Container maxWidth="md" className="search-bar-container">
      <TextField
        label="Search by Email"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        className="search-bar-button"
      >
        Search
      </Button>
    </Container>
  );
}

export default SearchBar;