# Election Monitoring & Analytics Platform

A powerful, AI-driven platform for collecting, organizing, and analyzing election-related data with a modern futuristic UI.

## Features

- **AI-Powered Insights**: Automated natural language summaries of election trends.
- **Predictive Analytics**: Forecasting seat distribution and voter turnout with confidence scores.
- **Sentiment Analysis**: Tracking public opinion through news and social media simulation.
- **Interactive Dashboards**: Real-time visualization using Recharts and Framer Motion.
- **Secure Monitoring**: Incident reporting and pattern anomaly detection.
- **Role-Based Access Control**: Separate interfaces for Public Users, Research Analysts, and Admins.

## Tech Stack

- **Frontend**: React.js, Vite, TailwindCSS, Framer Motion, Recharts, Lucide Icons.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT.
- **AI**: OpenAI API integration, NLP-based sentiment analysis.

## Setup Instructions

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: Secret for token signing.
   - `OPENAI_API_KEY`: Your OpenAI API key (optional, mock results will be used if not provided).
4. Start the server:
   ```bash
   node server.js
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## User Roles
- **Public User**: View dashboards and AI reports.
- **Research Analyst**: Upload datasets and run deep sentiment analysis.
- **Admin**: Full system management and API configuration.
