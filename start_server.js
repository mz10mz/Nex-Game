#!/usr/bin/env node
/**
 * NexGame Casino - Local Development Server
 * Node.js HTTP server for running the casino game locally
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration
const PORT = 8000;
const HOST = 'localhost';

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

// Find free port
function findFreePort(startPort = PORT, maxPort = 8100) {
    return new Promise((resolve, reject) => {
        const server = http.createServer();
        
        server.listen(startPort, HOST, () => {
            const port = server.address().port;
            server.close(() => resolve(port));
        });
        
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                if (startPort < maxPort) {
                    findFreePort(startPort + 1, maxPort).then(resolve).catch(reject);
                } else {
                    reject(new Error(`No free ports available in range ${PORT}-${maxPort}`));
                }
            } else {
                reject(err);
            }
        });
    });
}

// Get MIME type
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return mimeTypes[ext] || 'application/octet-stream';
}

// Serve file
function serveFile(filePath, res) {
    const mimeType = getMimeType(filePath);
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }
        
        res.writeHead(200, { 
            'Content-Type': mimeType,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end(data);
    });
}

// Handle request
function handleRequest(req, res) {
    let filePath = '.' + req.url;
    
    // Default to index.html for root
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // Try index.html for directory requests
            if (filePath.endsWith('/')) {
                filePath += 'index.html';
                fs.access(filePath, fs.constants.F_OK, (err2) => {
                    if (err2) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('File not found');
                    } else {
                        serveFile(filePath, res);
                    }
                });
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            }
        } else {
            serveFile(filePath, res);
        }
    });
}

// Open browser
function openBrowser(url) {
    const start = process.platform === 'darwin' ? 'open' :
                  process.platform === 'win32' ? 'start' : 'xdg-open';
    
    exec(`${start} ${url}`, (error) => {
        if (error) {
            console.log(`⚠️  Could not open browser automatically: ${error.message}`);
            console.log(`   Please open ${url} manually`);
        }
    });
}

// Main function
async function main() {
    console.log('🎰 NexGame Casino - Development Server');
    console.log('=' .repeat(40));
    
    // Check if index.html exists
    if (!fs.existsSync('index.html')) {
        console.log('❌ Error: index.html not found!');
        console.log('   Make sure you\'re running this script from the game directory.');
        process.exit(1);
    }
    
    try {
        // Find free port
        const port = await findFreePort();
        
        // Create server
        const server = http.createServer(handleRequest);
        
        // Start server
        server.listen(port, HOST, () => {
            console.log(`🚀 Server started successfully!`);
            console.log(`📍 URL: http://${HOST}:${port}`);
            console.log(`📁 Serving files from: ${process.cwd()}`);
            console.log();
            console.log('🎮 Game Controls:');
            console.log('   Space/Enter: Spin');
            console.log('   A: Auto Spin');
            console.log('   +/-: Change Bet');
            console.log('   Escape: Close Win Modal');
            console.log();
            console.log('⚙️  Admin Panel:');
            console.log('   Click the gear icon (⚙️) to access admin controls');
            console.log();
            console.log('🛑 Press Ctrl+C to stop the server');
            console.log('=' .repeat(40));
            
            // Open browser
            openBrowser(`http://${HOST}:${port}`);
            console.log();
        });
        
        // Handle server errors
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log(`❌ Error: Port ${port} is already in use`);
                console.log('   Try running the script again or use a different port');
            } else {
                console.log(`❌ Error starting server: ${err.message}`);
            }
            process.exit(1);
        });
        
        // Handle graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n🛑 Server stopped by user');
            server.close(() => {
                process.exit(0);
            });
        });
        
    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { main, findFreePort, handleRequest };
