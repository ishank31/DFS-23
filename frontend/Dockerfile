# Use an official Node runtime as a parent image
FROM node:20.5.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if you're using yarn)
COPY package-lock.json ./
COPY package.json ./

# Install any dependencies
RUN npm install  --legacy-peer-deps

# Or if you are using yarn, comment out the above RUN command and uncomment the below
# RUN yarn install --frozen-lockfile

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the app for production to the build folder (or whatever your build script is)
RUN npm run build

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "run", "start"]

