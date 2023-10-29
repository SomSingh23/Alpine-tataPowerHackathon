FROM node:20.9.0-bullseye
WORKDIR /tataPower
COPY package.json /tataPower
RUN yarn
RUN apt-get update && apt-get install -y python3 python3-pip
RUN python3 -m pip install --upgrade pip
RUN pip install pandas seaborn matplotlib
COPY . /tataPower
EXPOSE 3000
CMD [ "npm","start" ] 