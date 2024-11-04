import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, CircularProgress } from '@mui/material';
import { getLeadProfileById, processLeadOutcome } from '../api/api';
import '../styles/LeadDetails.css';

function LeadDetails() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getLeadProfileById(id);
        setProfile(response);
      } catch (error) {
        alert('Error fetching lead profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const handleGenerateOutcome = async () => {
    try {
      await processLeadOutcome({ id });
      alert('Lead outcome generated successfully!');
      navigate(`/process-outcome/${id}`);
    } catch (error) {
      alert('Error generating lead outcome');
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="md" className="lead-details-container">
      {profile ? (
        <>
          <Typography variant="h5">{profile.name}</Typography>
          <Typography>Email: {profile.email}</Typography>
          <Typography>Phone: {profile.phoneNo}</Typography>
          <Typography>Current Job Role: {profile.currentJobRole}</Typography>
          <Typography>Target Role: {profile.targetRole}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateOutcome}
            className="generate-button"
          >
            Generate Outcome
          </Button>
        </>
      ) : (
        <Typography variant="h6">Profile not found</Typography>
      )}
    </Container>
  );
}

export default LeadDetails;