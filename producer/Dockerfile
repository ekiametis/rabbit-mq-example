FROM node:12-alpine

WORKDIR /usr/src/app

COPY ./app.js /usr/src/app/app.js
COPY ./package.json /usr/src/app/package.json
COPY ./amqp /usr/src/app/amqp

RUN npm install

CMD [ "node", "/usr/src/app/app.js" ]