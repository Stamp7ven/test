# Use a specific Node.js base image with a compatible version
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies with specific flags
RUN yarn install --network-timeout 1000000 --ignore-platform

# Copy the rest of the React project
COPY . .

# Build the React app for production
RUN yarn build

# Expose the port (React development server or production build)
EXPOSE 3000

# Start command (React production app)
CMD ["yarn", "start"]
