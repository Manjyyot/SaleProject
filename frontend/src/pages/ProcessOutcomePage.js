import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import { getLeadOutcomeById } from '../api/api';
import '../styles/ProcessOutcome.css';

function ProcessOutcomePage() {
  const { id } = useParams();
  const [outcome, setOutcome] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutcome = async () => {
      try {
        const response = await getLeadOutcomeById(id);
        setOutcome(response);
      } catch (error) {
        console.log('Error fetching lead outcome. Retry again.');
      } finally {
        setLoading(false);
      }
    };
    fetchOutcome();
  }, [id]);

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="md" className="process-outcome-container">
      {outcome ? (
        <>
          <Typography variant="h4" className="outcome-heading">Lead Outcome</Typography>
          <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">Email:</Typography>
            <Typography className="outcome-value">{outcome.email}</Typography>
          </Box>
          <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">Target Role:</Typography>
            <Typography className="outcome-value">{outcome.targetRole}</Typography>
          </Box>
          <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">KRA/KPI:</Typography>
            <Typography className="outcome-value">{outcome.KRA_KPI}</Typography>
          </Box>
          <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">Skills Required to Develop:</Typography>
            <Typography className="outcome-value">{outcome.skillsReqToBeDeveloped.join(', ')}</Typography>
          </Box>
          <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">Transferrable Skills:</Typography>
            <Typography className="outcome-value">{outcome.transferrableSkills.join(', ')}</Typography>
          </Box>
          <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">Expected CTC Range:</Typography>
            <Typography className="outcome-value">{outcome.expectedCTCRange}</Typography>
          </Box>
          <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">Potential Companies:</Typography>
            <Typography className="outcome-value">{outcome.potentialCompanies.join(', ')}</Typography>
          </Box>
          <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">Recommended Program:</Typography>
            <Typography className="outcome-value">{outcome.whichCourseFromGivenBrochureList}</Typography>
          </Box>
          <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">Program Benefits:</Typography>
            <Typography className="outcome-value">{outcome.howCourseIsGoingToHelpInAchievingTarget}</Typography>
          </Box>
          <Box className="outcome-section">
            <Typography variant="h6" className="outcome-label">Sales Pitch:</Typography>
            <Typography className="outcome-value">{outcome.salesPitchInDetails}</Typography>
          </Box>
        </>
      ) : (
        <Typography variant="h6">Outcome not found</Typography>
      )}
    </Container>
  );
}

export default ProcessOutcomePage;