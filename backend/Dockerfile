
# We are going to use Ubuntu 14.04
FROM ubuntu:16.04
MAINTAINER Pankaj Gupta

LABEL Description="Dockerfile for MEAN stack"

# We need to expose ports for Node.js (3000), MongoDB (27017)
EXPOSE 8080 3000 27017

# Install prerequisites
RUN apt-get -q update && apt-get install -y -qq \
  git \
  npm \
  curl \
  ssh \
  gcc \
  make \
  build-essential \
  sudo \
  apt-utils \
  && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - \
  && apt-get install -y -q nodejs \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# MongoDB will run from a separate official container called 'mongo' (https://hub.docker.com/_/mongo/).
# See the README for more information

# Let's setup our project. We need to create a working directory first, clone the project and configure it

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Clone Mean.io repository
RUN git clone https://github.com/gpankaj/marketing.git /usr/src/app

RUN rm -rf /usr/src/app/backend/node_modules

WORKDIR /usr/src/app/backend

# Install server dependencies using npm
RUN cd /usr/src/app/backend | sudo -E bash - && npm install --quiet \
  && npm cache clean


CMD npm run watch
