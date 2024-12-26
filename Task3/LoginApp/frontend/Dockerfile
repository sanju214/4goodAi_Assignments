# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Install @expo/ngrok globally to avoid interactive prompts
RUN npm install -g @expo/ngrok

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copy the rest of the application code to the container
COPY . .

# Expose the port for the frontend (e.g., 19000 for Expo)
EXPOSE 19000

# Start the Expo development server
CMD ["npx", "expo", "start", "--tunnel"]
