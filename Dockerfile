FROM node:alpine
WORKDIR /tataPower
COPY package.json /tataPower
RUN yarn
COPY . /tataPower
EXPOSE 3000
CMD [ "npm","start" ] 