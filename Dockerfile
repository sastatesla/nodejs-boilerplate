FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env ./


EXPOSE 4012

ENV PORT=4012

CMD ["npm", "start"]