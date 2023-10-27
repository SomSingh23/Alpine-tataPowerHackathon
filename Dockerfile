FROM node:alpine
WORKDIR /tataPower
COPY package.json /tataPower
RUN yarn
# Install Python and Pip
RUN apk --no-cache add python3 py3-pip

# Install other Python modules using Pip
RUN pip install pandas
COPY . /tataPower
EXPOSE 3000
CMD [ "npm","start" ] 