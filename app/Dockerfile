FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# COPY package.json ./
# COPY package-lock.json ./

RUN npm install --prod
# If you are building your code for production
# RUN npm ci --only=production (https://blog.npmjs.org/post/171556855892/introducing-npm-ci-for-faster-more-reliable)
# RUN npm install --prod

# Bundle app source, don't use ADD
COPY . .

# Make port 3333 available to the world outside this container
# EXPOSE 3333

# Use node in CMD not npm like CMD ["npm", "start"] which is in package.json
# CMD ["node", "./bin/www"] it is used in express
CMD ["npm", "start"]
