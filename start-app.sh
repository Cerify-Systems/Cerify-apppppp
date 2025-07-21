#!/bin/bash

# Cerify App Startup Script
# Compatible with Linux, CentOS, Ubuntu, macOS, and Windows (Git Bash/WSL)

echo "🚀 Starting Cerify App..."
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if a port is in use
port_in_use() {
    lsof -i :$1 >/dev/null 2>&1
}

# Check if Node.js is installed
if ! command_exists node; then
    echo " Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command_exists npm; then
    echo " npm is not installed. Please install npm first."
    exit 1
fi

echo " Node.js and npm are available"
echo ""

# Check if ports are available
if port_in_use 5000; then
    echo "  Port 5000 is already in use. Backend may not start properly."
fi

if port_in_use 3000; then
    echo "  Port 3000 is already in use. Frontend may not start properly."
fi

echo ""

# Start Backend Server
echo "🔧 Starting Backend Server..."
cd Backend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo " Installing backend dependencies..."
    npm install
fi

# Make run.sh executable
if [ -f "run.sh" ]; then
    chmod +x run.sh
    echo " Made run.sh executable"
fi

# Start backend in background
echo " Starting backend server on http://localhost:5000"
npm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Check if backend started successfully
if ! port_in_use 5000; then
    echo " Backend failed to start. Check the logs above."
    exit 1
fi

echo " Backend server is running (PID: $BACKEND_PID)"
echo ""

# Start Frontend Server
echo "🎨 Starting Frontend Server..."
cd ../Frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo " Installing frontend dependencies..."
    npm install
fi

# Start frontend in background
echo " Starting frontend server on http://localhost:3000"
npm start &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 5

# Check if frontend started successfully
if ! port_in_use 3000; then
    echo " Frontend failed to start. Check the logs above."
    exit 1
fi

echo " Frontend server is running (PID: $FRONTEND_PID)"
echo ""

echo " Both servers are running successfully!"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
echo ""
echo " To stop the servers, press Ctrl+C"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo " Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo " Servers stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Keep the script running
wait 