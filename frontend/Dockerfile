FROM node:16.13

WORKDIR /usr/src/app

COPY package*.json .

RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn run build
