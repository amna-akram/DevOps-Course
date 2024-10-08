# Use Node.js base image
FROM node:21

# Set a working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the files into the container
COPY . .

# Expose the port
EXPOSE 8199

# Start the node application
CMD ["node", "service1.js"]
