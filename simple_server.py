#!/usr/bin/env python3
"""
Simple HTTP Server for NexGame Casino
Compatible with all Python versions
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configuration
PORT = 8000
HOST = '0.0.0.0'  # Allow external connections

def find_free_port(start_port=8000, max_port=8100):
    """Find a free port starting from start_port"""
    for port in range(start_port, max_port):
        try:
            with socketserver.TCPServer((HOST, port), http.server.SimpleHTTPRequestHandler) as server:
                return port
        except OSError:
            continue
    return None

def main():
    """Main function to start the server"""
    print("🎰 NexGame Casino - Simple Server")
    print("=" * 40)
    
    # Check if index.html exists
    if not os.path.exists('index.html'):
        print("❌ Error: index.html not found!")
        print("   Make sure you're running this script from the game directory.")
        sys.exit(1)
    
    try:
        # Find free port
        port = find_free_port()
        if port is None:
            print(f"❌ Error: No free ports available in range {PORT}-8100")
            sys.exit(1)
        
        # Create server
        with socketserver.TCPServer((HOST, port), http.server.SimpleHTTPRequestHandler) as httpd:
            print(f"🚀 Server started successfully!")
            print(f"📍 Local URL: http://localhost:{port}")
            print(f"📍 Network URL: http://{get_local_ip()}:{port}")
            print(f"📁 Serving files from: {os.getcwd()}")
            print()
            print("📱 For Mobile Access:")
            print(f"   1. Make sure your phone is on the same WiFi network")
            print(f"   2. Open: http://{get_local_ip()}:{port}")
            print(f"   3. Or scan QR code if available")
            print()
            print("🎮 Game Controls:")
            print("   Space/Enter: Spin")
            print("   A: Auto Spin")
            print("   +/-: Change Bet")
            print("   Escape: Close Win Modal")
            print()
            print("🛑 Press Ctrl+C to stop the server")
            print("=" * 40)
            
            # Open browser automatically
            try:
                webbrowser.open(f'http://localhost:{port}')
                print("🌐 Opening game in browser...")
            except Exception as e:
                print(f"⚠️  Could not open browser automatically: {e}")
                print(f"   Please open http://localhost:{port} manually")
            
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

def get_local_ip():
    """Get local IP address"""
    import socket
    try:
        # Connect to a remote server to get local IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "192.168.1.100"  # Default fallback

if __name__ == "__main__":
    main()
