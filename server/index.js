const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PUBLIC_DIRECTORY = path.join(__dirname, "../public");
const PORT = 8000;

const server = (req, res) => {
    let filePath = url.parse(req.url).pathname;
    
    if (filePath === "/") {
        filePath = "/index.html";
    } else if (filePath === '/cars') {
        filePath = '/cars.html';
    }

    const absolutePath = path.join(PUBLIC_DIRECTORY, filePath);
    const extension = path.extname(filePath);

    const contentTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".png": "image/png",
        ".svg": "image/svg+xml"
    };

    fs.readFile(absolutePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentTypes[extension] || 'text/plain' });
            res.end(data);
        }
    });
};

http.createServer(server).listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});