FROM node:20.9.0-alpine3.17
WORKDIR /tataPower
COPY package.json /tataPower
RUN yarn
RUN apk --no-cache add python3 py3-pip
RUN pip install pandas seaborn matplotlib
COPY . /tataPower
EXPOSE 3000
CMD [ "npm","start" ] 