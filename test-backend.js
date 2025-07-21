/* Testing Template :- Priyanshu Yadav */
/* Date :- 05/07/2025 */
/* Time :- 2:00 AM */
/* Location :- India */
/* OM NAMO NARAYANA */


/*This file is used to test the backend API*/

const fs = require('fs');
const path = require('path');

// Test the backend server
async function testBackend() {
  try {
    // Test 1: Check if server is running
    console.log('Testing backend server...');
    
    const response = await fetch('http://localhost:5000/');
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend server is running:', data.message);
    } else {
      console.log('❌ Backend server is not responding');
      return;
    }

    // Test 2: Test file upload with test.sol
    console.log('\nTesting file upload...');
    
    const testFile = path.join(__dirname, 'test.sol');
    if (!fs.existsSync(testFile)) {
      console.log('❌ test.sol file not found');
      return;
    }

    const formData = new FormData();
    const fileBuffer = fs.readFileSync(testFile);
    const blob = new Blob([fileBuffer], { type: 'text/plain' });
    formData.append('file', blob, 'test.sol');

    const uploadResponse = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    });

    if (uploadResponse.ok) {
      const result = await uploadResponse.json();
      console.log('✅ File upload successful:', result);
    } else {
      const error = await uploadResponse.json();
      console.log('❌ File upload failed:', error);
    }

  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

// Run the test
testBackend(); 