# Step 1: Define the base image with the required Node.js version
FROM node:23.7.0-slim

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json files to install dependencies
COPY package*.json ./

# Step 4: Install the project dependencies
RUN npm install

# Step 5: Copy the rest of the project files into the container
COPY . .

# Step 6: Expose the port on which the app will run
EXPOSE 8080

# Step 7: Define the start command to run the application
CMD ["npm", "run", "dev"]

