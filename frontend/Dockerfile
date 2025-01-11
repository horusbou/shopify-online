# Base image for development
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Remove any existing package*.json and node_modules
RUN rm -rf package*.json node_modules

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose Vite's default development server port
EXPOSE 5173

# Run the Vite development server
CMD ["npm", "run", "preview"]
