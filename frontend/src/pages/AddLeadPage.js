import React from 'react';
import { Container, Typography } from '@mui/material';
import LeadForm from '../components/LeadForm';

function AddLeadPage() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        
      </Typography>
      <LeadForm onSubmit={(formData) => alert('Lead profile submitted successfully!')} />
    </Container>
  );
}

export default AddLeadPage;