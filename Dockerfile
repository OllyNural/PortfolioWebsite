FROM node:8-alpine

# Create app directory
WORKDIR /usr/app 

# install app dependencies
COPY node_modules ./node_modules
COPY src/ ./src
COPY build/ ./build
COPY config/ ./config
COPY server/ ./server
COPY package.json ./package.json
ENV NODE_PATH src/

EXPOSE 8080

# defined in package.json
CMD [ "npm", "run", "start:server"]