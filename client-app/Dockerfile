FROM node:14.9
WORKDIR /client
COPY package.json ./
COPY package-lock.json ./
COPY . .
RUN npm i
CMD [ "npm", "start" ]