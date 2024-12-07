#!/bin/bash
cd home/ubuntu

DOCKER_USERNAME="username"

sudo apt update
sudo apt install docker.io -y

sudo service docker start
sudo systemctl enable docker

sudo usermod -aG docker ubuntu
newgrp docker

sudo docker pull ${DOCKER_USERNAME}/strapi-app
sudo docker run -d -p 1337:1337 --name cs360_backend_container \
          -e APP_KEYS=$(openssl rand -base64 32) \
          -e API_TOKEN_SALT=$(openssl rand -base64 32) \
          -e ADMIN_JWT_SECRET=$(openssl rand -base64 32) \
          -e TRANSFER_TOKEN_SALT=$(openssl rand -base64 32) \
          -e JWT_SECRET=$(openssl rand -base64 32) \
          ${DOCKER_USERNAME}/strapi-app:latest

sudo docker pull ${DOCKER_USERNAME}/react-appv2
sudo docker run -d -p 3000:3000 --name cs360_frontend_container ${DOCKER_USERNAME}/react-appv2:latest
