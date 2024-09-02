const http = require('http');
const https = require('https');

const PORT = 8080;

function getLatestStories(callback) {
    https.get('https://time.com', (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            const stories = [];
            const startMarker = '<h3 class="latest-stories__item-headline">';
            const endMarker = '</h3>';
            const linkMarker = '<a href="';

            let start = 0;
            while (stories.length < 6) {
                start = data.indexOf(startMarker, start);
                if (start === -1) {
                    break;
                }
                let end = data.indexOf(endMarker, start);

                let titleStart = data.indexOf('>', start) + 1;
                let titleEnd = data.indexOf('</a>', titleStart);
                let title = data.substring(titleStart, titleEnd).trim();

                let linkStart = data.lastIndexOf(linkMarker, titleStart) + linkMarker.length;
                let linkEnd = data.indexOf('"', linkStart);
                let link = data.substring(linkStart, linkEnd);
                let fullLink = 'https://time.com' + link;

                stories.push({
                    "title": title,
                    "link": fullLink
                });

                start = end;
            }

            callback(JSON.stringify(stories));
        });
    }).on('error', (err) => {
        console.error("Error fetching stories: " + err.message);
    });
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Handle root URL
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the Time Stories API. Visit /getTimeStories to get the latest stories.');
    } else if (req.method === 'GET' && req.url === '/getTimeStories') {
        getLatestStories((storiesJson) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(storiesJson);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
