FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Rebuild bcrypt specifically for the container's environment
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
