FROM node:alpine

EXPOSE 3000
WORKDIR /Project

COPY package.json .
RUN npm install 

COPY . . 

CMD ["node","index.js"]


