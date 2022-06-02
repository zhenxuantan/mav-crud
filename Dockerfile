FROM node:18-alpine3.14
WORKDIR /usr/app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3001
CMD ["yarn","start"]