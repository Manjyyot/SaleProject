import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import { addLeadProfile } from '../api/api';
import '../styles/LeadForm.css';

function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    expInYears: '',
    currentSkill: '',
    currentCTC: '',
    currentCompany: '',
    currentJobRole: '',
    targetRole: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addLeadProfile(formData);
      alert('Lead profile added successfully!');
      navigate(`/lead-profile/${response.data._id}`);
    } catch (error) {
      alert('Error adding lead profile');
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="sm" className="lead-form-container">
      <Typography variant="h5" className="lead-form-title">Add Lead Profile</Typography>
      <form onSubmit={handleSubmit} className="lead-form">
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          required
        />
        <TextField
          label="Phone Number"
          name="phoneNo"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          required
        />
        <TextField
          label="Experience in Years"
          name="expInYears"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Current Skill"
          name="currentSkill"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Current CTC"
          name="currentCTC"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Current Company"
          name="currentCompany"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Current Job Role"
          name="currentJobRole"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          label="Target Role"
          name="targetRole"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleChange}
          required
        />
        <Button variant="contained" color="primary" type="submit" className="lead-form-button">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default LeadForm;