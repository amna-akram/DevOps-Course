# Use Python base image
FROM python:3

# Install the required system utilities needed to get container info
RUN apt-get update && apt-get install -y procps coreutils

# Set working directory
WORKDIR /app

# Install Flask
RUN pip install Flask

# Copy the files into the container
COPY . .

# Expose the port
EXPOSE 8200

# Start the Flask application
CMD ["python", "service2.py"]
