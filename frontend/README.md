# Frontend
# Build and run using source code

## Install dependencies
Go to `./frontend` directory and run the following commands

- Install dependencies using
    ```bash
    npm install --legacy-peer-deps
    ```
## Run the application
- Run the following command
    ```bash
    npm run dev
    ```
- Open the browser and navigate to `http://localhost:5173/Canvas`

# Run using docker
First ensure that you have docker installed and running on your machine. Then follow the steps below to run the application using docker.

Open a terminal and navigate to `./frontend` directory.

 -  To build the image run
    ```bash
    docker build --no-cache -t react-vite-app .
    ```
- Run the container using
    ```bash
    docker run -d -p 3000:3000 react-vite-app
    ```