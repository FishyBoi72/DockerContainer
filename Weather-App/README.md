Using Docker

Building the Docker Image

Build the Docker image:
docker build -t weatherapp .

Run the Docker container:
docker run -p 3000:3000 weatherapp

Open your browser and go to http://localhost:3000.