FROM node:14-slim

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]