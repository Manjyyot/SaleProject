import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/logo.svg';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar className="header-toolbar">
        <img src={logo} alt="Logo" className="header-logo" />
        <Typography variant="h6" className="header-title">
          Skill-Match
        </Typography>
        <div className="header-links">
          <Button color="inherit" component={Link} to="/">Dashboard</Button>
          <Button color="inherit" component={Link} to="/add-lead">Add Lead</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
