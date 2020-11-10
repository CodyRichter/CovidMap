FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# add app
COPY ./ ./

# start app
CMD ["npm", "run", "start"]