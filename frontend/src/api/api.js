// src/api/api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:3003/api';
// const BASE_URL = 'https://salesviredapi.prashantdey.in/api';

// Function to add a new lead profile
export const addLeadProfile = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/leads/add`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding lead profile:', error);
    throw error;
  }
};



// Function to get lead profile by ID
export const getLeadProfileById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/leads/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching lead profile:', error);
    throw error;
  }
};

export const getTotalLeadOutcomes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/outcomes/total`);
    return response.data;
  } catch (error) {
    console.error('Error fetching lead profile:', error);
    throw error;
  }
}

// Function to process lead outcome
export const processLeadOutcome = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/outcomes/process`, { params: query });
    return response.data;
  } catch (error) {
    console.error('Error processing lead outcome:', error);
    throw error;
  }
};

// Function to get lead outcome by ID
export const getLeadOutcomeById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/outcomes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching lead outcome:', error);
    throw error;
  }
};

// Function to get lead outcome by email or phone
export const getLeadOutcomeByEmailOrPhone = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/outcomes/search`, { params: query });
    return response.data;
  } catch (error) {
    console.error('Error searching lead outcome:', error);
    throw error;
  }
};

export const getLeadProfileByEmailOrPhone = async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/leads/search`, { params: query });
      return response.data;
    } catch (error) {
      console.error('Error searching lead outcome:', error);
      throw error;
    }
  };
  
