from http.server import HTTPServer, SimpleHTTPRequestHandler

class CustomHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        if self.path == "/payment-manifest.json":
            self.send_header(
                "Link",
                '</payment-manifest.json>; rel="payment-method-manifest"'
            )

        super().end_headers()

HTTPServer(("0.0.0.0", 8000), CustomHandler).serve_forever()