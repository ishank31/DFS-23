# Frontend

# Run using docker
First ensure that you have docker installed on your machine. Then follow the steps below to run the application using docker.
Open a terminal and navigate to `./frontend` directory.

 -  To build the image run
    ```bash
    docker build --no-cache -t react-vite-app .
    ```
- Run the container using
    ```bash
    docker run -d -p 3000:3000 react-vite-app
    ```