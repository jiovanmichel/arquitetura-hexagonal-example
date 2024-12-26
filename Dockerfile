# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=22.12.0

FROM node:${NODE_VERSION}

# Use production node environment by default.
ENV NODE_ENV development

# Set working directory
WORKDIR /usr/src/app

# Create npm cache directories and set permissions
RUN mkdir -p /home/node/.npm/_cacache/tmp && \
    mkdir -p /home/node/.npm/_cacache/content-v2 && \
    mkdir -p /home/node/.npm/_logs && \
    chown -R node:node /home/node/.npm && \
    chmod -R 775 /home/node/.npm && \
    chown -R node:node /usr/src/app && \
    chmod -R 775 /usr/src/app && \
    npm install -g npm@11.0.0

# change user to node
USER node

# Copy package.json, package-lock.json and tsconfig.json for use cache
COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node vitest.config.ts ./

# Install dependencies
RUN --mount=type=cache,target=/root/.npm \
    npm install


# Copy other files
COPY --chown=node:node ./adapters ./adapters 
COPY --chown=node:node ./core ./core

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["tail", "-f", "/dev/null"]
