FROM node:slim
RUN npm install -g pm2 &&\
	mkdir -p /app
RUN npm install -g nodemon
WORKDIR /app
COPY cc/package.json ./package.json
RUN npm install
COPY cc ./
EXPOSE 1234 1235 1236
CMD pm2 start k.js && pm2 logs
