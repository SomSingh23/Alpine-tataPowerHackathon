FROM node:alpine
RUN apk update \
    && apk add --no-cache gcc g++ python3 python3-dev
WORKDIR /tataPower
COPY package.json /tataPower
RUN yarn
COPY . /tataPower
EXPOSE 3000
CMD [ "npm","start" ] 