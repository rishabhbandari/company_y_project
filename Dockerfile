FROM node:13-alpine
COPY . /companyx
WORKDIR /companyx
RUN npm -g install sails
RUN npm install
RUN npm install sails-mysql --save
EXPOSE 1337
CMD sails lift
