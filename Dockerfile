FROM node:14.16.1-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3333
CMD ["yarn", "dev"]