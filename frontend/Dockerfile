# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire frontend directory to the working directory
COPY . .

# Build the React application
RUN npm run build

# Expose the port on which the React application will run
EXPOSE 3000

# Define the command to start the React application
CMD ["npm", "start"]
