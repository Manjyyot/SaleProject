import React from 'react';
import { Container, Typography } from '@mui/material';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <Container maxWidth="md">
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} HeroVired. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;