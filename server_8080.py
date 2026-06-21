import socket
import http.server
import socketserver

PORT = 8080

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def address_string(self):
        # Prevent reverse DNS lookup delays on Windows loopback
        return self.client_address[0]

class DualStackServer(socketserver.ThreadingTCPServer):
    address_family = socket.AF_INET6
    allow_reuse_address = True

    def server_bind(self):
        # Enable dual-stack IPv4/IPv6 wildcard binding
        try:
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        except Exception as e:
            print(f"Warning: Could not set IPV6_V6ONLY=0: {e}")
        super().server_bind()

# Start multi-threaded server on wildcard address
with DualStackServer(("", PORT), MyHandler) as httpd:
    print(f"Serving HTTP on port {PORT} (dual-stack IPv4/IPv6) with DNS bypass...")
    httpd.serve_forever()
