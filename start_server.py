#!/usr/bin/env python3
"""
NexGame Casino - Local Development Server
Simple HTTP server for running the casino game locally
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configuration
PORT = 8000
HOST = 'localhost'

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler to serve files with proper MIME types"""
    
    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def guess_type(self, path):
        """Override to set correct MIME types"""
        result = super().guess_type(path)
        if isinstance(result, tuple):
            mimetype, encoding = result
        else:
            mimetype, encoding = result, None
        
        # Ensure proper MIME types for game assets
        if path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.html'):
            return 'text/html'
        elif path.endswith('.png'):
            return 'image/png'
        elif path.endswith('.jpg') or path.endswith('.jpeg'):
            return 'image/jpeg'
        elif path.endswith('.gif'):
            return 'image/gif'
        elif path.endswith('.svg'):
            return 'image/svg+xml'
        
        return mimetype

def find_free_port(start_port=8000, max_port=8100):
    """Find a free port starting from start_port"""
    for port in range(start_port, max_port):
        try:
            with socketserver.TCPServer((HOST, port), CustomHTTPRequestHandler) as server:
                return port
        except OSError:
            continue
    return None

def main():
    """Main function to start the server"""
    print("🎰 NexGame Casino - Development Server")
    print("=" * 40)
    
    # Check if index.html exists
    if not os.path.exists('index.html'):
        print("❌ Error: index.html not found!")
        print("   Make sure you're running this script from the game directory.")
        sys.exit(1)
    
    # Find a free port
    port = find_free_port(PORT)
    if port is None:
        print(f"❌ Error: No free ports available in range {PORT}-8100")
        sys.exit(1)
    
    # Start the server
    try:
        with socketserver.TCPServer((HOST, port), CustomHTTPRequestHandler) as httpd:
            print(f"🚀 Server started successfully!")
            print(f"📍 URL: http://{HOST}:{port}")
            print(f"📁 Serving files from: {os.getcwd()}")
            print()
            print("🎮 Game Controls:")
            print("   Space/Enter: Spin")
            print("   A: Auto Spin")
            print("   +/-: Change Bet")
            print("   Escape: Close Win Modal")
            print()
            print("⚙️  Admin Panel:")
            print("   Click the gear icon (⚙️) to access admin controls")
            print()
            print("🛑 Press Ctrl+C to stop the server")
            print("=" * 40)
            
            # Open browser automatically
            try:
                webbrowser.open(f'http://{HOST}:{port}')
                print("🌐 Opening game in browser...")
            except Exception as e:
                print(f"⚠️  Could not open browser automatically: {e}")
                print(f"   Please open http://{HOST}:{port} manually")
            
            print()
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Error: Port {port} is already in use")
            print("   Try running the script again or use a different port")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
