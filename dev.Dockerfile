# cannot use alpine because of incompatible mongodb binary in mongodb-memory-server
FROM node:15.12.0-slim AS base_training_nakama
LABEL version=1.0.1
MAINTAINER Pascal Naviere | developper architect full stack GO NODE DENO REACT ANGULAR VUE <pascalou@gmail.com>


ARG EMAIL_SENDER
ARG EMAIL_PASSWORD
ARG NAME
ARG EMAIL
ARG NPM_CONFIG_LOGLEVEL
ARG PORT

ENV EMAIL_SENDER=''
ENV EMAIL_PASSWORD=''
ENV NAME=''
ENV EMAIL=''
ENV DOCKER_USER node
ENV HOME /home/$DOCKER_USER
ENV NPM_CONFIG_LOGLEVEL warn
ENV PORT=4280

RUN apt-get update && apt-get install -y \
      libcurl4-openssl-dev \
      git \
      wget \
      ca-certificates \
      build-essential \
      python \
      && wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64 \
      && chmod +x /usr/local/bin/dumb-init

USER $DOCKER_USER

WORKDIR $HOME

ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]

RUN npm set progress=false && npm config set depth 0

FROM base_training_nakama AS install_training_nakama

WORKDIR ${HOME}

RUN mkdir -p app
COPY --chown=node ./public app/public
COPY --chown=node ./template app/template
COPY --chown=node ./src app/src
COPY --chown=node ./package-lock.json app/package-lock.json
COPY --chown=node ./package.json app/package.json


WORKDIR ${HOME}/app
RUN npm ci

FROM install_training_nakama AS notifier_release_training_nakama

EXPOSE $PORT
CMD ["npm", "run", "dev"]
