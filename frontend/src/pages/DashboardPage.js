import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Card, CardContent } from '@mui/material';
import SearchBar from '../components/SearchBar';
import { getLeadProfileByEmailOrPhone, getTotalLeadOutcomes } from '../api/api';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getTotalLeadOutcomes();
        setCount(res.data);
      } catch (error) {
        alert('Error fetching total lead outcomes');
      }
    }
    fetchData();
  }, []);

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
      {/* <Typography variant="h4" component="h1" gutterBottom>
      </Typography> */}
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
      <br />
      <br />
      <Card style={{ maxWidth: 300, margin: '0 auto', marginTop: '20px', textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Total Suggested Leads
          </Typography>
          <Typography variant="h4" color="textSecondary">
            {count}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default DashboardPage;
