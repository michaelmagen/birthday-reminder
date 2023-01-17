FROM node:16

RUN npm install -g nodemon

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3003

CMD ["npm", "run", "dev"]