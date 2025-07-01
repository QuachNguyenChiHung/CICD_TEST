# 📅 Date Validator - SWT301 Project

A full-stack date validation application built with React frontend and Express.js backend. This application validates dates and handles edge cases like leap years, different month lengths, and invalid date combinations.

## 🚀 Features

- **Real-time Date Validation**: Instantly check if a date is valid
- **Comprehensive Error Handling**: Detailed error messages for invalid inputs
- **Leap Year Support**: Correctly handles leap years (e.g., Feb 29, 2024 vs Feb 29, 2023)
- **Month Length Validation**: Validates different month lengths (30/31 days)
- **Beautiful UI**: Modern, responsive design with smooth animations
- **REST API**: Clean backend API for date validation
- **Cross-platform**: Works on Windows, macOS, and Linux

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with gradients and animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

## 🔧 Installation & Setup

1. **Clone or download the project**
   ```bash
   cd SWT301-DateChecker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🚀 Running the Application

### Option 1: Run Frontend and Backend Separately

1. **Start the backend server** (in one terminal):
   ```bash
   npm run server
   ```
   The backend will run on `http://localhost:3001`

2. **Start the frontend** (in another terminal):
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Option 2: Development Mode with Auto-restart

For development with automatic server restart:
```bash
npm run server:dev
```

## 🧪 Testing the Application

### Valid Date Examples:
- **29/02/2024** - Valid (2024 is a leap year)
- **31/12/2023** - Valid (December has 31 days)
- **15/06/2023** - Valid (standard date)

### Invalid Date Examples:
- **29/02/2023** - Invalid (2023 is not a leap year)
- **31/04/2023** - Invalid (April has only 30 days)
- **32/01/2023** - Invalid (day out of range)
- **15/13/2023** - Invalid (month out of range)

## 📁 Project Structure

```
SWT301-DateChecker/
├── index.js              # Express backend server
├── package.json          # Dependencies and scripts
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── src/
│   ├── App.jsx           # Main React component
│   ├── App.css           # Application styles
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles
├── public/               # Static assets
└── README.md            # This file
```

## 🔌 API Documentation

### POST `/api/validate-date`

Validates a given date.

**Request Body:**
```json
{
  "day": 29,
  "month": 2,
  "year": 2024
}
```

**Response (Valid Date):**
```json
{
  "valid": true,
  "date": {
    "formatted": "Thu Feb 29 2024",
    "day": 29,
    "month": 2,
    "year": 2024,
    "monthName": "February"
  }
}
```

**Response (Invalid Date):**
```json
{
  "valid": false,
  "error": "The provided date does not exist"
}
```

## 🎯 Key Features Implemented

1. **Frontend (React)**:
   - Interactive form with day/month/year inputs
   - Real-time validation with loading states
   - Beautiful error and success messages
   - Responsive design for mobile devices
   - Example dates to help users

2. **Backend (Express)**:
   - RESTful API endpoint for date validation
   - Comprehensive input validation
   - Leap year calculation
   - Month length validation
   - Detailed error messages
   - CORS support for frontend communication

3. **Date Validation Logic**:
   - Handles leap years correctly
   - Validates month lengths (28/29/30/31 days)
   - Range checking for day (1-31), month (1-12), year (1-9999)
   - 2-digit year support (converts to 20XX)

## 🐛 Troubleshooting

### Backend Issues:
- **Port 3001 already in use**: Change the PORT in `index.js` or kill the process using that port
- **CORS errors**: Make sure the backend is running on port 3001

### Frontend Issues:
- **Cannot connect to server**: Ensure the backend is running on `http://localhost:3001`
- **Build errors**: Try deleting `node_modules` and running `npm install` again

## 📝 Development Notes

- The backend handles 2-digit years by adding 1900 (e.g., 24 becomes 1924)
- Date validation uses JavaScript's Date object to handle edge cases
- The frontend includes input validation before sending requests to the backend
- Error handling is implemented at both frontend and backend levels

## 👨‍💻 Author

SWT301 Date Checker Project

## 📄 License

ISC License
