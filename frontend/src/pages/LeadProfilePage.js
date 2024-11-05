import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, CircularProgress, Box } from '@mui/material';
import { getLeadProfileById, getLeadOutcomeByEmailOrPhone, processLeadOutcome } from '../api/api';
import '../styles/ProcessOutcome.css';

function LeadProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndOutcome = async () => {
      try {
        const profileResponse = await getLeadProfileById(id);
        setProfile(profileResponse);

        if (profileResponse && profileResponse.email) {
          const outcomeResponse = await getLeadOutcomeByEmailOrPhone({ email: profileResponse.email });
          setOutcome(outcomeResponse);
        }
      } catch (error) {
        console.log('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchProfileAndOutcome();
  }, [id]);

  const handleGenerateOutcome = async () => {
    try {
    setLoading(true);
      await processLeadOutcome({ id });
      alert('Lead outcome generated successfully!');
      window.location.reload();
    } catch (error) {
      alert('Error generating lead outcome');
    } finally{
        setLoading(false)
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="md" className="process-outcome-container">
      {profile ? (
        <>
        <Typography variant="h4" className="outcome-heading">{profile.name}</Typography>
        <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">Email:</Typography>
            <Typography className="outcome-value">{profile.email}</Typography>
        </Box>

        <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">Phone:</Typography>
            <Typography className="outcome-value">{profile.phoneNo}</Typography>
          </Box>  

          <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">Experience:</Typography>
            <Typography className="outcome-value">{profile.expInYears}</Typography>
          </Box>  
          <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">Current Skills:</Typography>
            <Typography className="outcome-value">{profile.currentSkill}</Typography>
          </Box>  
          <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">Current Job Role:</Typography>
            <Typography className="outcome-value">{profile.currentJobRole}</Typography>
          </Box>  
          <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">Current CTC:</Typography>
            <Typography className="outcome-value">{profile.currentCTC}</Typography>
          </Box>  
          <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">Current Company:</Typography>
            <Typography className="outcome-value">{profile.currentCompany}</Typography>
          </Box>  
          <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">Target Role:</Typography>
            <Typography className="outcome-value">{profile.targetRole}</Typography>
          </Box>  
          
          

          {outcome ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(`/process-outcome/${outcome._id}`)}
            >
              View Outcome
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateOutcome}
            >
              Generate Outcome
            </Button>
          )}
        </>
      ) : (
        <Typography variant="h6">Profile not found</Typography>
      )}
    </Container>
  );
}

export default LeadProfilePage;
