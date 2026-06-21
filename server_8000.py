import socket
import http.server
import socketserver

PORT = 8000
HOST = "127.0.0.1"

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def address_string(self):
        # Prevent reverse DNS lookup delays on Windows loopback
        return self.client_address[0]

class ThreadedHTTPServer(socketserver.ThreadingTCPServer):
    address_family = socket.AF_INET
    allow_reuse_address = True

if __name__ == "__main__":
    # Start multi-threaded server on 127.0.0.1:8000
    with ThreadedHTTPServer((HOST, PORT), MyHandler) as httpd:
        print(f"Serving HTTP on http://{HOST}:{PORT}/ with DNS bypass...")
        httpd.serve_forever()
