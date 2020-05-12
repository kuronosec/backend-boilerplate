FROM node:14
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g pm2
EXPOSE 9090
CMD ["pm2-runtime", "--watch", "src/index.js"]
