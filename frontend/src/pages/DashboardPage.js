import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import SearchBar from '../components/SearchBar';
import { getLeadProfileByEmailOrPhone } from '../api/api';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    try {
      const response = await getLeadProfileByEmailOrPhone({ email: query });
      setResults([response]);
    } catch (error) {
      alert('Error searching for lead outcome');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        
      </Typography>
      <SearchBar onSearch={handleSearch} />
      <List>
        {results.map((result, index) => (
          <ListItem key={index} divider>
            <ListItemText primary={`Email: ${result.email}`} secondary={`Target Role: ${result.targetRole}`} />
            <Button variant="contained" onClick={() => navigate(`/lead-profile/${result._id}`)}>
              View Profile
            </Button>
          </ListItem>
        ))}
      </List>
      {/* <Button variant="contained" color="secondary" onClick={() => navigate('/add-lead')} style={{ marginTop: '20px' }}>
        Add Lead Profile
      </Button> */}
    </Container>
  );
}

export default DashboardPage;