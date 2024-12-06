# Use a specific Node.js base image with a compatible version
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install necessary build dependencies
RUN apk add --no-cache python3 make gcc g++ sqlite

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies with specific flags
RUN yarn install --network-timeout 1000000 --ignore-platform

# Copy the rest of the project
COPY . .

# Rebuild better-sqlite3 for the current platform
RUN npm rebuild better-sqlite3

# Build the project
RUN yarn build

# Expose the port
EXPOSE 1337

# Start command
CMD ["yarn", "start"]
