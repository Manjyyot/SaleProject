# Ultimate Sales Project

## API Documentation

### Overview
This project provides a comprehensive backend solution for managing lead profiles and processing their outcomes using OpenAI's GPT assistant. It includes CRUD operations for both lead profiles and their processed outcomes.

### Project Structure
- **Models**
  - `leadsProfile.model.js`: Schema for lead profiles.
  - `leadsOutcome.model.js`: Schema for processed lead outcomes.
- **Controllers**
  - `leadsProfile.controller.js`: Handles operations related to lead profiles.
  - `leadsOutcome.controller.js`: Handles operations related to processing lead outcomes.
- **Routes**
  - `leadsProfile.route.js`: Routes for lead profile APIs.
  - `leadsOutcome.route.js`: Routes for lead outcome APIs.
- **Utils**
  - `chatGPT.js`: Utility for communication with OpenAI's GPT API.

### API Endpoints

#### Lead Profile APIs
1. **Get All Lead Profiles**
   - **Endpoint**: `GET /api/leads`
   - **Description**: Fetches all lead profiles.
   - **Sample Request**:
     ```bash
     curl -X GET http://localhost:3003/api/leads
     ```

2. **Get Lead Profile by ID**
   - **Endpoint**: `GET /api/leads/:id`
   - **Description**: Fetches a lead profile by its ID.
   - **Sample Request**:
     ```bash
     curl -X GET http://localhost:3003/api/leads/64e7a1f8d9b3c8a1b2345678
     ```

3. **Add a New Lead Profile**
   - **Endpoint**: `POST /api/leads/add`
   - **Description**: Adds a new lead profile.
   - **Sample Request**:
     ```bash
     curl -X POST http://localhost:3003/api/leads/add \
     -H "Content-Type: application/json" \
     -d '{
       "name": "John Doe",
       "email": "john.doe@example.com",
       "phoneNo": "1234567890",
       "expInYears": 5,
       "currentSkill": "Java, Spring Boot",
       "currentCTC": "1200000",
       "currentCompany": "Tech Corp",
       "currentJobRole": "Software Engineer",
       "targetRole": "DevOps Engineer"
     }'
     ```

4. **Edit Lead Profile by ID**
   - **Endpoint**: `PUT /api/leads/edit/:id`
   - **Description**: Updates a lead profile by its ID.
   - **Sample Request**:
     ```bash
     curl -X PUT http://localhost:3003/api/leads/edit/64e7a1f8d9b3c8a1b2345678 \
     -H "Content-Type: application/json" \
     -d '{
       "currentSkill": "Java, Spring Boot, Docker"
     }'
     ```

5. **Delete Lead Profile by ID**
   - **Endpoint**: `DELETE /api/leads/delete/:id`
   - **Description**: Deletes a lead profile by its ID.
   - **Sample Request**:
     ```bash
     curl -X DELETE http://localhost:3003/api/leads/delete/64e7a1f8d9b3c8a1b2345678
     ```

#### Lead Outcome APIs
1. **Process Lead Outcome**
   - **Endpoint**: `GET /api/outcomes/process`
   - **Description**: Fetches user details from `LeadProfileModel`, sends them to GPT for processing, and stores the output in `LeadOutcomeModel`.
   - **Query Parameters**:
     - `email`, `phoneNo`, or `id`
   - **Sample Request**:
     ```bash
     curl -X GET "http://localhost:3003/api/outcomes/process?email=john.doe@example.com"
     ```

2. **Get Lead Outcome by ID**
   - **Endpoint**: `GET /api/outcomes/:id`
   - **Description**: Fetches a lead outcome by its ID.
   - **Sample Request**:
     ```bash
     curl -X GET http://localhost:3003/api/outcomes/64e7a2f1e4b7c8f2d1234567
     ```

3. **Get Lead Outcome by Email or Phone**
   - **Endpoint**: `GET /api/outcomes/search`
   - **Description**: Fetches a lead outcome based on the provided email or phone number.
   - **Sample Request**:
     ```bash
     curl -X GET "http://localhost:3003/api/outcomes/search?email=john.doe@example.com"
     ```

4. **Update Lead Outcome by ID**
   - **Endpoint**: `PUT /api/outcomes/update/:id`
   - **Description**: Updates a lead outcome by its ID.
   - **Sample Request**:
     ```bash
     curl -X PUT http://localhost:3003/api/outcomes/update/64e7a2f1e4b7c8f2d1234567 \
     -H "Content-Type: application/json" \
     -d '{
       "expectedCTCRange": "1500000-1800000"
     }'
     ```

5. **Delete Lead Outcome by ID**
   - **Endpoint**: `DELETE /api/outcomes/delete/:id`
   - **Description**: Deletes a lead outcome by its ID.
   - **Sample Request**:
     ```bash
     curl -X DELETE http://localhost:3003/api/outcomes/delete/64e7a2f1e4b7c8f2d1234567
     ```

### Environment Variables
Ensure the following environment variables are set in your `.env` file:
```bash
OPENAI_API_KEY=your_openai_api_key
MONGO_URI=your_mongodb_connection_string
PORT=3003
```

### Running the Application
1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start the server**:
   ```bash
   node backend/careerPath/index.js
   ```

### Notes
- Replace placeholder values in the sample requests with actual data as needed.
- Ensure your MongoDB instance is running and accessible.
- Make sure the OpenAI API key has appropriate permissions for the GPT assistant service.

