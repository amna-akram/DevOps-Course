import http from 'http';
import { execSync } from 'child_process';
import axios from 'axios';

function getContainerInfo() {
    // Using .toString to convert the returned buffer output to readable string format
    const ip = execSync('hostname -I').toString().trim();
    const running_processes = execSync('ps -ax').toString().trim();
    const available_disk_space = execSync('df').toString().trim();
    const time_since_last_boot = execSync('uptime').toString().trim();

    return {
        ip: ip,
        running_processes: running_processes,
        available_disk_space: available_disk_space,
        time_since_last_boot: time_since_last_boot
    };
}

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        const service_info = getContainerInfo();

        try {
            const service2_res = await axios.get('http://service2:8200');
            const service2_info = service2_res.data;
            const result = {
                Service: service_info,
                Service2: service2_info
            };

            res.writeHead(200);
            res.end(JSON.stringify(result, null, 2));

        } catch (error) {
            res.writeHead(500);
            res.end('Error retrieving Container data from Service2');
        }
    } else {
        res.writeHead(404);
        res.end('Endpoint Not Available');
    }
});

const PORT = 8199;
server.listen(PORT, () => {
    console.log(`Service1 running on http://localhost:${PORT}`);
});
