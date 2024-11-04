import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@mui/material';
import { getLeadOutcomeById } from '../api/api';
import '../styles/LeadOutcome.css';

function LeadOutcome() {
  const { id } = useParams();
  const [outcome, setOutcome] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutcome = async () => {
      try {
        const response = await getLeadOutcomeById(id);
        setOutcome(response);
      } catch (error) {
        alert('Error fetching lead outcome');
      } finally {
        setLoading(false);
      }
    };
    fetchOutcome();
  }, [id]);

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="md" className="lead-outcome-container">
      {outcome ? (
        <>
          <Typography variant="h5">Lead Outcome for {outcome.email}</Typography>
          <Typography>Target Role: {outcome.targetRole}</Typography>
          <Typography>KRA/KPI: {outcome.KRA_KPI}</Typography>
          <Typography>Transferrable Skills: {outcome.transferrableSkills.join(', ')}</Typography>
          <Typography>Skills to Develop: {outcome.skillsReqToBeDeveloped.join(', ')}</Typography>
          <Typography>Expected CTC Range: {outcome.expectedCTCRange}</Typography>
          <Typography>Potential Companies: {outcome.potentialCompanies.join(', ')}</Typography>
          <Typography>Recommended Course: {outcome.whichCourseFromGivenBrochureList}</Typography>
          <Typography>How Course Helps: {outcome.howCourseIsGoingToHelpInAchievingTarget}</Typography>
          <Typography>Sales Pitch: {outcome.salesPitchInDetails}</Typography>
        </>
      ) : (
        <Typography variant="h6">Outcome not found</Typography>
      )}
    </Container>
  );
}

export default LeadOutcome;