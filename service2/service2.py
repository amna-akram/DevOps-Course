import subprocess
from flask import Flask, jsonify

app = Flask(__name__)

def getContainerInfo():
    ip = subprocess.getoutput("hostname -I").strip()
    running_processes = subprocess.getoutput("ps -ax").strip()
    available_disk_space = subprocess.getoutput("df").strip()
    time_since_last_boot = subprocess.getoutput("uptime").strip()

    return {
        "ip": ip,
        "running_processes": running_processes,
        "available_disk_space": available_disk_space,
        "time_since_last_boot": time_since_last_boot
    }

@app.route('/', methods=['GET'])
def getServiceInfo():
    container_info = getContainerInfo()
    return jsonify(container_info)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8200)
