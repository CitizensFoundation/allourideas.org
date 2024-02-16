FROM node:20
MAINTAINER Robert Vidar Bjarnason <robert@citizens.is>

RUN echo 'version 9.0'

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node ./api/package.json ./
COPY --chown=node:node ./api .

USER node

RUN yarn config set ignore-engines
RUN yarn install

COPY --chown=node:node . .

CMD [ "node --optimize_for_size --max_old_space_size=960 ", "api/ts-out/active-citizen/workers/main.js" ]
