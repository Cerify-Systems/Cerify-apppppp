# Cerify App - Solidity Contract Analysis

A web application for analyzing Solidity smart contracts for security vulnerabilities and providing detailed reports.


## Important Note: Test Repository

This is a test repository designed for frontend development and testing purposes. The actual Cerify application requires the SKLEE engine and runs on the Cerify Cloud Infrastructure. This version:

- Uses a simplified backend with shell scripts to process .sol files
- Returns predetermined test responses instead of actual SKLEE analysis
- Allows local testing without cloud dependencies
- Simulates the full application flow without the actual analysis engine

To work with the actual Cerify application with full analysis capabilities, please refer to the main repository. This repository is specifically for:
- Testing frontend changes
- Development of new UI features
- Local development without cloud dependencies



## Features

- **File Upload**: Upload .sol and .txt files for analysis
- **URL Analysis**: Analyze contracts from URLs
- **Security Analysis**: Detect common Solidity vulnerabilities
- **Detailed Reports**: Get comprehensive analysis reports with scores
- **User Authentication**: Firebase-based user management
- **Progress Tracking**: Real-time upload and analysis progress

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git Bash or similar terminal

## Installation & Setup

### Option 1: Quick Start (Windows)
1. Double-click `start-app.bat` to automatically start both servers
2. Wait for both servers to start
3. Open http://localhost:3000 in your browser

### Option 2: Manual Setup

#### Backend Setup
```bash
cd Backend
npm install
npm start
```

#### Frontend Setup
```bash
cd Frontend
npm install
npm start
```

## Usage

1. **Home Page**: Upload a Solidity contract file (.sol) or paste a contract URL
2. **Analysis**: The system will analyze the contract for security vulnerabilities
3. **Progress**: Watch the real-time progress of the analysis
4. **Results**: View detailed analysis results with security scores
5. **Download**: Download the analysis report as a text file

## API Endpoints

### Backend (http://localhost:5000)

- `GET /` - Health check
- `POST /upload` - Upload and analyze a contract file
- `POST /analyze-url` - Analyze a contract from URL

### Request Format for File Upload
```javascript
const formData = new FormData();
formData.append('file', fileObject);

fetch('http://localhost:5000/upload', {
  method: 'POST',
  body: formData
});
```

### Response Format
```json
{
  "success": true,
  "result": {
    "score": 8,
    "total": 10,
    "vulnerabilities": 2,
    "issues": 5,
    "lines": 150,
    "status": "completed"
  },
  "message": "Contract analyzed successfully"
}
```

## Security Analysis

The system checks for common Solidity vulnerabilities:

- **Reentrancy Attacks**: Detects unsafe external calls
- **Access Control**: Identifies missing access modifiers
- **Arithmetic Issues**: Checks for overflow/underflow risks
- **Blockchain Variables**: Warns about timestamp and block number usage
- **Dangerous Functions**: Flags selfdestruct and low-level calls

## File Structure

```
Cerify-app/
├── Backend/
│   ├── server.js          # Main backend server
│   ├── package.json       # Backend dependencies
│   └── uploads/           # Temporary file storage
├── Frontend/
│   ├── src/
│   │   ├── Routes/
│   │   │   ├── Home.jsx           # Main upload page
│   │   │   └── Pages/
│   │   │       ├── AddFile.jsx    # File upload component
│   │   │       ├── Upload.jsx     # Progress tracking
│   │   │       └── Score.jsx      # Results display
│   │   └── App.js         # Main app component
│   └── package.json       # Frontend dependencies
├── test.sol              # Sample contract for testing
└── start-app.bat         # Windows startup script
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Backend: Change PORT in `Backend/server.js`
   - Frontend: React will automatically suggest an alternative port

2. **CORS Errors**
   - Ensure backend is running on http://localhost:5000
   - Check that CORS middleware is properly configured

3. **File Upload Fails**
   - Verify file is .sol or .txt format
   - Check file size is under 5MB
   - Ensure backend server is running

4. **Analysis Not Working**
   - Check backend console for errors
   - Verify the uploads directory exists
   - Ensure proper file permissions

### Backend Logs
Check the backend console for detailed error messages and analysis progress.

### Frontend Logs
Open browser developer tools (F12) to see frontend errors and network requests.

## Development

### Adding New Vulnerability Checks

Edit `Backend/server.js` in the `analyzeSolidityContract` function:

```javascript
// Add new vulnerability check
if (contractContent.includes('dangerous_pattern')) {
  vulnerabilities++;
  issues++;
}
```

### Customizing Analysis

Modify the scoring algorithm in the backend:

```javascript
// Customize score calculation
let score = 10 - vulnerabilities;
if (score < 0) score = 0;
```

## Testing

Use the provided `test.sol` file to test the analysis functionality:

1. Upload the test contract
2. Verify analysis results
3. Check that vulnerabilities are detected

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the console logs
3. Ensure all dependencies are installed
4. Verify both servers are running # Cerify-Complete
